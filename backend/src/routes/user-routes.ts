import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { string, z } from "zod";
import { verifyJwt } from "../middleware/JWTAuth";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Esquema de validação usando Zod
const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cep: z.string(),
});

// Esquema de validação para Login
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const IdSchema = z.object({
    id: z.string()
})

export async function UserRoutes(app: FastifyInstance) {
    // rota para login
    app.post('/login', async (request, reply) => {
        const { email, password } = LoginSchema.parse(request.body);
      
        const user = await prisma.user.findFirst({
          where: {
            email
          }
        });
      
        if (!user) {
          return reply.status(404).send({ err: 'Usuário não encontrado' });
        }
      
        const correctUser = bcrypt.compareSync(password, user.password);
      
        if (!correctUser) {
          return reply.status(400).send({ err: 'Senha incorreta' });
        }
      
        try {
          // Gera um token JWT com uma duração de 30 minutos
          const token = await reply.jwtSign({ login: user.email }, { sign: { expiresIn: '30m', sub: user.id } });
          return reply.send({ token });
        } catch (err) {
          return reply.status(400).send({ msg: 'Falha interna', err });
        }
      });
      
    // rota para criar usuario
    app.post("/create/users", async (request, reply) => {
        try {
            const userData = UserSchema.parse(request.body);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userData.password, salt);


            // Cria o usuário no banco de dados usando o Prisma
            const newUser = await prisma.user.create({
                data: {
                    ...userData, // Spread operator para incluir todos os campos do userData
                    password: hash
                }
            });

            // Retorna a resposta com o novo usuário criado
            return reply.status(201).send(newUser);
        } catch (error) {
            // Se os dados não estiverem no formato esperado, retorna uma resposta de erro com status 400
            return reply.status(400).send(error);
        }
    });

    // rota para listar os usuarios criados
    app.get("/users", { onRequest: [verifyJwt] }, async (request, reply) => {
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

    // rota para atualizar usuário
    app.put("/edit/users/:id", { onRequest: [verifyJwt] }, async (request, reply) => {
        try {
            const userId = IdSchema.parse(request.params); // Obtém o ID do usuário a ser atualizado
            const userData = UserSchema.parse(request.body);

            // Verifica se o usuário existe
            const existingUser = await prisma.user.findUnique({
                where: {
                    ...userId
                }
            });

            if (!existingUser) {
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            }

            // Atualiza o usuário no banco de dados usando o Prisma
            const updatedUser = await prisma.user.update({
                where: {
                    ...userId
                },
                data: {
                    ...userData
                }
            });

            // Retorna a resposta com o usuário atualizado
            return reply.status(200).send(updatedUser);
        } catch (error) {
            // Se ocorrer algum erro, retorna uma resposta de erro com status 500
            console.error("Erro ao atualizar usuário:", error);
            return reply.status(500).send({ error: "Erro ao atualizar usuário" });
        }
    });

    // rota para deletar usuário
    app.delete("/delete/users/:id", { onRequest: [verifyJwt] }, async (request, reply) => {
        try {
            const userId = IdSchema.parse(request.params); // Obtém o ID do usuário a ser deletado

            // Verifica se o usuário existe
            const existingUser = await prisma.user.findUnique({
                where: {
                    ...userId
                }
            });

            if (!existingUser) {
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            }

            // Deleta o usuário do banco de dados usando o Prisma
            await prisma.user.delete({
                where: {
                    ...userId
                }
            });

            // Retorna uma resposta de sucesso
            return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            // Se ocorrer algum erro, retorna uma resposta de erro com status 500
            console.error("Erro ao deletar usuário:", error);
            return reply.status(500).send({ error: "Erro ao deletar usuário" });
        }
    });


}
