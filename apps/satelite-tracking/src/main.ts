import express from 'express';
import axios from 'axios';
import cors from 'cors';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors()); 
app.get('/', (req, res) => {
  axios
    .get('http://api.open-notify.org/iss-now.json')
    .then((data) => {
      // check data validity? 
      if(data?.data?.message ==='success'){
        res.send(data.data);
      }else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error(error); // proper logging , not in console
      res.sendStatus(204);
    });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
