import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import ApiRoutes from "./routes";

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new ApiRoutes(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:8081",
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
}
