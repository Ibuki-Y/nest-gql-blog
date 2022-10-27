/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';

// Connectionと一緒に返されるページ情報の型
@ObjectType()
export class PageInfoModel {
  @Field((type) => String, { nullable: true })
  startCursor?: string;

  @Field((type) => String, { nullable: true })
  endCursor?: string;

  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;
}

// 抽象クラス
@InterfaceType()
export abstract class Node {
  @Field((type) => ID)
  id: string;
}

@InterfaceType()
export abstract class Connection {
  @Field((type) => PageInfoModel)
  pageInfo: PageInfoModel;

  @Field((type) => [Node])
  nodes: Node[];
}
