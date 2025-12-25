import { Router } from "express";
import { getExternal } from "../controllers/externalControllers";

const externalRouter = Router();

externalRouter.get("/external-data", getExternal);

export default externalRouter;
