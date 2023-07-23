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

const parseFilter = (sortBy?: string, category?: string) => {
  const body: Record<string, any> = {};
  if (sortBy) {
    body["orderBy"] = {
      sortBy: "desc",
    };
  }
  if (category) {
    body["where"] = {
      category: {
        name: category,
      },
    };
  }
  return body;
};

const getAllPosts = async (sortBy?: string, category?: string) => {
  const filter = parseFilter(sortBy, category);
  const posts = await dbClient.posts.findMany(filter as any);
  return posts;
};

const getPostById = async (id: number) => {
  const data = await dbClient.posts.findFirst({
    where: {
      id,
    },
  });
  if (!data) {
    return {};
  }
  return data;
};

export default { createPost, getAllPosts, getPostById };
