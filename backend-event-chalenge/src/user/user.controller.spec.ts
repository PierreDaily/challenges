import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const saveMock = jest.fn(
    (
      email: string,
    ): Promise<{ id: string; email: string; consent: string[] } | undefined> =>
      new Promise((resolve) => {
        resolve({
          id: 'testId',
          email,
          consent: [],
        });
      }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            save: saveMock,
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    saveMock.mockClear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call userService.save with the correct email address and return response with the matching email address', async () => {
    const result = await controller.save({ email: 'test@example.com' });
    expect(saveMock).toHaveBeenCalledWith('test@example.com');
    expect(result).toEqual({
      id: 'testId',
      email: 'test@example.com',
      consent: [],
    });
  });

  it('should throw InternalServerErrorException if userService.save returns undefined', async () => {
    saveMock.mockResolvedValueOnce(undefined);
    await expect(
      controller.save({ email: 'fail@example.com' }),
    ).rejects.toThrow(/Couldn't save the user/);
  });
});
