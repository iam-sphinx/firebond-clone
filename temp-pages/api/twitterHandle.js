import axios from "axios";

const handler = async (req, res) => {
  const code = req.query.code;

  try {
    const url = `https://api.twitter.com/2/oauth2/token?code=${code}&grant_type=authorization_code&client_id=QllVRHgtbzhGSEl0c1lWSUE4UmU6MTpjaQ&redirect_uri=https://firebond-client-staging.vercel.app/CommunitySetUpIntegration&code_verifier=challenge`;
    console.log(code);

    const response = await axios.post(url);
    const result = response.data;

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default handler;
