import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interface para os dados de login
interface LoginRequest {
    email: string;
    password: string;
}

const prisma = new PrismaClient();

export async function loginRoute(app: FastifyInstance) {
    app.post("/login", async (request: FastifyRequest<{ Body: LoginRequest }>, reply: FastifyReply) => {
        try {
            const { email, password } = request.body;

            // Verificar se o e-mail fornecido corresponde a um usuário existente
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            // Se o usuário não existir, retornar um erro
            if (!user) {
                return reply.status(401).send({ error: "Credenciais inválidas" });
            }

            // Verificar se a senha fornecida está correta
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Se a senha não corresponder, retornar um erro
            if (!passwordMatch) {
                return reply.status(401).send({ error: "Credenciais inválidas" });
            }

            // Gerar um token de autenticação
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                "secreto", // Você deve substituir isso por uma chave secreta real
                { expiresIn: "1h" }
            );

            // Retornar o token de autenticação
            return reply.status(200).send({ token });
        } catch (error) {
            // Se ocorrer algum erro, retornar uma resposta de erro com status 500
            console.error("Erro no login:", error);
            return reply.status(500).send({ error: "Erro no login" });
        }
    });
}
