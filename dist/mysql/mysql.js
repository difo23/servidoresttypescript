"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Mysql {
    constructor() {
        this.connected = false;
        console.log('Clase Inicializada');
        this.connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'node_dev_test',
            password: '123456',
            database: 'node_dev'
        });
        this.conectarDB();
    }
    static get instance() {
        return this.db_connect || (this.db_connect = new this());
    }
    static runQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Conectado a DB');
        });
    }
}
exports.default = Mysql;
