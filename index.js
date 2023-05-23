/* eslint-disable no-console */
const { config } = require('dotenv');

config();

const ParquetHandler = require('./parquet/index');
const S3Handler = require('./s3/index');
const AthenaHandler = require('./athena/index');

const s3Handler = new S3Handler();
const athenaHandler = new AthenaHandler();

const fileName = 'fruits.parquet';

ParquetHandler.generate(
  fileName,
  {
    tenant: { type: 'UTF8' },
    request: { type: 'UTF8' },
    response: { type: 'UTF8' },
    created_date: { type: 'TIMESTAMP_MILLIS' },
  },
  [
    {
      tenant: 'apples',
      request: '10',
      response: '2.5',
      created_date: new Date(),
    },
    {
      tenant: 'apples',
      request: '100',
      response: '2.50',
      created_date: new Date(),
    },
  ],
).then(() => {
  s3Handler.upload(`./${fileName}`, fileName).then(() => {
    athenaHandler.executeQuery('SELECT * FROM frutas', 'default')
      .catch((err) => console.log(err))
      .then((result) => console.log(result));
  }).catch((err) => console.log(`Error on uploading file to s3 ${err}`));
}).catch((err) => console.log(`Error on generating parquet ${err}`));
