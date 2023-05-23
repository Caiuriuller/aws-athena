const AWS = require('aws-sdk');
const { AthenaExpress } = require('athena-express');

class AthenaHandler {
  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACRESS_KEY,
      },
    });

    this.athena = new AthenaExpress({ aws: AWS });
  }

  async executeQuery(query, database) {
    const queryParams = {
      sql: query,
      db: database,
    };

    return this.athena.query(queryParams);
  }
}

module.exports = AthenaHandler;
