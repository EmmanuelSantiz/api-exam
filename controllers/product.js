const express = require('express');
const router = express.Router();

const BD = require('../config/connection');

router.route('/product/').get(async (req, res) => {
    try {

        var sql = 'SELECT * FROM tbl_products WHERE 1';
        var dataParams = [];

        if(req.query.sku !== undefined) {
            if(req.query.sku != '') {
                sql = sql + ' AND sku = ?';
                dataParams.push(req.query.sku)
            }
        }
        if(req.query.code !== undefined) {
            if(req.query.code != '') {
                sql = sql + ' AND code = ?';
                dataParams.push(req.query.code)
            }
        }

        var retorno = await BD._query(sql, dataParams)
        .then(async (data) => {
            return data;
        })
        .catch(console.log);

        res.json({
            "result": retorno ? 'ok' : 'fail',
            'data': retorno
        });
    } catch(e) {
        res.json({
            "result": 'fail',
            'data': null
        });
    }
});

module.exports = router;