import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConversationSkeleton } from "../components/ConversationSkeleton";
import { MessageSkeleton } from "../components/MessageSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User as UserIcon, Clock, ChevronLeft, MoreVertical, MessageSquare, Search, Phone, Video, Info } from "lucide-react";
import toast from "react-hot-toast";

const MessagingHub = () => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = localStorage.getItem("token");
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Your session has expired. Please log in again.");
        navigate("/login");
    };

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }
        fetchConversations();

        const interval = setInterval(() => fetchConversations(true), 15000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (activeConversation) {
            fetchMessages(activeConversation.id);

            const interval = setInterval(() => fetchMessages(activeConversation.id, true), 3000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async (silent = false) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 401) handleLogout();
            
            const data = await res.json();
            if (Array.isArray(data)) {
                setConversations(data);
            }
            if (!silent) setLoading(false);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
            if (!silent) setLoading(false);
        }
    };

    const fetchMessages = async (conversationId, silent = false) => {
        try {
            if (!silent && messages.length === 0) setMessagesLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${conversationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 401) handleLogout();
            
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
            if (!silent) setMessagesLoading(false);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            if (!silent) setMessagesLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation || !user) return;

        const messageContent = newMessage;
        setNewMessage("");
        setSending(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
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
                fetchConversations(true);
            } else {
                toast.error("Failed to send message");
                setNewMessage(messageContent);
            }
        } catch {
            toast.error("Error sending message");
            setNewMessage(messageContent);
        } finally {
            setSending(false);
        }
    };

    const getPartner = (conversation) => {
        if (!conversation || !user) return null;
        return conversation.participants.find(p => p.id !== user.id) || conversation.participants[0];
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const filteredConversations = conversations.filter(conv => {
        const partner = getPartner(conv);
        return partner?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!user) return null;

    return (
        <div className="pt-24 pb-0 min-h-screen bg-[#fafafa] flex flex-col overflow-hidden">
            <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 flex gap-0 h-[calc(100vh-6rem)] py-4 overflow-hidden">

                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`w-full md:w-[380px] lg:w-[420px] bg-white border border-black/5 rounded-3xl shadow-sm flex flex-col overflow-hidden z-20 ${activeConversation ? 'hidden md:flex' : 'flex'}`}
                >
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-display font-black tracking-tight uppercase">Messages</h2>
                            <div className="p-2 bg-zinc-50 rounded-full border border-black/5">
                                <MessageSquare size={18} className="text-black" />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                            <input 
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => <ConversationSkeleton key={i} />)
                        ) : filteredConversations.length === 0 ? (
                            <div className="text-center py-20 px-6">
                                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-black/5">
                                    <MessageSquare size={24} className="text-zinc-300" />
                                </div>
                                <p className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Quiet in here...</p>
                                <p className="text-xs text-zinc-400 mt-2 font-medium">Your property inquiries and replies will appear in this space.</p>
                            </div>
                        ) : (
                            filteredConversations.map(conv => {
                                const partner = getPartner(conv);
                                const latestMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
                                const isActive = activeConversation?.id === conv.id;

                                return (
                                    <button
                                        key={conv.id}
                                        onClick={() => setActiveConversation(conv)}
                                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group ${isActive ? 'bg-black text-white shadow-xl shadow-black/10' : 'hover:bg-zinc-50 bg-white border border-black/5 text-black'}`}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl transition-transform group-hover:scale-105 duration-500 ${isActive ? 'bg-white/10 text-white' : 'bg-black text-white'}`}>
                                                {partner?.name?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white bg-green-500 ${isActive ? 'border-black' : ''}`}></div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className={`font-black uppercase text-[10px] tracking-widest truncate ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                                                    {partner?.name || "Unknown User"}
                                                </h3>
                                                {latestMessage && (
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white/40' : 'text-zinc-400'}`}>
                                                        {formatTime(latestMessage.createdAt)}
                                                    </span>
                                                )}
                                            </div>
                                            {latestMessage ? (
                                                <p className={`text-xs truncate font-medium ${isActive ? 'text-white/70' : 'text-zinc-500'}`}>
                                                    {latestMessage.senderId === user.id ? "You: " : ""}{latestMessage.content}
                                                </p>
                                            ) : (
                                                <p className={`text-xs italic font-medium ${isActive ? 'text-white/50' : 'text-zinc-400'}`}>Start a new dialogue</p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </motion.div>

                {/* Chat Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex-1 bg-white border-y border-r border-black/5 md:rounded-3xl shadow-sm flex flex-col overflow-hidden relative md:ml-4 ${!activeConversation ? 'hidden md:flex' : 'flex'}`}
                >
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white/80 backdrop-blur-md z-10">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setActiveConversation(null)}
                                        className="md:hidden p-2 hover:bg-zinc-50 rounded-full transition-all active:scale-90"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-black/10">
                                            {getPartner(activeConversation)?.name?.charAt(0).toUpperCase() || "?"}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[11px] uppercase tracking-widest text-black">{getPartner(activeConversation)?.name || "Partner"}</h3>
                                        <p className="text-[9px] text-green-600 font-black uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                            Online & Available
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[Phone, Video, Info].map((Icon, i) => (
                                        <button key={i} className="p-2.5 text-black hover:bg-zinc-50 transition-all rounded-full border border-black/0 hover:border-black/5 opacity-40 hover:opacity-100">
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fdfdfd] custom-scrollbar">
                                {messagesLoading ? (
                                    <>
                                        {[...Array(4)].map((_, i) => (
                                            <MessageSkeleton key={i} isMine={i % 2 === 0} />
                                        ))}
                                    </>
                                ) : messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center max-w-xs mx-auto opacity-40">
                                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                                            <Clock size={28} className="text-zinc-400" />
                                        </div>
                                        <p className="font-black text-[10px] uppercase tracking-widest text-black">Encryption Enabled</p>
                                        <p className="text-xs mt-2 font-medium">Your conversation is secured. Send a message to begin.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-6">
                                        <div className="text-center py-8">
                                            <span className="px-4 py-1.5 bg-zinc-50 border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400">
                                                Beginning of communication
                                            </span>
                                        </div>
                                        {messages.map((msg, index) => {
                                            const isMine = msg.senderId === user.id;
                                            const isLastInGroup = index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId;

                                            return (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    key={msg.id} 
                                                    className={`flex gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    {!isMine && (
                                                        <div className="w-8 flex-shrink-0 flex items-end mb-1">
                                                            {isLastInGroup && (
                                                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                                                                    {getPartner(activeConversation)?.name?.charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                                        <div
                                                            className={`px-6 py-3.5 rounded-3xl text-sm font-medium leading-relaxed transition-all ${isMine
                                                                ? 'bg-black text-white rounded-br-sm shadow-xl shadow-black/10'
                                                                : 'bg-white border border-black/5 text-black rounded-bl-sm shadow-sm'}`}
                                                        >
                                                            {msg.content}
                                                        </div>
                                                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest mt-2 px-2 opacity-60">
                                                            {formatTime(msg.createdAt)}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Box */}
                            <div className="p-6 bg-white border-t border-black/5">
                                <form onSubmit={handleSendMessage} className="flex gap-4 items-end max-w-4xl mx-auto w-full">
                                    <div className="flex-1 bg-zinc-50 border border-black/5 rounded-3xl relative transition-all focus-within:ring-2 focus-within:ring-black/5">
                                        <textarea
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Secure message..."
                                            className="w-full bg-transparent border-none focus:ring-0 p-5 max-h-40 min-h-[64px] resize-none text-sm font-medium placeholder-zinc-400"
                                            rows="1"
                                            style={{ lineHeight: '1.5' }}
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
                                        className="h-[64px] w-[64px] rounded-3xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all group"
                                    >
                                        <Send size={22} strokeWidth={2.5} className={sending ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"} />
                                    </button>
                                </form>
                                <p className="text-[8px] text-center mt-4 uppercase font-black tracking-[0.3em] text-zinc-300">
                                    End-to-end encrypted • LinkHome Secure Relay
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-12 bg-zinc-50/30">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-md"
                            >
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 border border-black/5 shadow-2xl shadow-black/5">
                                    <MessageSquare size={36} strokeWidth={1} className="text-black/60" />
                                </div>
                                <h3 className="text-3xl font-display font-black tracking-tighter mb-4 uppercase">Direct Messages</h3>
                                <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-8">
                                    Connect securely with property owners. Select a conversation to view your message history or start a new inquiry from any listing.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['Privacy First', 'Secure Relay', 'Instant Sync'].map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-white border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-black/40">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
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
                    background-color: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default MessagingHub;
