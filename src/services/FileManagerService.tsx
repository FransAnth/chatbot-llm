import AxiosInstance from "../helpers/_axios-instance";

const { Chatbot } = AxiosInstance();

export const uploadFile = async (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await Chatbot.post(`/file/upload/`, formData, config);

  return response;
};
