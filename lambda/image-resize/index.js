const sharp = require("sharp");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const Bucket = "erme";

const width = 188;
const height = 188;

exports.handler = async (event) => {
  const key = event.Records[0].s3.object.key;
  const sanitizedKey = key.replace(/\+/g, " ");
  const parts = sanitizedKey.split("/");
  const filename = parts[parts.length - 1];

  const image = await s3.getObject({ Bucket, Key: sanitizedKey }).promise();

  const resizedImage = await sharp(image.Body)
    .resize({ width, height })
    .toBuffer();

  return await s3
    .putObject({
      Bucket,
      Body: resizedImage,
      Key: `resized/${filename}`,
    })
    .promise();
};
