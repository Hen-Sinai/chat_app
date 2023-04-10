import express, { Application } from 'express';
import userRoutes from './routes/users';
import chatRoutes from './routes/chats';
import messageRoutes from './routes/messages';
import authRoutes from './routes/auth';
import db from './models';
import cors from 'cors';
import http from 'http';
import initializeSocketIO from './socket/socket';

const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/messages', messageRoutes);

db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});

initializeSocketIO(server);
