const mysql = require('mysql');
const CONFIG = require('../conf');

helper = {
    _config_local() {
        if(CONFIG.env === 'production') {
        } else {
            return CONFIG.databasedev()
        }
    },
    _connect_local() {
        return new Promise((resolve, reject) => {
            const connection = mysql.createPool(helper._config_local());
            resolve(connection);
        });
    },
    _query(q, param) {
        const conn = mysql.createPool(helper._config_local());
        return new Promise((resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
              resolve(result);
            }
            conn.query(q, param, handler);
        });
    },
    _insert(req, table) {
        return helper._query("INSERT INTO "+table+" SET ?", [req.body]).then((resolve) => {return resolve.insertId}).catch(console.log);
    }
};

module.exports = helper;