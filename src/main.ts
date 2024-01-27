import * as fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";
import * as dateUtils from "date-utils";

declare const process: NodeJS.Process & {
  pkg: boolean | undefined;
};


const isDev: boolean = process.env.NODE_ENV == "development";
const targetArg: string | undefined = process.argv[2];
const outputArg: string | undefined = process.argv[3];
const workDir = process.pkg                                   // 作業ディレクトリ（出力先）
        ? path.dirname(process.execPath)                      // pkgによってパッケージングされている場合は実行ファイル
        : path.resolve(process.cwd(), isDev ? "test" : "");   // 開発環境の場合はtestフォルダを使用する

if (!targetArg){
  console.error("ERR: Target file or directory not specified\nUsage: timezip [target file or folder]");
  process.exit(-1);
}

const target = path.resolve(targetArg);

if (!fs.existsSync(target)){
  console.error("ERR: No such file or directory");
  process.exit(-1);
}

const zip = new AdmZip();

if (fs.lstatSync(target).isDirectory()){
  zip.addLocalFolder(target);
}
else {
  zip.addLocalFile(target);
}

const now = new Date();
const timestamp = now.getFullYear().toString() + "-" 
                  + (now.getMonth() + 1).toString() + "-"
                  + now.getDate().toString() + "-"
                  + now.getHours().toString() + "-"
                  + now.getMinutes().toString() + "-"
                  + now.getSeconds().toString();
const outputName = path.basename(target) + timestamp + ".zip";

if (outputArg){
  const outputDir = path.resolve(outputArg);

  if (!fs.lstatSync(outputDir).isDirectory()){
    console.error("ERR: Output path is not directory");
    process.exit(-1);
  }

  if (!fs.existsSync(outputDir)){
    console.error("ERR: Output path does not exist");
    process.exit(-1);
  }

  zip.writeZip(path.join(outputDir, outputName));
}
else{
  zip.writeZip(path.join(workDir, outputName));
}

console.log(`Archive "${outputName}" successfully created.`);