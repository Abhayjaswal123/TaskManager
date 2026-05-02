import express from 'express'
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/task.routes.js';
import cors from 'cors'
import config from './config/config.js';

const app = express();

app.use(cors({
    origin: config.BASE_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

export default app;