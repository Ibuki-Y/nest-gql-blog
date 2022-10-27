import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';
// import { BucketAssetsModule } from '../bucket-assets/bucket-assets.module';
import { ImpressionModule } from '../impressions/impression.module';

@Module({
  imports: [ImpressionModule],
  providers: [PostsResolver],
})
export class PostsModule {}
