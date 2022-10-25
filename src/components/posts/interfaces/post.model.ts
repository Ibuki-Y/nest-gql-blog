import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String) // GraphQL Schemaのためのデコレータ
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  title: string;
}
