import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async save(email: string): Promise<User | undefined> {
    try {
      return this.userRepository.save({ email });
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
