const AWS = require('aws-sdk');
const fs = require('fs');

class AwsS3Handler {
  constructor() {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACRESS_KEY,
      },
    });
  }

  async upload(filePath, fileName) {
    const filename = filePath;
    const fileContent = fs.readFileSync(filename);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `data/${fileName}`,
      Body: fileContent,
    };

    return this.s3.upload(params, (err, data) => {
      if (err) {
        throw new Error(err);
      }

      return data;
    });
  }
}

module.exports = AwsS3Handler;
