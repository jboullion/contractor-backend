import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobsFilterDto } from './dto/get-jobs-filter.dto';
import { JobStatus } from './job-status.enum';
import { Job } from './job.entity';
import { randomUUID } from 'crypto';

@EntityRepository(Job)
export class JobsRepository extends Repository<Job> {
  private logger = new Logger('JobsRepository', { timestamp: true });

  async getJobs(filterDto: GetJobsFilterDto, user: User): Promise<Job[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('job');

    query.where({ user });

    if (status) {
      query.andWhere('job.status = :status', { status });
    }

    if (search) {
      // NOTE: For case insensative queries you can use ILIKE
      // NOTE: For improved performance creating an index on idx_title = LOWER(title)  can be helpful
      // NOTE: If sensative / attached to a user make sure to wrap in () to ensure the "AND" affects both search columns
      query.andWhere(
        '(LOWER(job.title) LIKE :search)', // OR LOWER(job.description) LIKE :search
        { search: `%${search.toLowerCase()}%` },
      );
    }

    try {
      const jobs = await query.getMany();
      return jobs;
    } catch (error) {
      this.logger.error(
        `getJobs failed for user ${user.email}. Filters: ${JSON.stringify({
          filterDto,
        })}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createJob(createJobDto: CreateJobDto, user: User): Promise<Job> {
    const {
      title,
      description,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      country,
    } = createJobDto;

    const uuid = randomUUID();
    const job = this.create({
      uuid,
      title,
      description,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      country,
      status: JobStatus.OPEN,
      user,
    });

    await this.save(job);

    return job;
  }

  async updateJob(job: Job, createJobDto: CreateJobDto): Promise<Job> {
    const {
      title,
      description,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      country,
    } = createJobDto;

    job.title = title;
    job.description = description;
    job.firstName = firstName;
    job.lastName = lastName;
    job.email = email;
    job.address = address;
    job.city = city;
    job.state = state;
    job.zip = zip;
    job.country = country;

    await this.save(job);

    return job;
  }

  async deleteJob(uuid: string, user: User): Promise<DeleteResult> {
    return await this.delete({ uuid, user });
  }
}
