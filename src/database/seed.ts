import { prisma } from "./prisma-client";

const seed = async () => {

  const address = await prisma.addresses.create({
    data: {
      cep: "08557-000",
      address: "Av. Vital Brasil, 827 - Vila Acoreana, Poá - SP",
    },
  });


  await prisma.barbershops.create({
    data: {
      name: "Barbearia da Etec",
      addressId: address.id, 
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
