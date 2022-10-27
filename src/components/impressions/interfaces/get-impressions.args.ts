import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetImpressionArgs {
  @Field({ nullable: true })
  postId?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field({ defaultValue: 'desc' })
  sortAs?: 'asc' | 'desc';
}
