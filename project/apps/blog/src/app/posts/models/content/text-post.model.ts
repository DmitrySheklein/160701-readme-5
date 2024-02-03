import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TextPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';
import { PostContentValidator } from '@project/validation';

@Schema({
  collection: 'text-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TextPostContentModel
  extends BasePostContentModel
  implements TextPostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
    minlength: PostContentValidator.text.annotation.Min,
    maxlength: PostContentValidator.text.annotation.Max,
  })
  public annotation!: string;

  @Prop({
    required: true,
    minlength: PostContentValidator.text.title.Min,
    maxlength: PostContentValidator.text.title.Max,
  })
  public title!: string;

  @Prop({
    required: true,
    minlength: PostContentValidator.text.content.Min,
    maxlength: PostContentValidator.text.content.Max,
  })
  public content!: string;
}

export const TextPostContentSchema =
  SchemaFactory.createForClass(TextPostContentModel);
