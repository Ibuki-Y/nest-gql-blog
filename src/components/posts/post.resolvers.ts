import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { PbEnv } from 'src/config/environments/pb-env.service';
import { PrismaService } from '../prisma/prisma.service';

// PostModelに相当するスキーマを返す => PostModelへ書いたすべてのフィールドのデータを取得できる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private readonly configService: ConfigService,
    private pbEnv: PbEnv,
    private readonly prisma: PrismaService,
  ) {}

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

  @Query(() => Number)
  helloEnv(): number {
    return this.pbEnv.Port;
  }

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }
}
