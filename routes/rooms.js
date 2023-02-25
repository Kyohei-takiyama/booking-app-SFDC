import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("rooms endpoint");
});

export default route;
