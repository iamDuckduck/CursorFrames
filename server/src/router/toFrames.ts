import Express from "express";
import multer from "multer";
import { Request, Response } from "express";
var gifFrames = require("gif-frames");
import archiver from "archiver";

const router = Express.Router();

//init Multer, we save the file in temp storage
//may improve it with external storage/temp disk storage method
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) res.status(400).json({ message: "No file uploaded." });

  try {
    // Extract all frames from the GIF buffer
    gifFrames(
      {
        url: req.file!.buffer, // The GIF file buffer
        frames: "all", // Extract all frames
        outputType: "png", // Convert to PNG
        cumulative: true, // Whether to output a cumulative image (not necessary for frame extraction)
      },
      function (err: any, frameData: any) {
        if (err) {
          console.error("Error extracting frames:", err);
          return res.status(500).json({ message: "Error extracting frames." });
        }

        // Create a writable stream to output the zip file
        const archive = archiver("zip", {
          zlib: { level: 9 }, // Set compression level
        });

        // Set headers for downloading the zip file
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=frames.zip");

        // Set the response headers to tell the browser it's a downloadable ZIP file
        res.attachment("frames.zip");

        // Pipe the archive data to the response object
        archive.pipe(res);

        // Add each frame as a file in the ZIP archive
        frameData.forEach((frame: any, index: number) => {
          try {
            // Get the image stream from the frame
            const imageStream = frame.getImage(); // This is the stream

            // Ensure imageStream is a valid stream and not null
            if (!imageStream || typeof imageStream.pipe !== "function") {
              console.error(`Frame ${index + 1} returned an invalid stream.`);
              return; // Skip this frame if the stream is invalid
            }

            // Log the type of the imageStream for debugging
            console.log(
              `Frame ${index + 1} is a valid stream, proceeding with archive.`
            );

            // Append the stream to the archive with a specific filename
            archive.append(imageStream, { name: `frame_${index + 1}.png` });
          } catch (err) {
            console.error(`Error processing frame ${index + 1}:`, err);
          }
        });

        // Finalize the archive (this will trigger sending the ZIP file)
        archive.finalize();
      }
    );
  } catch (error) {
    console.error("Error during processing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router };
