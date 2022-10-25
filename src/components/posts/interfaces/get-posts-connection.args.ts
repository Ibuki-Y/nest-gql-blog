import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPostsArgs {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String], { nullable: true })
  type?: string[]; // 複数のtypeを持つ可能性がある
}
