import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserResponseDto, SaveUserDto } from './user.dto';
import { NewUserValidationPipe } from './validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(
    @Body(new NewUserValidationPipe()) body: SaveUserDto,
  ): Promise<PostUserResponseDto> {
    const user = await this.userService.save(body.email);
    if (user === undefined)
      throw new InternalServerErrorException(`Couldn't save the user`);
    return {
      id: user.id,
      email: user.email,
      consent: [],
    };
  }
}
