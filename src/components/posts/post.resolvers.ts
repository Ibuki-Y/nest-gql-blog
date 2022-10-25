import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';

// PostModelに相当するスキーマを返す => PostModelへ書いたすべてのフィールドのデータを取得できる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostModel)
export class PostsResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // postsというクエリが呼ばれたらこのメソッドを実行
  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good!',
      },
      {
        id: '2',
        title: 'GraphQL is so good too!',
      },
    ];
  }
}
