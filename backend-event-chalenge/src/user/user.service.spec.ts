import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

const saveMock = jest.fn(async () => {
  return new Promise((resolve) =>
    resolve({
      id: 'testId',
      email: 'test@test.com',
      consent: [],
    }),
  );
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: saveMock,
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userRepository.save with the correct email', async () => {
    const email = 'test@example.com';
    await service.save(email);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(userRepository.save).toHaveBeenCalledWith({
      email,
    });
  });
  it('should return a User instance from the repository', async () => {
    const email = 'test@example.com';
    const result = await service.save(email);
    expect(result).toEqual({
      id: 'testId',
      email: 'test@test.com',
      consent: [],
    });
  });
  it('should return undefined when the repository throws an error', async () => {
    saveMock.mockImplementationOnce(() => {
      throw new Error('DB error');
    });
    const result = await service.save('fail@example.com');
    expect(result).toBeUndefined();
  });
});
