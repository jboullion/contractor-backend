import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  zip: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country: string;
}
