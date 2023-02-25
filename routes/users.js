import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("users endpoint");
});

export default route;
