import { Router, Request, Response } from 'express';
import Mysql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
	const query = `SELECT * FROM heroes`;

	Mysql.runQuery(query, (err: any, heroes: Object[]) => {
		if (err) {
			res.status(400).json({
				ok: false,
				mensaje: err
			});
		} else {
			res.json({
				ok: true,
				mensaje: heroes
			});
		}
	});
});

router.get('/heroes/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	const escapeID = Mysql.instance.connection.escape(id);

	const query = `SELECT * FROM heroes where id = ${id}`;

	Mysql.runQuery(query, (err: any, heroe: Object[]) => {
		if (err) {
			res.status(400).json({
				ok: false,
				mensaje: err
			});
		} else {
			res.json({
				ok: true,
				mensaje: heroe[0]
			});
		}
	});
});

export default router;
