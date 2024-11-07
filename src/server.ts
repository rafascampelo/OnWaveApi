import fastify from "fastify";
import cors from "@fastify/cors";
import {
  barbershopRotes,
  cashRotes,
  categoryRotes,
  devRotes,
  expensesRotes,
  processRotes,
  productsRotes,
  publicRotes,
  serviceRotes,
  stockRotes,
  typeRotes,
  unitsRotes,
  userRotes,
} from "./router";

const server = fastify({
  // logger: true,
});

server.register(cors, {});

server.register(publicRotes);

server.register(userRotes, {
  prefix: "/user",
});

server.register(devRotes, {
  prefix: "/dev",
});

server.register(barbershopRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId",
});

server.register(productsRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/products/:productId",
});

server.register(processRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/process/:processId",
});

server.register(categoryRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/process/categories",
});

server.register(typeRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/process/types",
});

server.register(unitsRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/units/:unitId",
});

server.register(stockRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/units/:unitId/stock/:stockId",
});

server.register(cashRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/units/:unitId/cash/:cashId",
});

server.register(expensesRotes, {
  prefix:
    "/user/:userId/barbershop/:barbershopId/units/:unitId/expenses/:expensesId",
});

server.register(serviceRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/units/:unitId/services",
});

server.listen({ port: 3080, host: "localhost" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  // console.log(`Ouvindo na porta ${address}`);
});
