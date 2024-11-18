import { useEffect, useState } from "react";
import { IChatConversations } from "../interface/chat-conversation";
import ChatBox from "../components/chat-room/chat-box";
import UserMessageContainer from "../components/chat-room/user-message-container";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  clearChatHistory,
  getChatHistory,
  queryChatbot,
} from "../services/ChatService";
import { useLoginStore } from "../store/login-info-store";
import ActionButton from "../components/buttons/action-button";
import Loader from "../components/global/loader";

const ChatInterfacePage = () => {
  const [conversation, setConversation] = useState<IChatConversations[]>([]);
  const userId = useLoginStore((state) => state.userId);

  const { data: queryResponse, status: queryStatus } = useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      return await getChatHistory(userId);
    },
  });

  useEffect(() => {
    if (queryStatus === "success") {
      if (queryResponse) {
        const chatHistory = queryResponse.data.map((history: any) => {
          return {
            userId: history.user_id,
            question: history.question,
            answer: history.answer,
            timestamp: history.timestamp,
          };
        });

        setConversation(chatHistory);
      }
    }
  }, [queryStatus]);

  const { mutate: chatbotQueryFn, isPending: isChatbotThinking } = useMutation({
    mutationFn: queryChatbot,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        const { data } = res;
        const currConvo = [...conversation];

        currConvo.pop();
        currConvo.push(data);

        setConversation(currConvo);
      }
    },
  });

  const sendMessage = (message: string) => {
    const currConvo = [...conversation];

    currConvo.push({
      userId: userId,
      question: message,
      answer: null,
      timestamp: "",
    });

    setConversation(currConvo);

    // Send Message to chatbot
    chatbotQueryFn({
      userId: userId,
      question: message,
    });
  };

  const { mutate: clearConversation, isPending: isDeletingChatHist } =
    useMutation({
      mutationFn: clearChatHistory,
      onSuccess: (res: any) => {
        if (res.status === 200) {
          console.log(res);
          setConversation([]);
        }
      },
    });

  return (
    <div className="flex flex-col h-full gap-4 p-12 bg-secondary">
      <div className="fixed right-10 top-2 z-50 opacity-0 hover:opacity-100 transition-all duration-500">
        <ActionButton
          label=""
          type="delete"
          callback={() => clearConversation(userId)}
        />
      </div>
      <ChatBox conversations={conversation} />
      <UserMessageContainer
        callback={sendMessage}
        isDisabled={isChatbotThinking}
      />
      {isDeletingChatHist && <Loader />}
    </div>
  );
};

export default ChatInterfacePage;
