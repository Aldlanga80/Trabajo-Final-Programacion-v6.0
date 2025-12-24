import { Router } from "express";
import { getExternal } from "../controllers/externalControllers";

const router = Router();
router.get("/external-data", getExternal);

export default router;
