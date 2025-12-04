import fs from "fs";
export const removeImg = (path) => {
  fs.unlinkSync(path);
};
