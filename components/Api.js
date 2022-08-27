import axios from "axios";

export default axios.create({
    headers: {
    Authorization: process.env.token,
    Accept: "application/vnd.github.v3+json",
  },
});