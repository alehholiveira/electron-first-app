import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
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

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function UserRoutes(app: FastifyInstance) {
    // rota para verificar se o usuario esta logado
    app.get('/', { onRequest: [verifyJwt] }, async (req, res) => {

        const result = await prisma.user.findMany();


        return res.send(result);
    });

    app.post('/login', async (request, reply) => {
		const {email, password} = LoginSchema.parse(request.body);

		const user = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (!user) {
			return reply.status(404).send({err: 'Usuário não encontrado'});
		}

		const correctUser = bcrypt.compareSync(password, user.password);

		if (!correctUser) {
			return reply.status(400).send({err: 'Senha incorreta'});
		}

		try {
			//const token = jwt.sign({id: user.id, login: user.login}, secret, {expiresIn: '12h'});
			const token = await reply.jwtSign({login: user.email}, {sign: { sub: user.id}});
			return reply.send({token});
		} catch(err) {
			return reply.status(400).send({msg: 'Falha interna', err});
		}
	});

    // rota para criar usuario
    app.post("/users", async (request, reply) => {
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
            return reply.status(400).send( {erro: "erro ao criar o usuario"} );
        }
    });

    // rota para listar os usuarios criados
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
