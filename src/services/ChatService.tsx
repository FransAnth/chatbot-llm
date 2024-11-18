import AxiosInstance from "../helpers/_axios-instance";

const { Chatbot } = AxiosInstance();

export const queryChatbot = async (payload: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await Chatbot.post(`/chatbot/chats/`, payload, config);

  return response;
};

export const getChatHistory = async (userId: any) => {
  const response = await Chatbot.get(`/chatbot/chats/`, {
    params: {
      userId: userId,
    },
  });

  return response;
};

export const clearChatHistory = async (userId: any) => {
  const response = await Chatbot.delete(`/chatbot/chats/`, {
    params: {
      userId: userId,
    },
  });

  return response;
};

export const modifyChatConfig = async (payload: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await Chatbot.post(
    `/chatbot/chats/config/`,
    payload,
    config
  );

  return response;
};

export const getChatConfig = async (userId: any) => {
  const response = await Chatbot.get(`/chatbot/chats/config/`, userId);

  return response.data[0];
};
