import { FastifyInstance } from "fastify";

// CRUD

export const userRotes = async(fastify: FastifyInstance) => {
    fastify.get("/",(req,reply) => {
      return reply.code(200).send("Tudo certo");
    })
}