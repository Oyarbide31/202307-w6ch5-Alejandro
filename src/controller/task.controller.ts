import { Request, Response } from 'express';
import { readFile, writeFile } from 'fs/promises';

export class TaskController {
  async getAll(req: Request, res: Response) {
    const data = JSON.parse(await readFile('data.json', { encoding: 'utf-8' }));
    res.send(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data: any[] = JSON.parse(
      await readFile('data.json', { encoding: 'utf-8' })
    );
    const item = data.find((item) => item.id === Number(id));
    res.send(item);
  }

  async create(req: Request, res: Response) {
    const newData = req.body;
    newData.id = crypto.randomUUID();
    const data: any[] = JSON.parse(
      await readFile('data.json', { encoding: 'utf-8' })
    );
    data.push(newData);

    await writeFile('data.json', JSON.stringify(data), { encoding: 'utf-8' });

    res.json(newData);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    res.send(`Patch task id: ${id}`);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    res.send(`Delete task id: ${id}`);
  }
}
