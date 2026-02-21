import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, User, MoreVertical, Phone, Video, Image as ImageIcon, Smile, ArrowLeft, ShieldCheck } from "lucide-react";

const MessagingHub = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");

    const chats = [
        {
            id: 1,
            name: "Akash Sharma",
            role: "Property Owner",
            property: "Skyline Penthouse",
            lastMessage: "The keys are ready for pickup tomorrow.",
            time: "2m ago",
            online: true,
            unread: 2,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akash"
        },
        {
            id: 2,
            name: "Priya Patel",
            role: "Concierge",
            property: "HomeLink Support",
            lastMessage: "How can I assist you with your move today?",
            time: "1h ago",
            online: true,
            unread: 0,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
        },
        {
            id: 3,
            name: "Rahul Mehra",
            role: "Owner",
            property: "Urban Loft",
            lastMessage: "Received the deposit, thank you!",
            time: "Yesterday",
            online: false,
            unread: 0,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
        }
    ];

    const messages = [
        { id: 1, text: "Hey! Is the Skyline Penthouse still available for viewing?", sender: "me", time: "10:00 AM" },
        { id: 2, text: "Yes, it is! Would you like to come by tomorrow at 4 PM?", sender: "them", time: "10:05 AM" },
        { id: 3, text: "Perfect, see you then.", sender: "me", time: "10:10 AM" },
        { id: 4, text: "Great. The keys are ready for pickup tomorrow.", sender: "them", time: "2m ago" },
    ];

    return (
        <div className="pt-24 lg:pt-32 pb-12 px-6 h-screen bg-dark-900 flex flex-col font-sans">
            <div className="max-w-7xl mx-auto w-full h-full glass-card rounded-[2.5rem] border border-white/5 overflow-hidden flex shadow-2xl">

                {/* Chat List Sidebar */}
                <div className={`w-full lg:w-[400px] border-r border-white/5 flex flex-col bg-white/[0.01] ${selectedChat ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-8 border-b border-white/5">
                        <h2 className="text-3xl font-display font-bold mb-6">Messages</h2>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500/50 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                        {chats.map((chat) => (
                            <motion.button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                                className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all text-left group ${selectedChat?.id === chat.id ? 'bg-white/5 shadow-lg border border-white/5' : 'bg-transparent border border-transparent'}`}
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 relative">
                                        <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                    </div>
                                    {chat.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-dark-800 rounded-full" />
                                    )}
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-white group-hover:text-brand-400 transition-colors">{chat.name}</h4>
                                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-brand-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 leading-none">
                                        <ShieldCheck size={12} /> {chat.property}
                                    </p>
                                    <p className="text-sm text-white/40 truncate leading-tight">{chat.lastMessage}</p>
                                </div>

                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 bg-brand-600 rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg shadow-brand-600/20">
                                        {chat.unread}
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Message View */}
                <div className={`flex-1 flex flex-col relative ${!selectedChat ? 'hidden lg:flex' : 'flex'}`}>
                    {selectedChat ? (
                        <>
                            {/* Message Header */}
                            <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedChat(null)}
                                        className="lg:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                                        <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold leading-none mb-1">{selectedChat.name}</h3>
                                        <p className="text-[10px] text-brand-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {selectedChat.online ? 'Online' : 'Away'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-brand-500 hover:bg-brand-500/10 transition-all">
                                        <Phone size={20} />
                                    </button>
                                    <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-brand-500 hover:bg-brand-500/10 transition-all">
                                        <Video size={20} />
                                    </button>
                                    <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-brand-500 hover:bg-brand-500/10 transition-all">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Body */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] absolute inset-0 pointer-events-none" />
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                {messages.map((m) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] group flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-6 py-4 rounded-[2rem] text-sm font-medium shadow-xl ${m.sender === 'me' ? 'bg-brand-600 text-white rounded-tr-lg' : 'bg-white/5 border border-white/10 text-white rounded-tl-lg'}`}>
                                                {m.text}
                                            </div>
                                            <span className="mt-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">{m.time}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); setMessage(""); }}
                                    className="relative flex items-center gap-4"
                                >
                                    <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                                        <button type="button" className="w-11 h-11 rounded-2xl flex items-center justify-center text-white/20 hover:text-white transition-all bg-white/5">
                                            <ImageIcon size={20} />
                                        </button>
                                        <button type="button" className="w-11 h-11 rounded-2xl flex items-center justify-center text-white/20 hover:text-white transition-all bg-white/5">
                                            <Smile size={20} />
                                        </button>
                                    </div>
                                    <div className="flex-1 relative group">
                                        <input
                                            type="text"
                                            placeholder="Type a signature message..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 outline-none focus:border-brand-500/50 transition-all text-sm font-medium"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-brand-600 hover:bg-brand-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20 active:scale-90 transition-all"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-8 relative">
                                <MessageSquare className="text-white/10" size={48} />
                                <div className="absolute inset-0 bg-brand-600/10 blur-[40px] rounded-full animate-pulse" />
                            </div>
                            <h3 className="text-3xl font-display font-bold mb-4">Start a Conversation</h3>
                            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                                Connect directly with property owners and concierge services to finalize your elite stay.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingHub;
