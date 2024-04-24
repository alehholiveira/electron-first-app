import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Esquema de validação usando Zod


export async function createUserRoute(app: FastifyInstance) {
    app.post("/users", async (request, reply) => {
        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            cep: z.string(),
        });
        try {
            const {name,email, password, cep} = createUserSchema.parse(request.body);

            // Cria o usuário no banco de dados usando o Prisma
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    cep
                }
            });

            // Retorna a resposta com o novo usuário criado
            return reply.status(201).send(newUser);
        } catch (error) {
            // Se os dados não estiverem no formato esperado, retorna uma resposta de erro com status 400
            return reply.status(400).send({ error });
        }
    });
}
