import fastify, { FastifyInstance } from "fastify";
import { createUserRoute } from "./routes/user/create-user";
import { getUsersRoute } from "./routes/user/get-users";
import { loginRoute } from "./routes/login";

const app = fastify()

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server is running!!")
})

app.register(createUserRoute)

app.register(getUsersRoute)

app.register(loginRoute)
