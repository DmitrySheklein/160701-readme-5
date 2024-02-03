import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LinkPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';
import { PostContentValidator } from '@project/validation';

@Schema({
  collection: 'link-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class LinkPostContentModel
  extends BasePostContentModel
  implements LinkPostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
  })
  public url!: string;

  @Prop({
    required: true,
    minlength: PostContentValidator.link.description.Min,
    maxlength: PostContentValidator.link.description.Max,
  })
  public description!: string;
}

export const LinkPostContentSchema =
  SchemaFactory.createForClass(LinkPostContentModel);
