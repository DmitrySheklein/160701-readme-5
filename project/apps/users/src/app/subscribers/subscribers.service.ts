import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import {
  ALREADY_SUBSCRIBE,
  ALREADY_UNSUBSCRIBE,
  CANT_SUBSCRIBE_YOURSELF,
  CANT_UNSUBSCRIBE_YOURSELF,
} from './subscribers.const';
import { AuthUser } from '@project/libs/shared/app/types';

@Injectable()
export class SubscribersService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async createSubscriber(subscriberId: string, userId: string) {
    if (subscriberId === userId) {
      throw new ConflictException(CANT_SUBSCRIBE_YOURSELF);
    }

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const userSubscribers = existUser?.subscribers || [];

    if (userSubscribers.includes(subscriberId)) {
      throw new ConflictException(ALREADY_SUBSCRIBE);
    }

    const updatedEntity = existUser.populate({
      ...existUser,
      subscribers: [...userSubscribers, subscriberId],
    } as AuthUser);

    const updatedUser = await this.blogUserRepository.update(
      userId,
      updatedEntity
    );

    return `Вы успешно подписались на пользователя ${updatedUser.email}`;
  }

  public async deleteSubscriber(subscriberId: string, userId: string) {
    if (subscriberId === userId) {
      throw new ConflictException(CANT_UNSUBSCRIBE_YOURSELF);
    }

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const userSubscribers = existUser?.subscribers || [];

    if (!userSubscribers.includes(subscriberId)) {
      throw new ConflictException(ALREADY_UNSUBSCRIBE);
    }

    const updatedEntity = existUser.populate({
      ...existUser,
      subscribers: userSubscribers.filter((id) => id !== subscriberId),
    } as AuthUser);

    const updatedUser = await this.blogUserRepository.update(
      userId,
      updatedEntity
    );

    return `Вы успешно отписались от пользователя ${updatedUser.email}`;
  }
}
