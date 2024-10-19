import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Send } from "lucide-react";
import MobileHeader from "../../components/mobile/basics/MobileHeader";
import MobileNavBar from "../../components/mobile/basics/MobileNavBar";
import MobileInfoFooter from "../../components/mobile/basics/MobileInfoFooter";
import Notificator from "../../components/general/Notficator";
import { useNavbar } from "../../hooks/useNavbar";

interface NotficatorProps {
  type: "success" | "warning" | "error";
  message: string;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Moin, welche Fragen zur Feuerwehr hast Du?", sender: "bot" }
  ]);  const [inputMessage, setInputMessage] = useState("");
  const [notification, setNotification] = useState<NotficatorProps | null>(null);
  const { changeView } = useNavbar();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = { text: inputMessage, sender: "user" };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    try {
      const response = await fetch("/api/service/receive/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: inputMessage }),
      });
      if (response.ok) {
        const data = await response.json();
        const botReply: Message = { text: data.content, sender: "bot" };
        setMessages(prevMessages => [...prevMessages, botReply]);
      } else {
        throw new Error("Failed to get response from the server");
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Nachricht konnte nicht gesendet werden!",
      });
    }
    setInputMessage("");
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MobileHeader name="Chatbot" link="/home" />
      {notification && (
        <Notificator
          type={notification.type}
          text={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="flex-1 p-2 sm:p-4 space-y-2 sm:space-y-4 break-normal">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] bg-secondary p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
              msg.sender === "user"
                ? "text-white self-end ml-auto"
                : "text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 sm:p-4 bg-white border-t">
        <div className="flex items-end bg-white border border-primary overflow-hidden rounded-md">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Deine Nachricht..."
            className="flex-1 px-2 py-2 focus:outline-none text-sm sm:text-base w-[80%] resize-none overflow-hidden"
            rows={1}
            style={{ maxHeight: '100px' }}
          />
          <button
            onClick={sendMessage}
            className="bg-secondary m-0 rounded-none text-white focus:outline-none w-[20%] flex justify-center items-center h-full"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      <MobileNavBar changeView={changeView} preset="" />
      <MobileInfoFooter />
    </div>
  );
};

export default ChatbotComponent;