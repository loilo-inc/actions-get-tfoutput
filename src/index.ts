import * as core from "@actions/core";
import * as fs from "fs";
import { getOutput } from "./s3";
import { promisify } from "util";

const main = async () => {
  const bucket = core.getInput("bucket");
  const key = core.getInput("key");
  const outputName = core.getInput("output-name");
  const outputFile = core.getInput("output-file");
  const value = await getOutput(bucket, key, outputName);
  await promisify(fs.writeFile)(outputFile, value);
};

if (require.main === module) {
  main();
}
