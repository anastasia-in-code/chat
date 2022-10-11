const fs = require('fs');
const crypto = require('crypto');

class Repository {
  constructor(filename) {
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async create(attrs) {
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);

    return attrs;
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      }),
    );
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2),
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = new Repository('repository.json');
