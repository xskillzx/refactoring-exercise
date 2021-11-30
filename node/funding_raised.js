const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static where(options = {}) {
    const funding_file = 'startup_funding.csv';
    const file_data = fs.readFileSync(path.join(__dirname, '..', funding_file)).toString();
    let csv_data = parseCsvSync(file_data);

    const funding_data = [];

    csv_data = csv_data.filter(row => this.evaluateRow(row, options));

    csv_data.forEach((row) => {
      const mapped = this.createMappedObj(row);
      funding_data.push(mapped);
    });

    return funding_data;
  }

  
  static findBy(options = {}) {
    const funding_file = 'startup_funding.csv';
    const file_data = fs.readFileSync(path.join(__dirname, '..', funding_file)).toString();
    let csv_data = parseCsvSync(file_data);

    csv_data = csv_data.find(row => this.evaluateRow(row, options));

    return this.createMappedObj(csv_data);
  }

  static createMappedObj(row) {
    const mapped = {}
    mapped.permalink = row[0];
    mapped.company_name = row[1];
    mapped.number_employees = row[2];
    mapped.category = row[3];
    mapped.city = row[4];
    mapped.state = row[5];
    mapped.funded_date = row[6];
    mapped.raised_amount = row[7];
    mapped.raised_currency = row[8];
    mapped.round = row[9];
    return mapped;
  }

  static evaluateRow(row, options) {
    if (options.company_name) {
      if (options.company_name !== row[1]) return false;
    }

    if (options.city) {
      if (options.city !== row[4]) return false;
    }

    if (options.state) {
      if (options.state !== row[5]) return false;
    }

    if (options.round) {
      if (options.round !== row[9]) return false;
    }

    return true;
  }
}

module.exports = FundingRaised;
