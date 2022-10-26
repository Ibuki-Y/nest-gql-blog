import { ConfigService } from '@nestjs/config';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { PbEnv } from 'src/config/environments/pb-env.service';
import { PrismaService } from '../prisma/prisma.service';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';
import { FindPostArgs } from './interfaces/find-post-args';

// PostModelに相当するスキーマを返す => PostModelへ書いたすべてのフィールドのデータを取得できる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private readonly configService: ConfigService,
    private pbEnv: PbEnv,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }

  // postsというクエリが呼ばれたらこのメソッドを実行
  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(@Args() args: GetPostsArgs) {
    return this.prisma.post.findMany({
      where: {
        // in: typeは配列で複数渡されることがある
        type: args.type ? { in: args.type } : undefined,
        published: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }

  @Query(() => PostModel, { name: 'findPost', nullable: false })
  async findPost(@Args() args: FindPostArgs) {
    return await this.prisma.post.findUnique({
      rejectOnNotFound: true,
      where: {
        id: args.id,
        contentPath: args.contentPath,
      },
    });
  }
}
