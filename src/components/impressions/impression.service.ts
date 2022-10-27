import { Injectable } from '@nestjs/common';
import { Impression } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetImpressionArgs } from './interfaces/get-impressions.args';
import { CreateImpressionInput } from './interfaces/create-impressions.input';

@Injectable()
export class ImpressionService {
  constructor(private readonly prisma: PrismaService) {}

  async search(args: GetImpressionArgs): Promise<Impression[]> {
    return await this.prisma.impression.findMany({
      where: {
        postId: args.postId,
      },
      take: args.first,
      orderBy: {
        createdAt: args.sortAs,
      },
    });
  }

  async add(input: CreateImpressionInput): Promise<Impression> {
    return await this.prisma.impression.create({
      data: input,
    });
  }
}
