import { FastifyInstance } from "fastify";
import { CreateUser, Login } from "./interfaces/user";
import { UserServices } from "./services/user";
import { BarbershopServices } from "./services/barbershop";
import { CreateBarbershop } from "./interfaces/barbershop";
import { ProductServices } from "./services/product";
import { CreateProduct, CreateProductPrisma } from "./interfaces/product";
import { AuthMiddleware } from "./middleware/middleware";
import { CategoryServices } from "./services/category";
import { CreateCategory, CreateCategoryPrisma } from "./interfaces/category";
import { CreateStockMovementBody } from "./interfaces/stock";
import { StockMovementServices } from "./services/stock";
import { ProcedureServices } from "./services/procedure";
import { CreateProcedure, CreateProcedurePrisma } from "./interfaces/procedure";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

const userServices = new UserServices();
const barbershopServices = new BarbershopServices();
const productServices = new ProductServices();
const categoryServices = new CategoryServices();
const stockMovementServices = new StockMovementServices();
const procedureServices = new ProcedureServices();

export const publicRotes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Login }>("/signin", async (req, reply) => {
    const result = await userServices.sigin({
      email: req.body.email,
      password: req.body.password,
    });

    if (!result)
      return reply.code(400).send({ error: "usuário não encontrado" });

    if (!result.user) return reply.code(400).send({ error: "senha incorreta" });

    return reply
      .code(200)
      .send({ message: "usuário logado com sucesso", result });
  });

  fastify.post("/logout", (req, reply) => {
    return reply.code(200).send("usuário deslogado");
  });

  fastify.patch<{ Body: { email: string } }>(
    "/rememberPassword",
    async (req, reply) => {
      const result = await userServices.rememberPassword(req.body.email);

      if (!result) return reply.code(500).send("Ocorreu um erro");

      return reply
        .code(200)
        .send({ message: "Acesso recuperado", user: result });
    }
  );
};

