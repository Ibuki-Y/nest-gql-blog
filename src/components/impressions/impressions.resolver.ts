import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImpressionModel } from './interfaces/impression.model';
import { ImpressionService } from './impression.service';
import { GetImpressionArgs } from './interfaces/get-impressions.args';
import { CreateImpressionInput } from './interfaces/create-impressions.input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => ImpressionModel)
export class ImpressionResolver {
  constructor(private service: ImpressionService) {}

  @Query(() => [ImpressionModel], { name: 'impressions', nullable: true })
  async getImpressions(@Args() args: GetImpressionArgs) {
    return this.service.search(args);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => ImpressionModel)
  @UsePipes(new ValidationPipe({ transform: false }))
  async addImpression(@Args('input') input: CreateImpressionInput) {
    return this.service.add(input);
  }
}
