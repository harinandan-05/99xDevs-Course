import express, { json } from 'express';
import router from './routes/authcontroller';

const app = express();
app.use(express.json());

app.use("/api/v1" , router)

app.listen(3000,() => {
    console.log("server is up")
});

