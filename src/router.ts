import { FastifyInstance } from "fastify";
import { CreateUser, CreateDev } from "./interfaces/user";
import { UserServices } from "./services/user";

// public rotes
export const publicRotes = async (fastify: FastifyInstance) => {
   const userServices = new UserServices();

   fastify.post<{ Body: CreateUser }>("/sigin", async (req, reply) => {
      const result = await userServices.create(req.body);

      if (!result) return reply.code(400).send({ error: "usuário já existe" });

      return reply
         .code(200)
         .send({ message: "usuário logado com sucesso", result });
   });

   fastify.post("/logout", (req, reply) => {
      return reply.code(200).send("usuário deslogado");
   });
};

//rotas dev
export const devRotes = async (fastify: FastifyInstance) => {
   const userServices = new UserServices();
   //cria um dev novo
   fastify.post<{ Body: CreateDev }>("/", async (req, reply) => {
      const result = await userServices.create(req.body);

      if (!result) return reply.code(400).send({ error: "usuário já existe" });

      return reply
         .code(201)
         .send({ message: "usuário criado com sucesso", result });
   });
   //dev cria uma barbearia
   fastify.post("/createBarbeshop", (req, reply) => {
      return reply.code(201).send("barbearia criada com sucesso");
   });

   //dev cria uma unidade
   fastify.post("/createUnit", async (req, reply) => {
      return reply.code(201).send("unidade criada com sucesso");
   });

   //dev cria um usuário
   fastify.post<{ Body: CreateUser }>("/createUser", async (req, reply) => {
      const result = await userServices.create(req.body);

      if (!result) return reply.code(400).send({ error: "usuário já existe" });

      return reply
         .code(201)
         .send({ message: "usuário criado com sucesso", result });
   });

   //mostra todos os usuários
   fastify.get("/", async (req, reply) => {
      const result = await userServices.getAllUsers();

      if (!result)
         return reply.code(404).send({ message: "Nenhum usuário encontrado" });

      return reply
         .code(200)
         .send({ message: "Usuários encontrados", users: result });
   });

   //mostra um usário pelo id
   fastify.get<{ Params: { id: string } }>("/user/:id", async (req, reply) => {
      const result = await userServices.findUser(req.params.id);

      if (!result)
         return reply.code(404).send({ message: "Usuário não encontrado" });

      console.log(result);
      return reply
         .code(200)
         .send({ message: "usuário encontrado", user: result });
   });

   fastify.get<{ Params: { value: string } }>(
      "/user/name/:value",
      async (req, reply) => {
         const result = await userServices.findUsersByName(req.params.value);

         if (!result)
            return reply
               .code(404)
               .send({ message: "Nenhum usuário encontrado" });

         return reply
            .code(200)
            .send({ message: "Usuários encontrados", users: result });
      }
   );

   //mostra todas as barbearias
   fastify.get("/barbeshop", (req, reply) => {
      return reply.code(200).send("barbearias encontradas");
   });

   //mostra uma barbearia
   fastify.get("/barbershop/:id", (req, reply) => {
      return reply.code(200).send("barbearia encontrada");
   });

   //mostra unidades de uma barbearia
   fastify.get("/barbershop/:id/unit/", (req, reply) => {
      return reply.code(200).send("unidades encontradas");
   });

   //mostra uma unidade de uma barbearia
   fastify.get("/barbershop/:barberShopid/unit/:unitId", (req, reply) => {
      return reply.code(200).send("unidade encontrada");
   });

   //mostra todos os barbeiros de uma barbearia
   fastify.get("/barbershop/:id/employees", (req, reply) => {
      return reply.code(200).send("barbeiros encontrados");
   });
};

