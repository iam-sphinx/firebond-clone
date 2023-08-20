import axios from "axios";
import cron from "node-cron";

const handler = async (req, res) => {
  const id = req.query.id;

  let result = "";

  const task = cron.schedule("0 0  * * *", async () => {
    const url = `https://api.twitter.com/2/users/${id}/?user.fields=public_metrics`;
    const headers = {
      Authorization:
        "Bearer " +
        "AAAAAAAAAAAAAAAAAAAAABkDnQEAAAAADj3ApSn0IPp03mIMxOLpREs%2BLpk%3DyZa5kozUb8DbxjTLcCQgACWs8oSaUno7aGx15TWqas8EbqHH9h",
    };
    const response = await axios.get(url, { headers });
    result = response.data;
    console.log(result);
  });
  
  task.start();

  res.status(200).json(result);
};

export default handler;
