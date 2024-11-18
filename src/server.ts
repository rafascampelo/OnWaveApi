import fastify from "fastify";
import cors from "@fastify/cors";
import {
  barbershopRotes,
  cashRotes,
  categoryRotes,
  devRotes,
  expensesRotes,
  proceduresRotes,
  productsRotes,
  publicRotes,
  serviceRotes,
  stockRotes,
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

server.register(proceduresRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/procedure/:procedureId",
});

server.register(categoryRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/procedure/categories",
});


server.register(stockRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/stock/:stockId",
});

server.register(cashRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/cash/:cashId",
});

server.register(expensesRotes, {
  prefix:
    "/user/:userId/barbershop/:barbershopId/expenses/:expensesId",
});

server.register(serviceRotes, {
  prefix: "/user/:userId/barbershop/:barbershopId/services",
});

server.listen({ port: 3080, host: "localhost" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Ouvindo na porta ${address}`);
});
