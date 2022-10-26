/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindPostByIdArgs {
  @Field((type) => String, { nullable: true })
  id?: string;
}
