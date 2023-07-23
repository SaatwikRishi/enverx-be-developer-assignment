import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

const createPost = async ({
  title,
  content,
  categoryName,
}: {
  title: string;
  content: string;
  categoryName: string;
}) => {
  const newPost = await dbClient.posts.create({
    data: {
      title,
      content,
      category: {
        connectOrCreate: {
          where: {
            name: categoryName,
          },
          create: {
            name: categoryName,
          },
        },
      },
    },
  });
  return newPost;
};

export default { createPost };