//CRUD Usuário
export const userRotes = async (fastify: FastifyInstance) => {
   const userServices = new UserServices();
   //um usuário cria um novo usuário
   fastify.post("/:id/employees/", (req, reply) => {
      return reply.code(201).send("criado com sucesso");
   });

   //retorna todos os funcionarios daquele barbeiro
   fastify.get("/:id/employees/", (req, reply) => {
      return reply.code(200).send("Tudo certo");
   });

   //retorna um unico usuário
   fastify.get("/:id/employees/:employeeId", (req, reply) => {
      return reply.code(200).send("Usuário encontrado");
   });

   //retorna comissão do usuário
   fastify.get("/:id/commission", (req, reply) => {
      return reply.code(200).send("comissão encontrada");
   });

   //edita celular do usuário
   fastify.patch<{ Body: { value: string }; Params: { id: string } }>(
      "/:id/cellphone",
      async (req, reply) => {
         const data = { id: req.params.id, value: req.body.value };
         const result = await userServices.updateCellphone(data);

         if (!result)
            return reply
               .code(500)
               .send({ message: "Falha ao alterar número do celular" });

         return reply.code(200).send({
            message: "Número de celular alterado com sucesso",
            user: result,
         });
      }
   );

   //edita a senha do usuário
   fastify.patch<{ Body: { value: string }; Params: { id: string } }>(
      "/:id/password",
      async (req, reply) => {
         const data = { id: req.params.id, value: req.body.value };
         const result = await userServices.updatePassword(data);

         if (!result)
            return reply
               .code(500)
               .send({ messsage: "Falha ao alterar o número do celular" });

         return reply
            .code(200)
            .send({ message: "Senha alterada com sucesso", user: result });
      }
   );

   //um usuário deleta o proprio perfil
   fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
      const result = await userServices.delete(req.params.id);

      if (!result)
         return reply.code(500).send({ message: "Falha ao deletar usário" });

      return reply
         .code(200)
         .send({ message: "Usuário deletado com sucesso", user: result });
   });

   //um usuário deleta outro usuário
   fastify.delete("/:id/employee/:employeeId", (req, reply) => {
      return reply.code(200).send("Colaborador deletado com sucesso");
   });
};

export const barbershopRotes = async (fastify: FastifyInstance) => {
   // cria produtos da barbearia
   fastify.post("/createProducts", (req, reply) => {
      return reply.code(201).send("produto criado com sucesso");
   });

   //cria um procedimento
   fastify.post("/createProcess", (req, reply) => {
      return reply.code(201).send("procedimento cridado com sucesso");
   });

   //usuário cria uma nova unidade
   fastify.post("/createUnit", (req, reply) => {
      return reply.code(201).send("unidade criado com sucesso");
   });

   //mostra todos os produtos
   fastify.get("/products", (req, reply) => {
      return reply.code(200).send("produtos encontrados");
   });

   //mostra um produto
   fastify.get("/products/:produtctId", (req, reply) => {
      return reply.code(200).send("produto encontrado");
   });

   //mostra todos os procedimentos
   fastify.get("/process", (req, reply) => {
      return reply.code(200).send("procedimentos encontrados");
   });

   //mostra um procedimento
   fastify.get("/process/:processId", (req, reply) => {
      return reply.code(200).send("procedimento encontrado");
   });

   //mostra todas as unidades da barbearia
   fastify.get("/units", (req, reply) => {
      return reply.code(200).send("unidades encontradas");
   });

   //mostra uma unidade da barbearia
   fastify.get("/units/:unitId", (req, reply) => {
      return reply.code(200).send("unidade encontrada");
   });

   //mostra o caixa de todas as unidades
   fastify.get("/cash", (req, reply) => {
      return reply.code(200).send("caixas encontrados");
   });
};

