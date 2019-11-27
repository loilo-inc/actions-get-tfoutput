import * as core from "@actions/core";
import * as fs from "fs";
import { getOutput } from "./s3";
import { promisify } from "util";

const main = async () => {
  const bucket = core.getInput("bucket");
  const key = core.getInput("key");
  const outputName = core.getInput("output-name");
  const outputFile = core.getInput("output-file");
  const value = await getOutput(bucket, key, outputName).catch(
    (error: Error) => {
      core.setFailed(error.message);
    }
  );
  await promisify(fs.writeFile)(outputFile, value).catch((error: Error) => {
    core.setFailed(error.message);
  });
};

if (require.main === module) {
  main();
}
