import axios from "axios";
export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: "https://secret-family-recipies00.herokuapp.com/", //This type of thing could be added so we just have to add the extra portion
  });
};
