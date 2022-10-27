import { Injectable } from '@nestjs/common';
import { Node, PageInfoModel } from './interfaces/pagination';
import { ConnectionArgs } from './interfaces/pagination.args';

@Injectable()
export class ConnectionService {
  // クエリパラメータと結果からPageInfoを生成
  pageInfo(args: ConnectionArgs, nodes: Node[]): PageInfoModel {
    if (!args.first && !args.last) {
      throw new Error('Either FIRST or LAST is required.');
    }

    const hasNextPage: boolean = (() => {
      if (args.first) {
        return args.first === nodes.length;
      } else {
        return !!args.cursor;
      }
    })();
    const hasPreviousPage: boolean = (() => {
      if (args.first) {
        return !!args.cursor;
      } else {
        return args.last === nodes.length;
      }
    })();

    return {
      startCursor: nodes?.[0]?.id,
      endCursor: nodes?.[nodes.length - 1]?.id,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
