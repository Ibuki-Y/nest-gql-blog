/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ConnectionArgs } from '../../connection/interfaces/pagination.args';

@ArgsType()
export class GetPostsArgs {
  @Field((type) => [String], { nullable: true })
  type?: string[]; // 複数のtypeを持つ可能性がある
}

// ConnectionModuleで用意された抽象型をPost用に継承
@ArgsType()
export class GetPostsConnectionArgs implements ConnectionArgs {
  @Field((type) => [String], { nullable: true })
  type?: string[];

  @Field((type) => String, { nullable: true })
  cursor?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => Int, { nullable: true })
  last?: number;
}
