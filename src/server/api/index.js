import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Create general-purpose API sub-app
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.on('mount', () => {
  console.log('Este.js api is now available at path %s', app.mountpath);
});

export default app;
