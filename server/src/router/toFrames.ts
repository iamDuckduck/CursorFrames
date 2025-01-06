import Express from "express";
import multer from "multer";
import FramesToZip from "../utility/FramesToZip";
import gifToFrames from "../utility/gifToFrames";
import archiver from "archiver";
import aniFramesToZip from "../utility/aniFramesToZip";

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
    const decodedFileName = decodeURIComponent(
      req.file.originalname.split(".")[0]
    );
    res.setHeader("Content-Type", "application/zip");
    res.attachment(`${decodedFileName}.zip`);

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

router.post("/aniToFrames", async (req, res): Promise<any> => {
  // should add error handling when aniCss is empty...?

  const aniPostObject = req.body;
  res.setHeader("Content-Type", "application/zip");
  res.attachment(`${aniPostObject.fileName.split(".")[0]}.zip`);

  // Match all `url()` occurrences and extract the content inside them
  const matches = [...aniPostObject.aniCss.matchAll(/url\((.*?)\)/g)].map(
    (match) => match[1]
  );

  // Create a writable stream to output the zip file
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Set compression level
  });

  // Pipe the archive data to the response object
  archive.pipe(res);

  await aniFramesToZip(matches, archive, aniPostObject.fileName);
});

export { router };