export const devRotes = async (fastify: FastifyInstance) => {
  //dev cria uma barbearia
  fastify.post<{ Body: CreateBarbershop }>(
    "/createBarbershop",
    async (req, reply) => {
      const result = await barbershopServices.create(req.body);

      if (!result)
        return reply.code(500).send({ message: "Erro ao criar a barbearia" });

      return reply
        .code(201)
        .send({ message: "barbearia criada com sucesso", result });
    }
  );

  //dev cria um usuário
  fastify.post<{ Body: CreateUser }>("/createUser", async (req, reply) => {
    const result = await userServices.create(req.body);

    if (!result) return reply.code(400).send({ error: "usuário já existe" });

    return reply
      .code(201)
      .send({ message: "usuário criado com sucesso", result });
  });

  //cria um produto
  fastify.post<{
    Body: CreateProduct;
    Params: { barbershopId: string };
  }>("/createProduct", async (req, reply) => {
    const data: CreateProductPrisma = {
      name: req.body.name,
      weight: req.body.weight,
      nameWeight: req.body.nameWeight,
      cost: req.body.cost,
      price: req.body.price,
      stock: req.body.stock,
      workTop: req.body.workTop,
      categoryId: req.body.categoryId,
      barbershopId: req.params.barbershopId,
    };
    const result = await productServices.create(data);

    if (!result) return reply.code(500).send("Erro ao criar produto");

    return reply.code(201).send("produto criado com sucesso");
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

  //mostra um usuário pelo id
  fastify.get<{ Params: { id: string } }>("/user/:id", async (req, reply) => {
    const result = await userServices.findUser(req.params.id);

    if (!result)
      return reply.code(404).send({ message: "Usuário não encontrado" });

    return reply
      .code(200)
      .send({ message: "usuário encontrado", user: result });
  });

  //procura usuários pelo nome
  fastify.get<{ Params: { value: string } }>(
    "/user/name/:value",
    async (req, reply) => {
      const result = await userServices.findUsersByName(req.params.value);

      if (!result)
        return reply.code(404).send({ message: "Nenhum usuário encontrado" });

      return reply
        .code(200)
        .send({ message: "Usuários encontrados", users: result });
    }
  );

  //mostra todas as barbearias
  fastify.get("/barbershop", async (req, reply) => {
    const result = await barbershopServices.getAll();

    if (!result)
      return reply.code(404).send({ message: "Nenhum usuário encontrado" });

    return reply.code(200).send({ message: "barbearias encontradas", result });
  });

  //mostra uma barbearia
  fastify.get<{ Params: { id: string } }>(
    "/barbershop/:id",
    async (req, reply) => {
      const result = await barbershopServices.getById(req.params.id);

      if (!result)
        return reply
          .code(404)
          .send({ message: "Nenhuma barbearia encontrada" });

      return reply.code(200).send({ message: "barbearia encontrada", result });
    }
  );

  //procura por uma barbearia de acordo com seu nome
  fastify.get<{ Params: { name: string } }>(
    "/barbershop/find/:name",
    async (req, reply) => {
      const result = await barbershopServices.find(req.params.name);

      if (!result)
        return reply
          .code(404)
          .send({ massage: "Nenhuma barbearia encontrada" });

      return reply
        .code(200)
        .send({ message: "Barbearias encontradas", result });
    }
  );

  //mostra todos os barbeiros de uma barbearia
  fastify.get<{ Params: { id: string } }>(
    "/barbershop/:id/employees",
    async (req, reply) => {
      const result = await barbershopServices.getEmployees(req.params.id);

      if (!result)
        return reply.code(404).send({ message: "Nenhum barbeiro encontrado" });

      return reply.code(200).send({ message: "barbeiros encontrados", result });
    }
  );

  //deleta uma barbearia
  fastify.delete<{ Params: { id: string } }>(
    "/barbershop/:id",
    async (req, reply) => {
      const result = await barbershopServices.delete(req.params.id);

      if (!result)
        return reply
          .code(500)
          .send({ message: "Erro ao tentar deletar barbearia" });

      return reply
        .code(200)
        .send({ message: "Barbearia deletada com sucesso", result });
    }
  );
};

export const userRotes = async (fastify: FastifyInstance) => {
  // fastify.addHook("onRequest", AuthMiddleware);

  //cria um funcionário
  fastify.post<{ Body: CreateUser }>("/createEmployee", async (req, reply) => {
    const result = await userServices.create(req.body);

    if (!result) return reply.code(400).send({ error: "usuário já existe" });

    return reply
      .code(201)
      .send({ message: "usuário criado com sucesso", result });
  });

  //retorna o próprio user
  fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    const result = await userServices.findUser(req.params.id);

    if (!result)
      return reply.code(404).send({ message: "Usuário não encontrado" });

    return reply
      .code(200)
      .send({ message: "usuário encontrado", user: result });
  });

  //retorna todos os funcionarios daquele barbeiro
  fastify.get<{ Params: { id: string } }>(
    "/:id/employees/",
    async (req, reply) => {
      const result = await userServices.findEmployees(req.params.id);

      if (!result)
        return reply.code(404).send({ message: "Nenhum usuário encontrado" });

      return reply.code(200).send({ message: "Usuários encontrados", result });
    }
  );

  //retorna um unico usuário
  fastify.get("/:id/employees/:employeeId", (req, reply) => {
    return reply.code(200).send("Usuário encontrado");
  });

  //retorna comissão do usuário
  fastify.get("/:id/commission", (req, reply) => {
    return reply.code(200).send("comissão encontrada");
  });

  //edita pagamento fixo
  fastify.patch<{
    Body: { value: number };
    Params: { id: string; employeeId: string };
  }>("/:id/employees/:employeeId/fixedPayment", async (req, reply) => {
    const data = {
      id: req.params.id,
      employeeId: req.params.employeeId,
      value: req.body.value,
    };
    const result = await userServices.updateFixedPayment(data);

    if (!result)
      return reply
        .code(400)
        .send({ message: "Falha ao alterar pagamento fixo" });

    return reply.code(200).send({
      message: "Pagamento fixo alterado com sucesso",
      user: result,
    });
  });

  //edita comissão por produto
  fastify.patch<{
    Body: { value: number };
    Params: { id: string; employeeId: string };
  }>("/:id/employees/:employeeId/commissionProduct", async (req, reply) => {
    const data = {
      id: req.params.id,
      employeeId: req.params.employeeId,
      value: req.body.value,
    };
    const result = await userServices.updateCommissionProduct(data);

    if (!result)
      return reply.code(500).send({ message: "Falha ao alterar Comissão" });

    return reply.code(200).send({
      message: "Comissão alterado com sucesso",
      user: result,
    });
  });

  //edita comissão por procedimento
  fastify.patch<{
    Body: { value: number };
    Params: { id: string; employeeId: string };
  }>("/:id/employees/:employeeId/commissionProcedure", async (req, reply) => {
    const data = {
      id: req.params.id,
      employeeId: req.params.employeeId,
      value: req.body.value,
    };
    const result = await userServices.updateCommissionProcedure(data);

    if (!result)
      return reply.code(500).send({ message: "Falha ao alterar Comissão" });

    return reply.code(200).send({
      message: "Comissão alterado com sucesso",
      user: result,
    });
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
  fastify.delete<{ Params: { id: string; employeeId: string } }>(
    "/:id/employees/:employeeId",
    async (req, reply) => {
      const result = await userServices.deleteEmployee({
        userId: req.params.id,
        employeeId: req.params.employeeId,
      });

      if (!result)
        return reply.code(500).send({ message: "Erro ao deletar usuário" });

      return reply
        .code(200)
        .send({ message: "Colaborador deletado com sucesso", result });
    }
  );
};

export const barbershopRotes = async (fastify: FastifyInstance) => {
  // cria produtos da barbearia
  fastify.post<{
    Body: CreateProduct;
    Params: { userId: string; barbershopId: string };
  }>("/createProduct", async (req, reply) => {
    const data: CreateProductPrisma = {
      name: req.body.name,
      weight: req.body.weight,
      nameWeight: req.body.nameWeight,
      cost: req.body.cost,
      price: req.body.price,
      stock: req.body.stock,
      workTop: req.body.workTop,
      categoryId: req.body.categoryId,
      barbershopId: req.params.barbershopId,
    };

    const result = await productServices.create(data);

    if (!result) return reply.code(500).send("Erro ao criar produto");

    return reply
      .code(201)
      .send({ message: "produto criado com sucesso", result });
  });

  //cria um procedimento
  fastify.post<{
    Body: CreateProcedure;
    Params: { userId: string; barbershopId: string };
  }>("/createProcedure", async (req, reply) => {
    const data: CreateProcedurePrisma = {
      name: req.body.name,
      cost: req.body.cost,
      price: req.body.price,
      describe: req.body.describe,
      categoryId: req.body.categoryId,
      barbershopId: req.params.barbershopId,
    };
    const result = await procedureServices.create(data);

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply
      .code(201)
      .send({ message: "procedimento criado com sucesso", result });
  });

  //cria uma categoria
  fastify.post<{
    Body: CreateCategory;
    Params: { userId: string; barbershopId: string };
  }>("/createCategory", async (req, reply) => {
    const data: CreateCategoryPrisma = {
      name: req.body.name,
      barbershopId: req.params.barbershopId,
    };
    const result = await categoryServices.create(data);

    if (!result) return reply.code(500).send("Erro ao criar categoria");

    return reply
      .code(201)
      .send({ message: "categoria criada com sucesso", result });
  });

  //mostra todos os produtos
  fastify.get<{ Params: { userId: string; barbershopId: string } }>(
    "/products",
    async (req, reply) => {
      const result = await productServices.getAll(req.params.barbershopId);

      return reply.code(200).send({ message: "produtos encontrados", result });
    }
  );

  //mostra um produto
  fastify.get<{
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/products/:productId", async (req, reply) => {
    const result = await productServices.getById(req.params.productId);

    if (!result) return reply.code(404).send("nenhum produto encontrado");
    return reply.code(200).send({ message: "produto encontrado", result });
  });

  //busca um produto
  fastify.get<{
    Params: { userId: string; barbershopId: string; name: string };
  }>("/products/name/:name", async (req, reply) => {
    const result = await productServices.find({
      barbershopId: req.params.barbershopId,
      name: req.params.name,
    });

    if (!result) return reply.code(500).send("Erro ao buscar produto");

    return reply.code(200).send({ message: "Produtos encontrados", result });
  });

  //mostra todas categorias
  fastify.get<{ Params: { userId: string; barbershopId: string } }>(
    "/categories",
    async (req, reply) => {
      const result = await categoryServices.getAll({
        barbershopId: req.params.barbershopId,
      });

      if (!result) return reply.code(500).send("Erro");

      return reply
        .code(200)
        .send({ message: "Categorias encontradas", result });
    }
  );

  //mostra uma categoria
  fastify.get<{
    Params: { userId: string; barbershopId: string; categoryId: string };
  }>("/categories/:categoryId", async (req, reply) => {
    const result = await categoryServices.getById(req.params.categoryId);

    if (!result) return reply.code(404).send("nenhum produto encontrado");
    return reply.code(200).send({ message: "produto encontrado", result });
  });

  //mostra todos os procedimentos
  fastify.get<{
    Params: { userId: string; barbershopId: string };
  }>("/procedure", async (req, reply) => {
    const result = await procedureServices.getAll(req.params.barbershopId);

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply
      .code(200)
      .send({ message: "procedimentos encontrados", result });
  });

  //mostra um procedimento
  fastify.get<{
    Params: { userId: string; barbershopId: string; procedureId: string };
  }>("/procedure/:procedureId", async (req, reply) => {
    const result = await procedureServices.getById(req.params.procedureId);

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply.code(200).send({ message: "procedimento encontrado", result });
  });

  //mostra o caixa da barbearia
  fastify.get("/cash", (req, reply) => {
    return reply.code(200).send("caixas encontrados");
  });
};

export const productsRotes = async (fastify: FastifyInstance) => {
  fastify.patch<{
    Body: { value: string };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/name", async (req, reply) => {
    const result = await productServices.updateName({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: number };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/weight", async (req, reply) => {
    const result = await productServices.updateWeight({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: string };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/nameWeight", async (req, reply) => {
    const result = await productServices.updateNameWeight({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ messaege: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: number };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/cost", async (req, reply) => {
    const result = await productServices.updateCost({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Eroo, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: number };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/price", async (req, reply) => {
    const result = await productServices.updatePrice({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: string };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/describe", async (req, reply) => {
    const result = await productServices.updateDescribe({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: boolean };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/worktop", async (req, reply) => {
    const result = await productServices.updateWorktop({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.delete<{
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/", async (req, reply) => {
    const result = await productServices.delete(req.params.productId);
    console.log(req.params);

    if (!result) return reply.code(500).send("Erro ao deletar");

    return reply.code(200).send({ message: "Deletado com sucesso", result });
  });
};

export const proceduresRotes = async (fastify: FastifyInstance) => {
  fastify.patch<{
    Body: { value: string };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/name", async (req, reply) => {
    const result = await procedureServices.updateName({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: number };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/cost", async (req, reply) => {
    const result = await procedureServices.updateCost({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Eroo, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: number };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/price", async (req, reply) => {
    const result = await procedureServices.updatePrice({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.patch<{
    Body: { value: string };
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/describe", async (req, reply) => {
    const result = await procedureServices.updateDescribe({
      id: req.params.productId,
      value: req.body.value,
    });

    if (!result)
      return reply
        .code(500)
        .send({ message: "Erro, atualização mal sucedida" });

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.delete<{
    Params: { userId: string; barbershopId: string; productId: string };
  }>("/", async (req, reply) => {
    const result = await procedureServices.delete(req.params.productId);

    if (!result) return reply.code(500).send("Erro ao deletar");

    return reply.code(200).send({ message: "Deletado com sucesso", result });
  });
};

export const categoryRotes = async (fastify: FastifyInstance) => {
  fastify.patch<{
    Params: { userId: string; barbershopId: string; categoryId: string };
    Body: { name: string };
  }>("/name", async (req, reply) => {
    const result = await categoryServices.updateName({
      id: req.params.categoryId,
      value: req.body.name,
    });

    if (!result) reply.code(500).send("Erro ao editar categoria");

    return reply.code(200).send({ message: "editado com sucesso", result });
  });

  fastify.delete<{
    Params: { userId: string; barbershopId: string; categoryId: string };
  }>("/", async (req, reply) => {
    const result = await categoryServices.delete(req.params.categoryId);

    if (!result) return reply.code(500).send("Erro ao deletar categoria");

    return reply.code(200).send("deletado com sucesso");
  });
};

export const stockRotes = async (fastify: FastifyInstance) => {
  //registra a entrada de estoque
  fastify.post<{
    Body: CreateStockMovementBody;
    Params: { userId: string; productId: string };
  }>("/in", async (req, reply) => {
    const result = await stockMovementServices.stockIn({
      productId: req.params.productId,
      quantity: req.body.quantity,
      description: req.body.description,
      userId: req.params.userId,
    });

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply
      .code(201)
      .send({ message: "entrada cadastrada com sucesso", result });
  });

  //registra a saída de estoque
  fastify.post<{
    Body: CreateStockMovementBody;
    Params: { userId: string; productId: string };
  }>("/out", async (req, reply) => {
    const result = await stockMovementServices.stockOut({
      productId: req.params.productId,
      quantity: req.body.quantity,
      description: req.body.description,
      userId: req.params.userId,
    });

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply
      .code(201)
      .send({ message: "saida cadastrada com sucesso", result });
  });

  //mostra todas as movimentações de estoque de um produto
  fastify.get<{ Params: { productId: string } }>("/", async (req, reply) => {
    const result = await stockMovementServices.getAll(req.params.productId);

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply
      .code(200)
      .send({ message: "movimentações neste produtos", result });
  });

  //mostra detalhes de uma movimentação
  fastify.get<{
    Params: { userId: string; productId: string; stockId: string };
  }>("/:stockId", async (req, reply) => {
    const result = await stockMovementServices.getById(req.params.stockId);

    if (!result) return reply.code(500).send("Algum erro aconteceu");

    return reply.code(200).send({ message: "movimentação encontrada", result });
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
