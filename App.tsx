
import React, { useState, useEffect, useRef } from 'react';
import { getCloudflareInfo } from './services/geminiService';
import { ComparisonItem, ChatMessage } from './types';

const COMPARISONS: ComparisonItem[] = [
  {
    feature: "Ubicación",
    traditional: "Servidor central fijo",
    cloudflare: "Red global en el Borde (Edge)",
    icon: "fa-earth-americas"
  },
  {
    feature: "Latencia",
    traditional: "Alta según la distancia",
    cloudflare: "Ultra-baja (milisegundos)",
    icon: "fa-bolt"
  },
  {
    feature: "Seguridad",
    traditional: "Vulnerable a ataques directos",
    cloudflare: "Protección DDoS nivel empresarial",
    icon: "fa-shield-halved"
  },
  {
    feature: "Escalabilidad",
    traditional: "Manual y lenta",
    cloudflare: "Automática e instantánea",
    icon: "fa-up-right-and-down-left-from-center"
  }
];

const App: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    const aiResponse = await getCloudflareInfo(userMessage);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse || "Error al procesar" }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen text-gray-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-cloud text-cloudflare text-2xl"></i>
          <span className="text-xl font-bold tracking-tight">Cloudflare<span className="text-cloudflare">Edge</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-400">
          <a href="#welcome" className="hover:text-cloudflare transition-colors">Bienvenida</a>
          <a href="#compare" className="hover:text-cloudflare transition-colors">Comparativa</a>
          <a href="#ai" className="hover:text-cloudflare transition-colors">Consultar Experto</a>
        </div>
        <button className="bg-cloudflare-gradient text-white px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
          Consola Cloudflare
        </button>
      </nav>

      {/* Hero Section */}
      <header id="welcome" className="relative overflow-hidden pt-20 pb-32 px-6 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="animate-float mb-6">
          <i className="fa-solid fa-rocket text-6xl text-cloudflare drop-shadow-lg"></i>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight max-w-4xl">
          ¡Bienvenido a la <span className="text-cloudflare">Velocidad Extrema</span> del Edge!
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          Has dejado atrás los servidores tradicionales. Tu sitio ahora vive en más de 300 ciudades de todo el mundo, 
          entregando contenido a la velocidad de la luz gracias a Cloudflare.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#compare" className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
            Ver Comparativa
          </a>
          <a href="#ai" className="border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
            Hablar con IA Experta
          </a>
        </div>
      </header>

      {/* Comparison Section */}
      <section id="compare" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Cloudflare vs. Hosting Tradicional</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPARISONS.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl glow-orange hover:bg-white/5 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                <i className={`fa-solid ${item.icon} text-cloudflare text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{item.feature}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Tradicional</p>
                  <p className="line-through opacity-50">{item.traditional}</p>
                </div>
                <div>
                  <p className="text-cloudflare font-semibold mb-1">Cloudflare</p>
                  <p className="font-medium">{item.cloudflare}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cloudflare-gradient py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center text-white">
          <div>
            <div className="text-4xl font-bold mb-2">0ms</div>
            <p className="text-orange-100 uppercase tracking-widest text-xs font-bold">Arranque en Frío</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <p className="text-orange-100 uppercase tracking-widest text-xs font-bold">Ciudades Globales</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-orange-100 uppercase tracking-widest text-xs font-bold">Disponibilidad (SLA)</p>
          </div>
        </div>
      </section>

      {/* AI Expert Section */}
      <section id="ai" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center gap-4 bg-white/5">
            <div className="w-10 h-10 bg-cloudflare-gradient rounded-full flex items-center justify-center">
              <i className="fa-solid fa-robot text-white"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg">Consultor de Edge de Cloudflare</h3>
              <p className="text-xs text-green-400 font-medium tracking-wide uppercase">Powered by Gemini AI</p>
            </div>
          </div>
          
          <div className="h-[400px] overflow-y-auto p-8 flex flex-col gap-6">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <i className="fa-solid fa-comments text-4xl mb-4 opacity-20"></i>
                <p>Pregúntame cualquier cosa sobre por qué Cloudflare es la mejor opción para tu proyecto.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-cloudflare-gradient text-white rounded-tr-none' 
                  : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-6 bg-white/5 border-t border-white/10 flex gap-4">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="¿Por qué Cloudflare es más rápido que AWS o DigitalOcean?"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cloudflare transition-colors"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="bg-cloudflare-gradient text-white w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <i className="fa-solid fa-cloud text-cloudflare"></i>
          <span className="font-bold text-gray-400">Cloudflare Welcome Page</span>
        </div>
        <p className="text-sm">Creado para celebrar el poder de la computación distribuida.</p>
        <p className="text-[10px] mt-4 uppercase tracking-[0.2em] opacity-30">No official affiliation with Cloudflare Inc.</p>
      </footer>
    </div>
  );
};

export default App;
