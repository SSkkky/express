var mysql = require('mysql2');

// const db_info = {
//     host: 'localhost',
//     user: 'root',
//     password: 'gkrtod12!@',
//     database: 'test2',
//     port: '3306'
// }

const db_info = {
    host: 'http://svc.sel5.cloudtype.app:32258',
    user: 'worte5633',
    password: 'gkrtod12!@',
    database: 'worte5633',
    port: '32258'
}

module.exports = {
    queryExecute: async (query, values) => {
        const connection = mysql.createConnection(db_info);
        connection.connect((err) => {
            console.log(err)
        });

        return await new Promise((resolve, reject) => {
            connection.query(query, values, function (error, results, fields) {
                resolve(results);
                connection.end();
            });
        })
    }
};
