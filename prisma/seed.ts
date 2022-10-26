import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

// モデル投入用のデータ定義
const postData: Post[] = [
  {
    id: 'fa119cb6-9135-57f5-8a5a-54f28d566d0e',
    contentPath: '/posts/sample/articles/hello.md',
    emoji: '✅',
    excerpt: '本を書いています',
    md5Hash: '5ce6822c5efacf5791b7f46187451e73',
    title: '気持ちを落ち着かせる呼吸法',
    thumbNailUrl: 'http://exaample.com/image1.png',
    type: 'article',
    publishDate: new Date('2022-01-31'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '545d5237-15ee-169c-13a2-30f8748e3d6e',
    contentPath: '/posts/sample/articles/graphql.md',
    emoji: '🛳',
    excerpt: '記事を書いています',
    md5Hash: 'b7ec2e1a2b1faaed120aeeccb1ffc587',
    title: '高ぶる気持ちを存分に発揮したいです',
    thumbNailUrl: 'http://exaample.com/image2.png',
    type: 'article',
    publishDate: new Date('2022-01-30'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '95daa18f-90d0-390c-fb96-0d152312936c',
    contentPath: '/posts/sample/articles/nestjs.md',
    emoji: '😼',
    excerpt: '日記を書いています',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: 'ゆっくり落ち着く気持ちを大事にしたいです',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'diary',
    publishDate: new Date('2022-01-29'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '2f438d65-75ce-418f-a6ef-96ad90040f4d',
    contentPath: '/posts/sample/articles/poem.md',
    emoji: '🤔',
    excerpt: 'いろいろな考え方があります',
    md5Hash: '5ce6822c5efacf5791b7f46187451e73',
    title: '楽しく仕事する方法',
    thumbNailUrl: 'http://exaample.com/image1.png',
    type: 'article',
    publishDate: new Date('2022-02-01'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '9e8bd185-decb-f227-58ed-1382d9b6d3fe',
    contentPath: '/posts/sample/articles/fire.md',
    emoji: '😋',
    excerpt: 'おいしい',
    md5Hash: 'b7ec2e1a2b1faaed120aeeccb1ffc587',
    title: 'おいしいコーヒーの淹れ方',
    thumbNailUrl: 'http://exaample.com/image2.png',
    type: 'diary',
    publishDate: new Date('2022-02-02'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: 'b83d9d58-7b1f-14e4-acb8-209a711aee0e',
    contentPath: '/posts/sample/articles/nextjs.md',
    emoji: '💎',
    excerpt: 'たくさん',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: '最強キーボード決定戦',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'diary',
    publishDate: new Date('2022-02-03'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
];

const doSeed = async () => {
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.post.create({
      data: post,
    });
    posts.push(createPosts);
  }

  return await prisma.$transaction(posts);
};

const main = async () => {
  console.log(`Start seeding ...`);
  await doSeed();
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
