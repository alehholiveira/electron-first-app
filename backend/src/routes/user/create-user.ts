import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Esquema de validação usando Zod
const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cep: z.string(),
});

export async function createUserRoute(app: FastifyInstance) {
    app.post("/users", async (request, reply) => {
        try {
            const userData = createUserSchema.parse(request.body);

            // Cria o usuário no banco de dados usando o Prisma
            const newUser = await prisma.user.create({
                data: userData,
            });

            // Retorna a resposta com o novo usuário criado
            return reply.status(201).send(newUser);
        } catch (error) {
            // Se os dados não estiverem no formato esperado, retorna uma resposta de erro com status 400
            return reply.status(400).send({ error: "Dados inválidos" });
        }
    });
}
