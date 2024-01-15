import { PostType } from '@project/libs/shared/app/types';

import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  LinkPostRepository,
  PhotoPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from '../repository/content';
import { Repository } from '@project/shared/core';
import { BasePostContentEntity } from '../entities/content';

interface PostContentRepository {
  create(type: PostType): Repository<BasePostContentEntity>;
}

@Injectable()
export class PostContentRepositoryFactory implements PostContentRepository {
  public create(type: PostType) {
    switch (type) {
      case PostType.Video:
        return new VideoPostRepository();
      case PostType.Text:
        return new TextPostRepository();
      case PostType.Link:
        return new LinkPostRepository();
      case PostType.Photo:
        return new PhotoPostRepository();
      case PostType.Quote:
        return new QuotePostRepository();
      default:
        throw new NotImplementedException(
          'Not implements post repository type'
        );
    }
  }
}