import { readFile, writeFile } from 'fs/promises';
export class TaskController {
    async getAll(req, res) {
        const data = JSON.parse(await readFile('data.json', { encoding: 'utf-8' }));
        res.send(data);
    }
    async getById(req, res) {
        const { id } = req.params;
        const data = JSON.parse(await readFile('data.json', { encoding: 'utf-8' }));
        const item = data.find((item) => item.id === Number(id));
        res.send(item);
    }
    async create(req, res) {
        const newData = req.body;
        newData.id = crypto.randomUUID();
        const data = JSON.parse(await readFile('data.json', { encoding: 'utf-8' }));
        data.push(newData);
        await writeFile('data.json', JSON.stringify(data), { encoding: 'utf-8' });
        res.json(newData);
    }
    update(req, res) {
        const { id } = req.params;
        res.send(`Patch task id: ${id}`);
    }
    delete(req, res) {
        const { id } = req.params;
        res.send(`Delete task id: ${id}`);
    }
}
