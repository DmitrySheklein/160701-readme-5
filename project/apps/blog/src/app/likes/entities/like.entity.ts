import { Entity } from '@project/shared/core';
import { Like } from '@project/libs/shared/app/types';

export class LikeEntity implements Like, Entity<string> {
  public id?: string | undefined;
  public createdAt!: Date;
  public userId!: string;
  public postId!: string;

  constructor(like: Like) {
    this.populate(like);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      postId: this.postId,
    };
  }

  public populate(data: Like): void {
    this.createdAt = data.createdAt;
    this.userId = data.userId;
    this.postId = data.postId;
  }
}
