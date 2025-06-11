import { IsEmail } from 'class-validator';

export class SaveUserDto {
  @IsEmail()
  email: string;
}

export class PostUserResponseDto {
  id: string;
  email: string;
  consent: string[];
}
