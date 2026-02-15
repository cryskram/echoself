// AI GENERATED DATA

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const users = [
    { regId: "APS001", name: "USER 1" },
    { regId: "APS002", name: "USER 2" },
    { regId: "APS003", name: "USER 3" },
    { regId: "APS004", name: "USER 4" },
    { regId: "APS005", name: "USER 5" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { regId: user.regId },
      update: {},
      create: {
        regId: user.regId,
        name: user.name,
        generations: 0,
      },
    });
  }

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
