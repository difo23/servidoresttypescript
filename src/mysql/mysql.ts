import mysql from 'mysql';

class Mysql {
	private static db_connect: Mysql;

	connection: mysql.Connection;
	connected: boolean = false;

	constructor() {
		console.log('Clase Inicializada');

		this.connection = mysql.createConnection({
			host: 'localhost',
			user: 'node_dev_test',
			password: '123456',
			database: 'node_dev'
		});
		this.conectarDB();
	}

	public static get instance() {
		return this.db_connect || (this.db_connect = new this());
	}

	public static runQuery(query: string, callback: Function) {
		this.instance.connection.query(query, (err, results: Object[], fields) => {
			if (err) {
				console.log(err);
				return callback(err);
			}

			if (results.length === 0) {
				callback('El registro solicitado no existe');
			} else {
				callback(null, results);
			}
		});
	}

	private conectarDB() {
		this.connection.connect((err: mysql.MysqlError) => {
			if (err) {
				console.log(err.message);
				return;
			}

			this.connected = true;
			console.log('Conectado a DB');
		});
	}
}
export default Mysql;
