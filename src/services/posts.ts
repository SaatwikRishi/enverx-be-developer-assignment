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
      [sortBy]: "desc",
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
  const posts = await dbClient.posts.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    ...filter,
  });
  if (posts.length === 0) {
    return [];
  }
  posts.forEach((post) => {
    post.categoryId = undefined;
    (post.category as any) = post.category.name;
  });

  return posts;
};

const getPostById = async (id: number) => {
  const data = await dbClient.posts.findFirst({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      id,
    },
  });
  if (!data) {
    return {};
  }
  data.categoryId = undefined;
  (data.category as any) = data.category.name;
  return data;
};

const updatePost = async (
  id: number,
  title?: string,
  content?: string,
  categoryName?: string
) => {
  const data: Record<string, any> = { title: title, content: content };
  if (categoryName) {
    data["category"] = {
      connectOrCreate: {
        where: {
          name: categoryName,
        },
        create: {
          name: categoryName,
        },
      },
    };
  }

  const updatedPost = await dbClient.posts.update({
    where: {
      id,
    },
    data,
  });
  return updatedPost;
};

const deletePost = async (id: number) => {
  await dbClient.posts.delete({
    where: {
      id,
    },
  });
};
export default { createPost, getAllPosts, getPostById, updatePost, deletePost };
