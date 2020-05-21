let fs = require('fs');

let summary = {};

let files = fs.readdirSync('.');


files.forEach(
    file => {

        if (file !== 'summary.json' && file.match(/\.json$/)) {

            data = fs.readFileSync(file);

            let json = JSON.parse(data);

            let yr = json.period.slice(-4);
            let tkr = json.ticker.toLowerCase();

            if (summary[tkr] === undefined) {
                summary[tkr] = {};
            }

            if (summary[tkr][yr] === undefined) {
                summary[tkr][yr] = {};
            }

            let top = summary[tkr][yr];

            top.operating_income = json.income_statement.operating_income;
            top.other_income_expense = json.income_statement.total_other_income_expense;
            top.pretax_income = json.income_statement.pretax_income;
            top.taxes = json.income_statement.total_tax_provision;
            top.minority_interest = json.income_statement.net_income_attributable_noncontrolling_interest;
            top.net_income = json.income_statement.net_income;
            top.net_income_post_minority_interest = json.income_statement.net_income_post_minority_interest;

        }
    });

fs.writeFileSync('summary.json', JSON.stringify(summary, null, 4));