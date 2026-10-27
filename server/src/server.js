import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';

const start = async () => {
  await connectDB();
  createApp().listen(env.PORT, () => console.log(`HaqDaar API listening on port ${env.PORT}`));
};

start().catch((err) => {
  console.error('Failed to start:', err.message);
  process.exit(1);
});
