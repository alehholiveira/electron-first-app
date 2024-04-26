import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsersRoute(app: FastifyInstance) {
    app.get("/users", async (request, reply) => {
        try {
            // Consulta todos os usuários no banco de dados usando o Prisma
            const users = await prisma.user.findMany();

            // Retorna a resposta com os usuários encontrados
            return reply.status(200).send(users);
        } catch (error) {
            // Se ocorrer algum erro, retorna uma resposta de erro com status 500
            console.error("Erro ao buscar usuários:", error);
            return reply.status(500).send({ error: "Erro ao buscar usuários" });
        }
    });
}
