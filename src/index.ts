import express, { Application } from "express";
import Server from "./Server";

const app = express();
const server = new Server(app);
const PORT = 8080;

app.listen(PORT, "localhost", function() {
   console.log("Server starting on", `localhost:${PORT}`);
}).on("error", function(error) {
   console.log("Application Error:", error)
})
