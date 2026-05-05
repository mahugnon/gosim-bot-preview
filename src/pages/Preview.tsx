import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    Chatbot?: {
      init: (config: {
        botId: string;
        theme?: string;
        position?: string;
        apiBaseUrl?: string;
      }) => { toggleChat: () => void; destroy: () => void };
    };
  }
}

const courses = [
  { name: 'Salsa', level: 'Tous niveaux', day: 'Lundi & Jeudi', price: '45€/mois' },
  { name: 'Bachata', level: 'Débutant – Intermédiaire', day: 'Mardi & Vendredi', price: '45€/mois' },
  { name: 'Contemporain', level: 'Intermédiaire – Avancé', day: 'Mercredi & Samedi', price: '55€/mois' },
  { name: 'Afrobeats', level: 'Tous niveaux', day: 'Mercredi & Vendredi', price: '40€/mois' },
];

export default function Preview() {
  const [searchParams] = useSearchParams();
  const botId = searchParams.get('botId') || (import.meta.env.VITE_DEFAULT_BOT_ID as string);
  const theme = searchParams.get('theme') || 'blue';
  const instanceRef = useRef<{ toggleChat: () => void; destroy: () => void } | null>(null);

  useEffect(() => {
    document.title = 'Ritmo — École de Danse · Paris';
  }, []);

  useEffect(() => {
    if (!botId) return;

    instanceRef.current?.destroy();
    instanceRef.current = null;

    const script = document.createElement('script');
    script.src = import.meta.env.VITE_CHATBOT_SCRIPT_URL as string;
    script.onload = () => {
      if (!window.Chatbot) return;
      instanceRef.current?.destroy();
      const instance = window.Chatbot.init({
        botId,
        theme,
        position: 'bottom-right',
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
      });
      instanceRef.current = instance;
      setTimeout(() => instance.toggleChat(), 500);
    };
    document.body.appendChild(script);

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [botId, theme]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight">Ritmo</span>
            <span className="ml-2 text-sm text-gray-400">École de Danse</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#cours" className="hover:text-gray-900 transition-colors">Cours</a>
            <a href="#infos" className="hover:text-gray-900 transition-colors">Infos pratiques</a>
          </nav>
          <a
            href="tel:+33142001234"
            className="text-sm bg-[hsl(224,71%,36%)] text-white font-medium px-4 py-2 rounded-lg hover:bg-[hsl(224,71%,28%)] transition-colors"
          >
            Cours d'essai gratuit
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm text-gray-400 mb-4">Paris 11e · Ouvert depuis 2014</p>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Apprenez à danser<br className="hidden md:block" /> avec passion.
        </h1>
        <p className="text-lg text-gray-500 max-w-lg leading-relaxed mb-8">
          Salsa, bachata, contemporain, afrobeats — des cours pour tous les niveaux,
          animés par des professeurs passionnés au cœur de Paris.
        </p>
        <div className="flex gap-3">
          <a
            href="#cours"
            className="bg-[hsl(224,71%,36%)] text-white font-medium px-6 py-3 rounded-lg hover:bg-[hsl(224,71%,28%)] transition-colors"
          >
            Voir les cours
          </a>
          <a
            href="#infos"
            className="border border-[hsl(224,71%,80%)] text-[hsl(224,71%,36%)] font-medium px-6 py-3 rounded-lg hover:bg-[hsl(224,71%,96%)] transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      <section id="cours" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nos cours</h2>
        <p className="text-gray-400 text-sm mb-10">Premier cours offert pour tout nouveau inscrit.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div
              key={c.name}
              className="bg-[hsl(224,71%,36%)] rounded-xl p-6 hover:bg-[hsl(224,71%,28%)] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                <span className="text-sm font-semibold text-blue-100">{c.price}</span>
              </div>
              <p className="text-sm text-blue-200 mb-1">{c.level}</p>
              <p className="text-xs text-blue-300">{c.day}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      <section id="infos" className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Adresse</p>
          <p className="text-gray-700 text-sm leading-relaxed">28 Rue de la Danse<br />75011 Paris</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Horaires</p>
          <p className="text-gray-700 text-sm leading-relaxed">Lundi – Samedi<br />10h00 – 22h00</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            +33 1 42 00 12 34<br />
            contact@ritmo-paris.fr
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 Ritmo Paris</span>
          <span>Propulsé par <span className="text-gray-600 font-medium">Gosim Bot</span></span>
        </div>
      </footer>
    </div>
  );
}
