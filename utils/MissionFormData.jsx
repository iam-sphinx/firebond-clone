let formData = {
  title: '',
  amount: 0,
  seleted_date: '',
  description: "",
  submission : 0,
  filename: "",
  wallet_id: " ",
  visibility : '',
  submission_type : {},
  validationUrl: "",
  referralUrl:"",
  status : '',
  priority : '',
  tags : [{src:'',title:''}],
  recurrence : '',
  mission_id:'',
  heading1: '',
  subheading1 : '',
  heading2 : '',
  subheading2 : '',
   xp : 0,
  // have to make steps an array
  //
};

export default function MissionFormData() {
  return formData;
}
