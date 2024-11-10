// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "./user";
import {Post} from "./post";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306, // MySQL 기본 포트
    username: "root",
    password: "1234",
    database: "database_name",
    synchronize: true,
    logging: true,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
});
