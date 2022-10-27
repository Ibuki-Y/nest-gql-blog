import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { ProfileModel } from './interfaces/profile.model';

const CacheKey = 'profile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => ProfileModel)
export class ProfileResolver {
  constructor(
    private microCmsApi: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Query(() => ProfileModel, { name: 'profile', nullable: true })
  async getProfile() {
    const cached = await this.cacheManager.get(CacheKey);
    if (cached) {
      return cached;
    }

    const data = (await firstValueFrom(this.microCmsApi.get('profile'))).data;
    await this.cacheManager.set(CacheKey, data, 5 * 60);
    console.log('cached!', data);

    return data;
  }
}
