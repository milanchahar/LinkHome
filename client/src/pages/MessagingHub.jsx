import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User as UserIcon, Clock, ChevronLeft, MoreVertical, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const MessagingHub = () => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchConversations();

        const interval = setInterval(fetchConversations, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeConversation) {
            fetchMessages(activeConversation.id);

            const interval = setInterval(() => fetchMessages(activeConversation.id), 3000);
            return () => clearInterval(interval);
        }
    }, [activeConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/conversations", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setConversations(data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
            setLoading(false);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/messages/${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        const messageContent = newMessage;
        setNewMessage("");
        setSending(true);

        try {
            const response = await fetch("http://localhost:5001/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    conversationId: activeConversation.id,
                    content: messageContent
                })
            });

            if (response.ok) {
                const newMsg = await response.json();
                setMessages(prev => [...prev, newMsg]);
                fetchConversations();
            } else {
                toast.error("Failed to send message");
                setNewMessage(messageContent);
            }
        } catch (error) {
            toast.error("Error sending message");
            setNewMessage(messageContent);
        } finally {
            setSending(false);
        }
    };

    const getPartnerName = (conversation) => {
        const partner = conversation.participants.find(p => p.id !== user.id);
        return partner ? partner.name : "Unknown User";
    };

    const getPartnerInitial = (conversation) => {
        const partner = conversation.participants.find(p => p.id !== user.id);
        return partner && partner.name ? partner.name.charAt(0).toUpperCase() : "?";
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="pt-24 pb-0 min-h-screen bg-[#fbfbf9] flex flex-col">
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 flex gap-6 h-[calc(100vh-6rem)] py-6">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`w-full md:w-1/3 lg:w-1/4 bg-white border border-black/5 rounded-3xl shadow-sm flex-col overflow-hidden ${activeConversation ? 'hidden md:flex' : 'flex'}`}
                >
                    <div className="p-6 border-b border-black/5 bg-zinc-50/50">
                        <h2 className="text-xl font-display font-black tracking-widest uppercase">Messages</h2>
                        <p className="text-xs text-zinc-500 font-medium mt-1">Private Communications</p>
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 custom-scrollbar">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <span className="text-xs font-black tracking-widest uppercase text-black/40 animate-pulse">Loading...</span>
                            </div>
                        ) : conversations.length === 0 ? (
                            <div className="text-center py-12 px-4">
                                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare size={20} className="text-zinc-400" />
                                </div>
                                <p className="text-sm font-medium text-zinc-600">No conversations yet</p>
                                <p className="text-xs text-zinc-400 mt-2">When you contact property owners, your messages will appear here.</p>
                            </div>
                        ) : (
                            conversations.map(conv => {
                                const latestMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
                                const isActive = activeConversation?.id === conv.id;

                                return (
                                    <button
                                        key={conv.id}
                                        onClick={() => setActiveConversation(conv)}
                                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${isActive ? 'bg-black text-white' : 'hover:bg-zinc-50 bg-white border border-black/5 text-black'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-lg ${isActive ? 'bg-white/20 text-white' : 'bg-black text-white'}`}>
                                            {getPartnerInitial(conv)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className={`font-bold truncate ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                                                    {getPartnerName(conv)}
                                                </h3>
                                                {latestMessage && (
                                                    <span className={`text-[10px] whitespace-nowrap ${isActive ? 'text-white/60' : 'text-zinc-400'}`}>
                                                        {formatTime(latestMessage.createdAt)}
                                                    </span>
                                                )}
                                            </div>
                                            {latestMessage ? (
                                                <p className={`text-sm truncate ${isActive ? 'text-white/80' : 'text-zinc-500'}`}>
                                                    {latestMessage.senderId === user.id ? "You: " : ""}{latestMessage.content}
                                                </p>
                                            ) : (
                                                <p className={`text-sm italic ${isActive ? 'text-white/60' : 'text-zinc-400'}`}>New conversation</p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex-1 bg-white border border-black/5 rounded-3xl shadow-sm flex-col overflow-hidden relative ${!activeConversation ? 'hidden md:flex' : 'flex'}`}
                >
                    {activeConversation ? (
                        <>
                            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white z-10">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setActiveConversation(null)}
                                        className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-display font-bold">
                                        {getPartnerInitial(activeConversation)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{getPartnerName(activeConversation)}</h3>
                                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 text-zinc-400 hover:text-black transition-colors rounded-full hover:bg-zinc-100">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30 custom-scrollbar">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                        <Clock size={32} className="mb-4 text-zinc-400" />
                                        <p className="font-medium text-zinc-600">Start of conversation</p>
                                        <p className="text-sm mt-1 text-zinc-400">Send a message to begin the dialogue.</p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isMine = msg.senderId === user.id;
                                        const showAvatar = index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId;

                                        return (
                                            <div key={msg.id} className={`flex gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
                                                {!isMine && (
                                                    <div className="w-8 flex-shrink-0 flex items-end">
                                                        {showAvatar && (
                                                            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                                                                {getPartnerInitial(activeConversation)}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                                    <div
                                                        className={`px-5 py-3 rounded-2xl ${isMine
                                                            ? 'bg-black text-white rounded-br-sm'
                                                            : 'bg-white border border-black/5 text-black rounded-bl-sm shadow-sm'}`}
                                                    >
                                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    </div>
                                                    <span className="text-[10px] text-zinc-400 font-medium mt-1 px-1">
                                                        {formatTime(msg.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 bg-white border-t border-black/5">
                                <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                                    <div className="flex-1 bg-zinc-50 border border-black/10 rounded-2xl relative">
                                        <textarea
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="w-full bg-transparent border-none focus:ring-0 p-4 max-h-32 min-h-[56px] resize-none text-sm placeholder-zinc-400"
                                            rows="1"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(e);
                                                }
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim() || sending}
                                        className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 hover:bg-zinc-800"
                                    >
                                        <Send size={20} className={sending ? "animate-pulse" : ""} />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-8">
                            <div className="max-w-md">
                                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/5 shadow-sm">
                                    <MessageSquare size={32} strokeWidth={1.5} className="text-black/40" />
                                </div>
                                <h3 className="text-2xl font-display font-black tracking-tight mb-3">Your Messages</h3>
                                <p className="text-zinc-500">
                                    Select a conversation from the sidebar to view your messages, or browse listings to connect with property owners.
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(0,0,0,0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default MessagingHub;
