import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const LOGO_URL =
  "https://cdn.poehali.dev/files/253981b6-4019-40cc-81a7-eee612064ad1.jpg";

interface ChatItem {
  id: string;
  name: string;
  emoji: string;
  verified: boolean;
  lastMessage: string;
  time: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

const defaultChats: ChatItem[] = [
  {
    id: "saved",
    name: "Избранное",
    emoji: "\u2B50",
    verified: false,
    lastMessage: "Сохраненные сообщения",
    time: "",
    online: false,
  },
  {
    id: "spektr",
    name: "Spektr",
    emoji: "\u2705",
    verified: true,
    lastMessage: "Здравствуйте! Вы теперь в Spektr...",
    time: "12:00",
    online: true,
  },
  {
    id: "verbot",
    name: "Verified Bot",
    emoji: "\uD83E\uDD16",
    verified: true,
    lastMessage: "Здравствуйте, я верифицирую...",
    time: "11:45",
    online: true,
  },
  {
    id: "spwallet",
    name: "SPWALLET",
    emoji: "\uD83D\uDCB0",
    verified: true,
    lastMessage: "Добро пожаловать в SPWALLET",
    time: "10:30",
    online: false,
  },
];

const defaultMessages: Record<string, Message[]> = {
  saved: [],
  spektr: [
    {
      id: "s1",
      text: "Здравствуйте! Вы теперь в Spektr. Если возникнут вопросы, напишите нам.",
      sent: false,
      time: "12:00",
    },
  ],
  verbot: [
    {
      id: "v1",
      text: "Здравствуйте, я верифицирую канал или группу. Внимание! Я не даю галочку на пустой канал или группу, либо же на аккаунт.",
      sent: false,
      time: "11:45",
    },
  ],
  spwallet: [
    {
      id: "w1",
      text: "Добро пожаловать в SPWALLET. Ваш кошелёк готов к использованию.",
      sent: false,
      time: "10:30",
    },
  ],
};

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function Sidebar({
  chats,
  selectedChat,
  onSelectChat,
  searchQuery,
  onSearchChange,
  currentUser,
  onLogout,
}: {
  chats: ChatItem[];
  selectedChat: ChatItem | null;
  onSelectChat: (chat: ChatItem) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentUser: { displayName: string; username: string; avatar: string | null };
  onLogout: () => void;
}) {
  const filteredChats = useMemo(
    () =>
      chats.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [chats, searchQuery]
  );

  return (
    <div className="flex flex-col h-full bg-card border-r border-border/50">
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <img
              src={LOGO_URL}
              alt="Spektr"
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-bold text-lg tracking-tight">Spektr</span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Icon name="Plus" size={20} />
          </Button>
        </div>
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-secondary/50 border-0 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50 ${
              selectedChat?.id === chat.id ? "bg-accent" : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl">
                {chat.emoji}
              </div>
              {chat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm truncate">
                    {chat.name}
                  </span>
                  {chat.verified && (
                    <Icon
                      name="BadgeCheck"
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                  )}
                </div>
                {chat.time && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {chat.time}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {chat.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-primary">
                  {currentUser.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {currentUser.displayName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{currentUser.username}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onLogout}
          >
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatPanel({
  chat,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  onBack,
  isMobile,
}: {
  chat: ChatItem | null;
  messages: Message[];
  newMessage: string;
  onNewMessageChange: (val: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
  isMobile: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background text-muted-foreground">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Icon name="MessageCircle" size={36} className="text-muted-foreground/50" />
        </div>
        <p className="text-lg font-medium">Выберите чат</p>
        <p className="text-sm mt-1">для начала общения</p>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/30 bg-card flex-shrink-0">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 flex-shrink-0"
            onClick={onBack}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
        )}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
            {chat.emoji}
          </div>
          {chat.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm">{chat.name}</span>
            {chat.verified && (
              <Icon name="BadgeCheck" size={16} className="text-primary" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {chat.online ? (
              <span className="text-green-500">в сети</span>
            ) : (
              "был(а) недавно"
            )}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
          <Icon name="MoreVertical" size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Нет сообщений
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sent
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p
                className={`text-[11px] mt-1 ${
                  msg.sent
                    ? "text-primary-foreground/60"
                    : "text-muted-foreground"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-border/30 bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0 text-muted-foreground">
            <Icon name="Paperclip" size={20} />
          </Button>
          <Input
            placeholder="Написать сообщение..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-secondary/50 border-0"
          />
          <Button
            size="icon"
            className="h-10 w-10 flex-shrink-0 spektr-gradient border-0"
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Chat = () => {
  const navigate = useNavigate();

  const [currentUser] = useState(() => {
    const stored = localStorage.getItem("spektr_current_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [chats] = useState<ChatItem[]>(defaultChats);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [allMessages, setAllMessages] =
    useState<Record<string, Message[]>>(defaultMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const currentMessages = selectedChat
    ? allMessages[selectedChat.id] || []
    : [];

  const handleSelectChat = (chat: ChatItem) => {
    setSelectedChat(chat);
    setMobileShowChat(true);
  };

  const handleBack = () => {
    setMobileShowChat(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const msg: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage.trim(),
      sent: true,
      time: getCurrentTime(),
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), msg],
    }));
    setNewMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("spektr_current_user");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className={`w-full md:w-80 flex-shrink-0 ${
          mobileShowChat ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="w-full">
          <Sidebar
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        </div>
      </div>

      <div
        className={`flex-1 ${
          mobileShowChat ? "flex" : "hidden md:flex"
        }`}
      >
        <ChatPanel
          chat={selectedChat}
          messages={currentMessages}
          newMessage={newMessage}
          onNewMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
          isMobile={mobileShowChat}
        />
      </div>
    </div>
  );
};

export default Chat;
