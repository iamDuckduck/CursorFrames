var gifFrames = require("gif-frames");

export default async function gifToFrames(gifBuffer: Buffer) {
  return gifFrames({
    url: gifBuffer, // The GIF file buffer
    frames: "all", // Extract all frames
    outputType: "png", // Convert to PNG
    cumulative: true, // Whether to output a cumulative image (not necessary for frame extraction)
  });
}
