import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import ayesoul from './ayesoul.js'; // Pastikan file ayesoul.js sesuai

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Chat Ayesoul
app.post('/api/chat', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await ayesoul.request(query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan jawaban' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));