import Express from "express";
import multer from "multer";
import { Request, Response } from "express";

const router = Express.Router();

//init Multer, we save the file in temp storage
//may improve it with external storage/temp disk storage method
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) res.status(400).json({ message: "No file uploaded." });

  res.json(req.file);
});

export { router };
