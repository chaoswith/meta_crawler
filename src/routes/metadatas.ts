import express, { Request, Response } from 'express';
import { collections } from '../services/database.service';

export const router = express.Router();
router.use(express.json());
router.post('/metadata', async (req: Request, res: Response) => {
  console.log('post metadata');
  const { parser } = require('html-metadata-parser');

  try {
    let title = '';
    let image = '';
    let publisher = '';
    let description = '';
    let url = '';
    const currentDate = new Date();

    const recvString = await req.body;
    const recvUrl = JSON.parse(JSON.stringify(recvString)).url;
    parser(recvUrl).then(async (result: any) => {
      const jsonResult = await JSON.parse(JSON.stringify(result, null, 3));

      title = jsonResult.og.title;
      image = jsonResult.og.image;
      publisher = jsonResult.og.site_name;
      description = jsonResult.og.description;
      url = jsonResult.og.url;

      const metadata = { title: title, image: image, publisher: publisher, description: description, url: url, date: currentDate };
      console.log(metadata);
      const insertResult = await collections?.metadatas?.insertOne({
        title: title,
        image: image,
        publisher: publisher,
        description: description,
        url: url,
        date: currentDate,
      });
      insertResult ? res.status(201).send(metadata) : res.status(500).send('메타 데이터 입력에 실패했습니다.');
    });
  } catch (error) {
    res.status(400).send('오류가 발생했습니다.');
  }
});
router.get('/metadatas', async (_req: Request, res: Response) => {
  console.log('get metadatas');

  try {
    const metadatas = await collections?.metadatas?.find({}).toArray();
    res.status(200).send(metadatas);
  } catch (error) {
    res.status(500).send('오류가 발생했습니다.');
  }
});

export default router;
