import archiver from "archiver";

export default async function aniFrameToZip(
  base64DataArr: string[],
  archive: archiver.Archiver,
  fileName: string
) {
  base64DataArr.forEach((base64Data, index) => {
    const imageBuffer = Buffer.from(base64Data.split("base64,")[1], "base64");

    const frameName = `${fileName}_${index}.png`;

    archive.append(imageBuffer, { name: frameName });
  });
  await archive.finalize();
}
