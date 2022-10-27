import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WinstonModule } from 'nest-winston';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from './config/environments/pb-env.service';
import { PostsModule } from './components/posts/posts.module';
import { PostsResolver } from './components/posts/post.resolvers';
import { PrismaModule } from './components/prisma/prisma.module';
import { ProfileModule } from './components/profile/profile.module';
import { ImpressionModule } from './components/impressions/impression.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PbEnvModule,
    PostsModule,
    ProfileModule,
    ImpressionModule,
  ],
  providers: [PostsResolver],
})
export class AppModule {}
