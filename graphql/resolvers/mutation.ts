import { prisma } from "@/lib/prisma";

export const Mutations = {
  consumeGeneration: async (_: unknown, { regId }: { regId: string }) => {
    const user = await prisma.user.findUnique({
      where: { regId },
    });

    if (!user) {
      throw new Error("Invalid registration id");
    }

    if (user.generations >= 4) {
      throw new Error("Generation limit reached");
    }

    return prisma.user.update({
      where: { regId },
      data: {
        generations: { increment: 1 },
      },
    });
  },

  resetGenerations: async (_: unknown, { regId }: { regId: string }) => {
    return await prisma.user.update({
      where: { regId },
      data: {
        generations: 0,
      },
    });
  },
};
