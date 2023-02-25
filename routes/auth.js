import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("auth endpoint");
});

export default route;
