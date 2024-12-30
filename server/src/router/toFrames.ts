import Express from "express";
import multer from "multer";
import FramesToZip from "../utility/FramesToZip";
import gifToFrames from "../utility/gifToFrames";

const router = Express.Router();

//init Multer, we save the file in temp storage
//may improve it with external storage/temp disk storage method
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/gifToFrames",
  upload.single("file"),
  async (req, res): Promise<any> => {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded." });

    res.setHeader("Content-Type", "application/zip");
    res.attachment(`${req.file.originalname.split(".")[0]}.zip`);

    const frameData = await gifToFrames(req.file?.buffer);

    await FramesToZip(frameData, res);
  }
);

export { router };
