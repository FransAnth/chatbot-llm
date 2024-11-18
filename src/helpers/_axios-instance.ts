import axios from "axios";

export default function AxiosInstance() {
  let Chatbot = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  return { Chatbot };
}
