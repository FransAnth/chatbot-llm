import { useEffect, useRef } from "react";
import { IChatConversations } from "../../interface/chat-conversation";
import ReactMarkdown from "react-markdown";

interface IChatbox {
  conversations: IChatConversations[];
}
const Chatbox = ({ conversations }: IChatbox) => {
  const convoRef = useRef<any>(null);

  useEffect(() => {
    convoRef.current?.lastElementChild?.scrollIntoView();
  }, [conversations]);

  return (
    <div id="chatConfigCss" className="h-[80vh] p-10 overflow-auto text-sm">
      {conversations?.map?.((conv: IChatConversations, index: number) => (
        <div key={index} ref={convoRef}>
          <div className="flex justify-end mb-2 gap-4">
            <div className="bg-primary px-4 py-2 rounded-lg text-white flex gap-2 max-w-[60%]">
              <div>{conv.question}</div>
            </div>
            <div className="w-5 h-5">
              <img src="src\assets\images\user-icon.png" />
            </div>
          </div>
          <div className="flex mb-2">
            {conv.answer ? (
              <div className="flex gap-4">
                <div className="w-5 h-5">
                  <img src="src\assets\images\chatbot-icon.png" />
                </div>
                <div className="flex-col justify-center text-white flex gap-2 max-w-[60%]">
                  <ReactMarkdown>{conv.answer}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="w-5 h-5">
                  <img src="src\assets\images\chatbot-icon.png" />
                </div>
                <div className="flex flex-col justify-center text-white gap-2 max-w-[60%]">
                  <div id="chatLoader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chatbox;
