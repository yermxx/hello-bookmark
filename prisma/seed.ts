import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sico = await prisma.user.upsert({
    where: { email: 'indiflex.sico@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.sico@gmail.com',
      username: 'sico',
      Book: {
        create: {
          title: 'sico first book',
          withdel: false,
          Mark: {
            create: {
              url: 'https://naver.com',
              title: 'Naver',
              image: '',
              descript: 'seeding...',
            },
          },
        },
      },
    },
  });

  const indiflex = await prisma.user.upsert({
    where: { email: 'indiflex.corp@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.corp@gmail.com',
      username: 'indiflex',
      Book: {
        create: [
          {
            title: 'indiflex first book',
            withdel: false,
          },
          {
            title: 'indiflex second book',
            withdel: true,
          },
        ],
      },
    },
  });

  console.log({ sico, indiflex });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
