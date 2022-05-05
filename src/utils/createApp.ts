import { config } from "dotenv";
import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session";
import passport from 'passport';
import store from 'connect-mongo';

config();
require('../strategies/discord');

export function createApp(): Express {
  const app = express();
  //enable parsing middleware for requests
  app.use(express.json());
  app.use(express.urlencoded());

  //enable cores
  app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

  // Enable Sessions
  app.use(
    session({
      secret: "asdasdfasdf4e#2435@#4#eASD",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24 * 7},
      store: store.create({
        mongoUrl: process.env.MONGODB_URI!,
      }),
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);

  return app;
}
