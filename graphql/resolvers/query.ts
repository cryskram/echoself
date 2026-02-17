import { prisma } from "@/lib/prisma";

export const Query = {
  users: async (_: unknown, __: unknown) => {
    return await prisma.user.findMany({
      orderBy: { name: "asc" },
      where: {
        NOT: {
          regId: process.env.ADMIN_REG_ID as string,
        },
      },
    });
  },
};