export const productsRotes = async (fastify: FastifyInstance) => {
   fastify.patch("/name", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/weight", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/nameWeight", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/cost", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/price", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/img", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/describe", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/workTop", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });
};

export const processRotes = async (fastify: FastifyInstance) => {
   fastify.patch("/name", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/cost", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/price", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/category", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.patch("/type", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });
};

export const categoryRotes = async (fastify: FastifyInstance) => {
   fastify.post("/createCatagory", (req, reply) => {
      return reply.code(201).send("criado com sucesso");
   });

   fastify.get("/", (req, reply) => {
      return reply.code(200).send("categorias encontradas");
   });

   fastify.patch("/:id/name", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.delete("/:id", (req, reply) => {
      return reply.code(200).send("deletado com sucesso");
   });
};

export const typeRotes = async (fastify: FastifyInstance) => {
   fastify.post("/createType", (req, reply) => {
      return reply.code(201).send("criado com sucesso");
   });

   fastify.get("/", (req, reply) => {
      return reply.code(200).send("categorias encontradas");
   });

   fastify.patch("/:id/name", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   fastify.delete("/:id", (req, reply) => {
      return reply.code(200).send("deletado com sucesso");
   });
};

export const unitsRotes = async (fastify: FastifyInstance) => {
   //registra um produto em uma unidade
   fastify.post("/registerProducts/:id", (req, reply) => {
      return reply.code(201).send("produto registrado");
   });

   //registra um procedimento em uma unidade
   fastify.post("/registerProcess/:id", (req, reply) => {
      return reply.code(201).send("procedimento registrado com sucesso");
   });

   //registra uma despesa em uma unidade
   fastify.post("/expenses", (req, reply) => {
      return reply.code(201).send("despesas cadastrada com sucesso");
   });

   //mostra todos os produtos de uma unidade
   fastify.get("/products", (req, reply) => {
      return reply.code(200).send("produtos encontrados");
   });

   //mostra um produto da unidade e seu estoque
   fastify.get("/products/:id", (req, reply) => {
      return reply.code(200).send("produto encontrado");
   });

   //mostra todos os procedimentos de uma unidade
   fastify.get("/process", (req, reply) => {
      return reply.code(200).send("procedimentos encontrados");
   });

   //mostra um procedimento da unidade
   fastify.get("/process/:id", (req, reply) => {
      return reply.code(200).send("procedimento encontrado");
   });

   //mostra o estoque daquela unidade
   fastify.get("/stock", (req, reply) => {
      return reply.code(200).send("estoque encontrado com sucesso");
   });

   //mostra todas as movimentações no estoque
   fastify.get("/stock/movements", (req, reply) => {
      return reply.code(200).send("movimentações no estoque");
   });

   // mostra o caixa da unidade
   fastify.get("/cash", (req, reply) => {
      return reply.code(200).send("caixa encontrado");
   });

   //mostra as despesas da unidade
   fastify.get("/expenses", (req, reply) => {
      return reply.code(200).send("despesas encontradas");
   });

   //mostra todos os funcionarios de uma unidade
   fastify.get("/employee", (req, reply) => {
      return reply.code(200).send("barbeiros encontrados");
   });
};

export const stockRotes = async (fastify: FastifyInstance) => {
   //registra a entrada de estoque
   fastify.post("/in", (req, reply) => {
      return reply.code(201).send("entrada cadastrada com sucesso");
   });

   //registra a saída de estoque
   fastify.post("/out", (req, reply) => {
      return reply.code(201).send("saída cadastrada com sucesso");
   });

   //mostra estoque do produto
   fastify.get("/", (req, reply) => {
      return reply.code(200).send("estoque encontrado");
   });
   //mostra todas as movimentações de um estoque
   fastify.get("/movements", (req, reply) => {
      return reply.code(200).send("movimentações deste produtos");
   });
};

export const cashRotes = async (fastify: FastifyInstance) => {
   //registra a entrada de dinheiro
   fastify.post("/in", (req, reply) => {
      return reply.code(201).send("entrada cadastrada com sucesso");
   });

   //registra a saída de dinheiro
   fastify.post("/out", (req, reply) => {
      return reply.code(201).send("saída cadastrada com sucesso");
   });

   //mostra as movimetações daquele caixa
   fastify.get("/movements", (req, reply) => {
      return reply.code(200).send("movimentações encontradas");
   });
};

export const expensesRotes = async (fastify: FastifyInstance) => {
   //edita o nome da despesa
   fastify.patch("/name", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   //edita o icone da despesa
   fastify.patch("/icon", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   //edita a data de vencimento da despesa
   fastify.patch("/date", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });

   //edita o valor da despesa
   fastify.patch("/price", (req, reply) => {
      return reply.code(200).send("editado com sucesso");
   });
};

export const serviceRotes = async (fastify: FastifyInstance) => {
   fastify.post("/createService", (req, reply) => {
      return reply.code(201).send("criado com sucesso");
   });

   fastify.get("/", (req, reply) => {
      return reply.code(200).send("atendimentos encontrados");
   });

   fastify.get("/:id", (req, reply) => {
      return reply.code(200).send("atendimento encontrado");
   });
};
