import Express from "express";
import multer from "multer";
import FramesToZip from "../utility/FramesToZip";
import gifToFrames from "../utility/gifToFrames";
import archiver from "archiver";

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

    // Create a writable stream to output the zip file
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Set compression level
    });

    // Pipe the archive data to the response object
    archive.pipe(res);

    await FramesToZip(frameData, archive); //
  }
);

export { router };
