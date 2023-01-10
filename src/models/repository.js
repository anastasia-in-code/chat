const fs = require('fs');
const crypto = require('crypto');

class Repository {
  constructor(dir) {
    this.dir = dir;

    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  async create(file) {
    // eslint-disable-next-line no-param-reassign
    file.id = this.randomId();
    // eslint-disable-next-line no-param-reassign
    file.format = this.getFileFormat(file);

    await fs.writeFileSync(`${this.dir}/${file.id}.${file.format}`, '');

    await this.saveFile(file);

    return file;
  }

  async getOne(id) {
    return JSON.parse(
      await fs.promises.readFile(`${this.dir}/${id}`, {
        encoding: 'utf8',
      }),
    );
  }

  async saveFile(file) {
    const writableStream = fs.createWriteStream(
      `${this.dir}/${file.id}.${file.format}`,
    );

    writableStream.write(file.buffer);
    writableStream.end();

    writableStream.on('error', (err) => console.log(err));
  }

  getFileFormat(file) {
    const nameToArray = file.originalname.split('.');
    const format = nameToArray[nameToArray.length - 1];
    return format;
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = new Repository('fileRepository');
