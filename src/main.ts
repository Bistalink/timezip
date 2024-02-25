import * as path from "path";
import * as fs from "fs";
import AdmZip from "adm-zip";

/**
 * Compress file or directory into zip file with date & time suffix.
 * @param target Target file or directory which will be compressed to zip file
 * @param outputDir Output directory
 */
export default function (target: string, outputDir: string){
  const targetPath = path.resolve(target);
  const outputPath = path.resolve(outputDir);
  const zip = new AdmZip();
  const now = new Date();
  const timestamp = now.getFullYear().toString() + "-" 
                  + (now.getMonth() + 1).toString() + "-"
                  + now.getDate().toString() + "-"
                  + now.getHours().toString() + "-"
                  + now.getMinutes().toString() + "-"
                  + now.getSeconds().toString();
  let outputName: string;

  // パスのチェック
  if (!fs.existsSync(targetPath)){
    throw new Error("No such file or directory");
  }
  if (!fs.existsSync(outputPath)){
    throw new Error("Output path does not exist");
  }
  if (!fs.lstatSync(outputPath).isDirectory()){
    throw new Error("Output path is not directory");
  }

  // zipにまとめる
  if (fs.lstatSync(targetPath).isDirectory()){
    zip.addLocalFolder(targetPath);
  }
  else {
    zip.addLocalFile(targetPath);
  }

  outputName = path.basename(targetPath) + timestamp + ".zip";

  zip.writeZip(path.join(outputPath, outputName));
}