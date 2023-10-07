import axios from "axios";

//export default axios.create({ baseURL: "http://localhost:5000" });
const baseURL = "http://192.168.0.107:5000";
//"http://192.168.0.102:5000"; tenda
//"http://192.168.18.4:5000"; tbx
export const sendAuthRequest = async (signup, data) => {
  console.log("IN Auth");
  const res = await axios({
    method: "post",
    url: `${baseURL}/user/login/`,
    data: { data },
  }).catch((err) => {
    console.log("Inside Error");
    console.log(err);
  });
  if (res.status !== 200 && res.status !== 201) {
    //console.log("Bad Status");
    return console.log("Unable to Authenticate");
  }
  const resData = await res.data;
  console.log("Response Data  ", resData);
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No user found");
  }

  const resData = await res.data;
  return resData;
};
