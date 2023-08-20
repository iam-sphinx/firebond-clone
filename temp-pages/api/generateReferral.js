import { nanoid } from "nanoid";
const handler = async (req, res) => {
  const { referralUrl } = req.body;
  //creating unique id for mission
  const referralID = nanoid();
  //creating referral url
  const updatedReferralUrl = `${referralUrl}/referral/?referal_id=${referralID}`;
  //creating validation url
  const validationUrl = `${referralUrl}/validate/?referal_id=${referralID}`;

  res.status(200).json({ updatedReferralUrl, validationUrl });
};

export default handler;
