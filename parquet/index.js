const parquet = require('parquetjs');

class ParquetHandler {
  static async generate(fileName, fields, rows) {
    const schema = new parquet.ParquetSchema(fields);

    const writer = await parquet.ParquetWriter.openFile(schema, fileName);

    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];

      // eslint-disable-next-line no-await-in-loop
      await writer.appendRow(row);
    }

    await writer.close();
  }
}

module.exports = ParquetHandler;
