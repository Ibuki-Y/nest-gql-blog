import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';
// import { BucketAssetsModule } from '../bucket-assets/bucket-assets.module';
import { ImpressionModule } from '../impressions/impression.module';
import { ConnectionModule } from '../connection/connection.module';
import { PostsConnectionResolver } from './posts.connection.resolver';

@Module({
  imports: [ImpressionModule, ConnectionModule],
  providers: [PostsResolver, PostsConnectionResolver],
})
export class PostsModule {}
