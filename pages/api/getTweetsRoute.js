import axios from "axios";
import cron from "node-cron";

const handler = async (req, res) => {
  const id = req.query.id;

  const url = `https://api.twitter.com/2/users/${id}/tweets?tweet.fields=created_at&expansions=attachments.media_keys`;

  const headers = {
    Authorization:
      "Bearer " +
      "AAAAAAAAAAAAAAAAAAAAABkDnQEAAAAADj3ApSn0IPp03mIMxOLpREs%2BLpk%3DyZa5kozUb8DbxjTLcCQgACWs8oSaUno7aGx15TWqas8EbqHH9h",
  };

  let result = "";

  const task = cron.schedule("0 0  * * *", async () => {
    try {
      const response = await axios.get(url, { headers });
      result = response.data;
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching tweets." });
    }
  });
  task.start();
  res.status(200).json(result);
};

export default handler;
