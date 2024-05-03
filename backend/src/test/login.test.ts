import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance } from 'fastify';
import { PrismaClient, UserTest } from '@prisma/client';
import { app } from '../server';
import { Response } from 'light-my-request';

describe('Testando rota /create/users', () => {
  let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    fastify = app;
    prisma = new PrismaClient();

    await prisma.userTest.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um novo usuário e retornar um status 201', async () => {
    const userData: Partial<UserTest> = {
      name: 'João da Silva',
      email: `test${Date.now()}@example.com`,
      password: 'senha123',
      cep: '12345-678'
    };

    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/create/users',
      payload: userData
    });

    expect(response.statusCode).toBe(201);

    const newUser: UserTest | null = await prisma.user.findUnique({ where: { email: userData.email! } });
    expect(newUser).toBeDefined();
    expect(newUser!.name).toBe(userData.name);
    expect(newUser!.email).toBe(userData.email);
    expect(newUser!.cep).toBe(userData.cep);
  });

  it('Deve retornar status 400 se os dados do usuário estiverem em formato inválido', async () => {
    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/create/users',
      payload: { name: '', email: 'email_invalido', password: 'senha_curta', cep: '' }
    });

    expect(response.statusCode).toBe(400);
  });

});


describe('Testando rota /users', () => {
  let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    fastify = app;
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve selecionar todos os usuários e retornar um status 200', async () => {

    const loginData = {
      email: 'test@example.com',
      password: 'senha123'
    };

    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });

    const token = response.json().token
    const responseGet: Response = await fastify.inject({
      method: 'GET',
      url: '/users',
      headers: {
        Authorization: `Bearer ${token}`
      }
  
    });
    expect(responseGet.statusCode).toBe(200);

  });
  
  it('Deve retornar 401 se não enviado token', async () => {
    
    const response: Response = await fastify.inject({
      method: 'GET',
      url: '/users',
    });
    expect(response.statusCode).toBe(401);

  });
});


describe('Testando rota /users/delete', () => {
  let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    fastify = app;
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve deletar um usuario e retornar 200', async () => {
    
    const loginData = {
      email: 'test@example.com',
      password: 'senha123'
    };

    const responseLogin: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });

    const token = responseLogin.json().token

    const userData: Partial<UserTest> = {
      name: 'João da Silva',
      email: 'testei@example.com',
      password: 'senha123',
      cep: '12345-678'
    };

     await fastify.inject({
      method: 'POST',
      url: '/create/users',
      payload: userData
    });

    const newUser: UserTest | null = await prisma.user.findUnique({ where: { email: userData.email! } });
    
    if(newUser){
      const responseDelete: Response = await fastify.inject({
        method: 'DELETE',
        url: '/delete/users/' + newUser.id,
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });
      expect(responseDelete.statusCode).toBe(200);
      const postUser: UserTest | null = await prisma.user.findUnique({ where: { id: newUser.id } });
      expect(postUser).toBeNull();
    }else{
      throw new Error('Usuário não foi criado');
    }

  });


});



describe('Testando rota /login', () => {
  let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    fastify = app;
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve retornar um token JWT quando o login for bem-sucedido', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'senha123'
    };

    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().token).toBeDefined();
  });

  it('Deve retornar status 404 quando o usuário não for encontrado', async () => {
    const loginData = {
      email: 'naoexiste@example.com',
      password: 'senha123'
    };

    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });

    expect(response.statusCode).toBe(404);
  });

  it('Deve retornar status 400 quando a senha estiver incorreta', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'senha_errada'
    };

    const response: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });

    expect(response.statusCode).toBe(400);
  });
});


describe('Testando rota /edit/users/:id', () => {
  let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    fastify = app;
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve editar um  usuário e retornar um status 201', async () => {

    const loginData = {
      email: 'test@example.com',
      password: 'senha123'
    };

    const responseLogin: Response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: loginData
    });
    const token = responseLogin.json().token
    const userData: Partial<UserTest> = {
      name: 'João da Silvaaa',
      email: 'testa@example.com',
      password: 'senha1253',
      cep: '12345-648'
    };

    await fastify.inject({
      method: 'POST',
      url: '/create/users',
      payload: userData,

    });
    const newUser: UserTest | null = await prisma.user.findUnique({ where: { email: userData.email } });

    const newUserData: Partial<UserTest> = {
      name: 'João de Oliveira',
      email: `update${Date.now()}@example.com`,
      password: 'senha12345',
      cep: '12345-679'
    };
    if(newUser){
      const responseUp: Response = await fastify.inject({
        method: 'PUT',
        url: '/edit/users/' + newUser.id,
        payload: newUserData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const postUser: UserTest | null = await prisma.user.findUnique({ where: { email: newUserData.email! } });
      expect(responseUp.statusCode).toBe(200);
      expect(postUser).toBeDefined();
      expect(postUser!.name).toBe(newUserData.name);
      expect(postUser!.email).toBe(newUserData.email);
      expect(postUser!.cep).toBe(newUserData.cep);

    }else{
      throw new Error('Usuário não foi criado');
    }

  });
});