import { Application, Router, Request, Response } from "express";

export function rootHandler(req: Request, res: Response): Response {
    return res.json({ status: "OK" });
}

class Routes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", rootHandler);
    }
}

export default class ApiRoutes {
    constructor(app: Application) {
        app.use("/api", new Routes().router);
    }
}
