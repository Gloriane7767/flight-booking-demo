// src/components/ChatBot.tsx
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SESSION_ID = crypto.randomUUID(); // one session per browser tab

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I can help you search flights, make a booking, or cancel one. What would you like to do?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: SESSION_ID, message: input }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {open ? (
                <div className="flex flex-col w-80 h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-600 rounded-t-2xl">
                        <span className="text-white font-semibold">✈️ Flight Assistant</span>
                        <button onClick={() => setOpen(false)}><X className="text-white w-5 h-5" /></button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap
                  ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-xl text-sm">Thinking...</div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-200">
                        <input
                            className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            placeholder="Type a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && send()}
                        />
                        <button onClick={send} disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg">
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}
