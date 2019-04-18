"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `SELECT * FROM heroes`;
    mysql_1.default.runQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        else {
            res.json({
                ok: true,
                mensaje: heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapeID = mysql_1.default.instance.connection.escape(id);
    const query = `SELECT * FROM heroes where id = ${id}`;
    mysql_1.default.runQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        else {
            res.json({
                ok: true,
                mensaje: heroe[0]
            });
        }
    });
});
exports.default = router;
