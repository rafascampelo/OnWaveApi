import { prisma } from "./prisma-client";

const seed = async () => {
  await prisma.barbershop.create({
    data: {
      id: "0",
      name: "0",
    },
  });

  await prisma.address.create({
    data: {
      id: "0",
      cep: "0",
      neighborhood: "0",
      road: "0",
      num: 0,
    },
  });

  await prisma.units.create({
    data: {
      id: "0",
      name: "0",
      addressId: "0",
      barbershopId: "0",
    },
  });

  console.log("Database seeded");
  await prisma.$disconnect();
};

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
