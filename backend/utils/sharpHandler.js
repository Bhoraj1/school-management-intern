import sharp from "sharp";
import { removeImg } from "./removeImg.js";

export const compressImg = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 1000 })
      .jpeg({ quality: 100 })
      .toFile(outputPath);

    removeImg(inputPath);

    return outputPath;
  } catch (error) {
    console.error("Sharp error:", error);
  }
};
