import axios from "axios";
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: token,
    },
    //baseURL: 'https://water-my-plants-tt39.herokuapp.com/' This type of thing could be added so we just have to add the extra portion
  });
};
