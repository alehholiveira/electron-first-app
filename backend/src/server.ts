import fastify, { FastifyInstance } from "fastify";
import { createUserRoute } from "./routes/create-user";

const app = fastify()

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server is running!!")
})

app.register(createUserRoute)