import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuotePostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';
import { PostContentValidator } from '@project/validation';

@Schema({
  collection: 'quote-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class QuotePostContentModel
  extends BasePostContentModel
  implements QuotePostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
    minlength: PostContentValidator.quote.quote.Min,
    maxlength: PostContentValidator.quote.quote.Max,
  })
  public quote!: string;

  @Prop({
    required: true,
    minlength: PostContentValidator.quote.author.Min,
    maxlength: PostContentValidator.quote.author.Max,
  })
  public author!: string;
}

export const QuotePostContentSchema = SchemaFactory.createForClass(
  QuotePostContentModel
);
