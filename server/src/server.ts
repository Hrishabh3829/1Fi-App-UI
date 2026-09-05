import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const HOST = '127.0.0.1'; // Security requirement: Bind strictly to localhost/127.0.0.1

app.listen(PORT, HOST, () => {
  console.log(`[1Fi Marketplace API] Server running at http://${HOST}:${PORT}`);
});
