import timezip from "./main.ts";
import * as path from "path";

declare const process: NodeJS.Process & {
  pkg: boolean | undefined;
}


const isDev = process.env.NODE_ENV == "development";
const targetArg: string | undefined = process.argv[2];
const outputArg: string | undefined = process.argv[3];
const workDir = process.pkg
        ? path.dirname(process.execPath)
        : path.resolve(process.cwd(), isDev ? "test" : "");

if (!targetArg){
  console.error("ERR: Target file or directory not specified\nUsage: timezip [target file or folder]");
  process.exit(-1);
}

if (outputArg){
  timezip(targetArg, outputArg);
}
else {
  timezip(targetArg, workDir);
}