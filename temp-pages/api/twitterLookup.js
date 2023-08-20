import axios from "axios";

const handler = async (req, res) => {
  const token = req.query.token;
  try {
    const url =
      "https://api.twitter.com/2/users/me?user.fields=created_at&expansions=pinned_tweet_id&tweet.fields=author_id,created_at";

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = response.data;
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export default handler;
