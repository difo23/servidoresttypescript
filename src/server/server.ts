import express from 'express';
import path from 'path';

class Server {
	public app: express.Application;
	public port: number;

	constructor(puerto: number) {
		this.port = puerto;
		this.app = express();
	}

	static init(puerto: number) {
		return new Server(puerto);
	}
	start(callback: Function) {
		this.app.listen(this.port, callback);
		this.publicFolder();
	}

	private publicFolder() {
		const publicPath = path.resolve(__dirname, '../public');
		this.app.use(express.static(publicPath));
	}
}
export default Server;
