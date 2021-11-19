import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
} from 'class-validator';

// https://www.npmjs.com/package/class-validator#passing-options
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
  @IsString() // @IsPhoneNumber(region: string)
  @MaxLength(100)
  phone: string;

  @IsOptional()
  @IsEmail()
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
  @IsString() // @IsPostalCode(locale?: string)
  @MaxLength(20)
  zip: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country: string;
}
