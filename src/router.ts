import { FastifyInstance } from "fastify";

//rotas dev
export const devRotes = async (fastify:FastifyInstance) => {
    //cria um dev novo
    fastify.post("/",(req,reply) => {
        return reply.code(201).send("desenvolvedor criado com sucesso")
    })

    //dev cria uma barbearia 
    fastify.post("/createBarbeshop",(req,reply) => {
        return reply.code(201).send("barbearia criada com sucesso")
    })

    //dev cria uma unidade
    fastify.post("/createUnit",(req,reply) => {
        return reply.code(201).send("unidade criada com sucesso")
    })

    //dev cria um usuário 
    fastify.post("/createUser",(req,reply) => {
        return reply.code(201).send("usuário criado com sucesso")
    })

    //mostra todos os usuários
    fastify.get("/",(req,reply) => {
        return reply.code(200).send("usuários encontrados")
    })

    //mostra um usário
    fastify.get("/:id",(req,reply) => {
        return reply.code(200).send("usuário encontrado")
    })

    //mostra todas as barbearias
    fastify.get("/barbeshop",(req, reply) => {
        return reply.code(200).send("barbearias encontradas")
    })

    //mostra uma barbearia
    fastify.get("/barbershop/:id",(req,reply) => {
        return reply.code(200).send("barbearia encontrada")
    })

    //mostra uma unidade de uma barbearia
    // fastify.get("/barbershop/:id/unit/:id")
}

//CRUD Usuário
export const userRotes = async(fastify: FastifyInstance) => {
    //um usuário cria um novo usuário
    fastify.post("/",(req, reply) => {
        return reply.code(201).send("criado com sucesso")
    })
            
    //retorna todos os usuários
    fastify.get("/",(req,reply) => {
      return reply.code(200).send("Tudo certo");
    })
    
    //retorna um unico usuário
    fastify.get("/:id",(req, reply) => {
        return reply.code(200).send("Usuário encontrado")
    })

    //edita celular do usuário
    fastify.patch("/cellphone/:id",(req,reply) => {
        return reply.code(200).send("Celular alterado com sucesso")
    })

    //edita a senha do usuário
    fastify.patch("/password/:id",(req, reply) => {
        return reply.code(200).send("Senha alterada com sucesso")
    })

    //um usuário deleta o proprio perfil
    fastify.delete("/:id",(req,reply) => {
        return reply.code(200).send("Usuário deletado com sucesso")
    })

    //um usuário deleta outro usuário
    fastify.delete("/employee/:id",(req,reply) => {
        return reply.code(200).send("Colaborador deletado com sucesso")
    })

}