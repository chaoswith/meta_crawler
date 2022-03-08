import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";


export const router = express.Router();
router.use(express.json());
router.post('/metadata', async (req: Request, res: Response) => {
	console.log('post metadata');
	const { parser } = require('html-metadata-parser');

	try {

		var title = '';
		var image = '';
		var publisher = '';
		var description = '';
		var url = '';
		const current_date = new Date();

		const recv_string = await req.body;
		const recv_url = JSON.parse(JSON.stringify(recv_string))['url'];
		parser(recv_url).then(async (result: any) => {

			const json_result = await JSON.parse(JSON.stringify(result, null, 3));

			title = json_result["og"]["title"];
			image = json_result["og"]["image"];
			publisher = json_result["og"]["site_name"];
			description = json_result["og"]["description"];
			url = json_result["og"]["url"];

			const metadata = { title: title, image: image, publisher: publisher, description: description, url: url, date: current_date };
			console.log(metadata);
			const insert_result = await collections?.metadatas?.insertOne({ title: title, image: image, publisher: publisher, description: description, url: url, date: current_date });
			insert_result
				? res.status(201).send(metadata)
				: res.status(500).send("메타 데이터 입력에 실패했습니다.");

		});

	} catch (error) {
		res.status(400).send('오류가 발생했습니다.');
	}
});
router.get('/metadatas', async (_req: Request, res: Response) => {
	console.log('get metadatas');

	try {
		const metadatas = await (collections?.metadatas?.find({}).toArray());
		res.status(200).send(metadatas);
	} catch (error) {
		res.status(500).send('오류가 발생했습니다.');
	}
});

export default router;
