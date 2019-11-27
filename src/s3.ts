import S3 = require("aws-sdk/clients/s3");
import { RecordsEvent, SelectObjectContentRequest } from "aws-sdk/clients/s3";

const isRecordsEvent = (item: any): item is RecordsEvent =>
  item.Records !== null && item.Records !== undefined;

export const getOutput = async (
  bucket: string,
  key: string,
  target: string
) => {
  const s3 = new S3();
  const query: string = `SELECT s.outputs['${target}']['value'] FROM S3Object s LIMIT 1`;
  const input: SelectObjectContentRequest = {
    Bucket: bucket,
    Key: key,
    Expression: query,
    ExpressionType: "SQL",
    InputSerialization: {
      CompressionType: "NONE",
      JSON: { Type: "DOCUMENT" }
    },
    OutputSerialization: {
      JSON: {}
    }
  };
  const response = await s3.selectObjectContent(input).promise();
  let data = null;
  for await (const event of response.Payload) {
    if (isRecordsEvent(event)) {
      const records: RecordsEvent = (event as {
        Records?;
        Stats?;
        Progress?;
        Cont?;
        End?;
      }).Records;
      data = records.Payload;
    }
  }
  return JSON.parse(data)?.value;
};
