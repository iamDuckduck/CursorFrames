import { Response } from "express";
import archiver from "archiver";
import { logger } from "../startup/logger";

export default async function FramesToZip(frameData: any, res: Response) {
  // Create a writable stream to output the zip file
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Set compression level
  });

  // Pipe the archive data to the response object
  archive.pipe(res);

  // Add each frame as a file in the ZIP archive
  frameData.forEach((frame: any, index: number) => {
    // Get the image stream from the frame
    const imageStream = frame.getImage();

    // Ensure imageStream is a valid stream and not null
    if (!imageStream || typeof imageStream.pipe !== "function") {
      logger.info(`Frame ${index + 1} returned an invalid stream.`);
      return; // Skip this frame if the stream is invalid
    }

    logger.info(
      `Frame ${index + 1} is a valid stream, proceeding with archive.`
    );

    // Append the stream to the archive with a specific filename
    archive.append(imageStream, { name: `frame_${index + 1}.png` });
  });

  archive.finalize();
}
