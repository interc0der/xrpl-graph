import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import cors, { CorsRequest } from 'cors';
import constants from './constants';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
//import { ApolloServer, gql } from 'apollo-server';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error';

import resolvers from './schema/resolvers/index';
import typeDefs from './schema/types/index';

dotenv.config();

const port = process.env['API_PORT'] || 4001;
console.log(port);

const corsOptions = {
  origin: constants.origins,
  //methods: 'GET, POST, PUT, OPTIONS',
  credentials: true,
};

async function startApolloServer() {
  const app: Express = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    //rootValue,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(constants.routes, cors<CorsRequest>(corsOptions));
  app.use(constants.routes, express.json({ limit: '1mb' }));

  // api routes
  app.use('/', require(path.join(__dirname, 'routes', 'root.routes.ts')));
  app.use('/xrpl', require(path.join(__dirname, 'routes', 'xrpl.routes.ts')));

  app.use(errorHandler);

  await server.start();
  server.applyMiddleware({ app, cors: false });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer();
