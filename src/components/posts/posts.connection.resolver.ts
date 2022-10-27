import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostsConnection } from './interfaces/post.model';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectionService } from '../connection/connection.service';
import { GetPostsConnectionArgs } from './interfaces/get-posts-connection.args';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostsConnection)
export class PostsConnectionResolver {
  constructor(
    private prisma: PrismaService,
    private connection: ConnectionService,
  ) {}

  @Query(() => PostsConnection, { name: 'postsConnection', nullable: true })
  async getPostsConnection(@Args() args: GetPostsConnectionArgs) {
    const firstOrLast: number = (() => {
      if (!args.first && !args.last) {
        throw new Error('firstかlastいずれかが必要です');
      }
      return args.first || -args.last;
    })();

    const posts = await this.prisma.post.findMany({
      where: {
        type: args.type ? { in: args.type } : undefined,
        published: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
      cursor: args.cursor ? { id: args.cursor } : undefined,
      take: firstOrLast,
      skip: args.cursor ? 1 : undefined,
    });

    const pageInfo = this.connection.pageInfo(args, posts);

    return {
      pageInfo,
      nodes: posts,
    };
  }
}
