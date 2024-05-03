import fastify, { FastifyInstance } from "fastify";
import { UserRoutes } from "./routes/user-routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";

export const app = fastify()

app.register(fastifyCors, {
    // Configurações opcionais do CORS
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  });

app.register(UserRoutes)

app.register(fastifyJwt, {
	secret: 'askjdkas 21873561872v787812t312 1267vsdrasd 121276fe612r37612r6712r867'
});

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server is running!!")
})
