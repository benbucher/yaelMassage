import { useEffect, useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/157356/pexels-photo-157356.jpeg?auto=compress&cs=tinysrgb&w=1600';

const NAV = [
  { id: 'massage', label: 'Massage' },
  { id: 'soins', label: 'Soins' },
  { id: 'reservations', label: 'Réservations' },
  { id: 'apropos', label: 'À propos' },
];

function useScrollSpy() {
  const [active, setActive] = useState('massage');

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => go('massage')}>
            <span
              className={`font-serif text-lg tracking-wide transition-colors ${
                scrolled ? 'text-ink' : 'text-white'
              }`}
            >
              Yaël Massage
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-12">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative text-sm transition-colors py-1 ${
                  scrolled
                    ? 'text-ink-soft/80 hover:text-ink'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ${
                    active === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          <button
            className={`md:hidden grid place-items-center w-10 h-10 rounded-full transition-colors ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream/95 backdrop-blur-md ${
          open ? 'max-h-72 border-t border-sky-100' : 'max-h-0'
        }`}
      >
        <nav className="px-5 py-3 flex flex-col">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`text-left px-4 py-3 text-sm transition-colors border-b border-sky-50 last:border-0 ${
                active === item.id ? 'text-sky-600' : 'text-ink-soft'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Porte en bois sculpté, teinte bleue délavée"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-sky-200/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/20 via-transparent to-cream/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="font-serif text-white text-4xl sm:text-6xl leading-[1.1] tracking-tight opacity-0 animate-[fadeUp_0.9s_0.25s_forwards] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
          Yaël Massage
        </h1>
        <p className="mt-5 text-white/90 text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed opacity-0 animate-[fadeUp_0.9s_0.4s_forwards] drop-shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
          Le passage ayurvédique, un soin profond et chaleureux à l'écoute du
          corps et du souffle.
        </p>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

function SectionShell({
  id,
  children,
  tone = 'cream',
}: {
  id: string;
  children: React.ReactNode;
  tone?: 'cream' | 'sky' | 'sage';
}) {
  const bg =
    tone === 'sky'
      ? 'bg-sky-50/60'
      : tone === 'sage'
        ? 'bg-sage-50/60'
        : 'bg-cream';
  return (
    <section id={id} className={`${bg} py-20 sm:py-28 scroll-mt-20`}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
}

function MassageSection() {
  return (
    <SectionShell id="massage" tone="cream">
      <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.15] max-w-2xl">
        Le passage ayurvédique
      </h2>
      <p className="mt-6 text-ink-soft text-base sm:text-lg leading-relaxed max-w-2xl">
        Le passage ayurvédique est un massage complet du corps, à l'huile chaude,
        qui s'inspire des principes de l'Ayurveda. Il vise à relâcher les
        tensions accumulées, à relancer la circulation et à offrir un véritable
        temps de pause, loin du rythme du quotidien.
      </p>

      <div className="mt-10 rounded-2xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6628696/pexels-photo-6628696.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Massage ayurvédique à l'huile chaude"
          className="w-full h-64 sm:h-80 object-cover"
        />
      </div>
    </SectionShell>
  );
}

function SoinsSection() {
  const cabinet = [
    {
      name: 'Passage découverte',
      duration: '30 minutes',
      price: '40 €',
      desc: 'Une première approche ciblée sur une zone de tension.',
      featured: false,
    },
    {
      name: 'Passage dos & tête',
      duration: '45 minutes',
      price: '55 €',
      desc: 'Un soin ciblé sur le dos, les épaules et le cuir chevelu.',
      featured: false,
    },
    {
      name: 'Passage ayurvédique',
      duration: '60 minutes',
      price: '70 €',
      desc: 'Le soin complet, de la tête aux pieds.',
      featured: false,
    },
    {
      name: 'Passage approfondi',
      duration: '90 minutes',
      price: '95 €',
      desc: 'Le passage intégral avec un temps prolongé sur les zones de tension.',
      featured: true,
    },
    {
      name: 'Passage énergétique',
      duration: '60 minutes',
      price: '75 €',
      desc: 'Axé sur les points marmas pour rééquilibrer l\'énergie vitale.',
      featured: false,
    },
    {
      name: 'Passage détente absolue',
      duration: '120 minutes',
      price: '120 €',
      desc: 'Le soin le plus complet, un véritable voyage sensoriel.',
      featured: false,
    },
  ];

  const domicile = {
    name: 'Passage à domicile',
    duration: '75 minutes',
    price: '110 €',
    desc: 'Le soin complet ayurvédique, pratiqué chez vous, dans votre cocon. Paris et proche banlieue, déplacement inclus.',
  };

  return (
    <SectionShell id="soins" tone="sky">
      <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.15]">
        Soins & tarifs
      </h2>
      <p className="mt-6 text-ink-soft text-base leading-relaxed max-w-2xl">
        Six formules au cabinet selon le temps dont vous disposez et l'intention
        du moment, plus une option à domicile. Huiles chaudes végétales comprises.
      </p>

      <div className="mt-12">
        <h3 className="font-serif text-2xl text-ink w-full pb-3 border-b border-sky-200">
          À mon cabinet
        </h3>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cabinet.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-6 border transition-all duration-300 ${
              t.featured
                ? 'bg-white border-sky-200'
                : 'bg-white/70 border-sky-100/70'
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-sky-400 text-white text-[11px] font-medium tracking-wide">
                Le plus choisi
              </span>
            )}
            <p className="text-xs uppercase tracking-wider text-sky-400 font-medium">
              {t.duration}
            </p>
            <h4 className="mt-2 font-serif text-lg text-ink leading-snug">
              {t.name}
            </h4>
            <p className="mt-2 text-ink-soft text-sm leading-relaxed min-h-[3.5rem]">
              {t.desc}
            </p>
            <div className="mt-4 pt-4 border-t border-sky-100 flex items-baseline gap-1">
              <span className="font-serif text-3xl text-ink">{t.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-serif text-2xl text-ink w-full pb-3 border-b border-sky-200">
          À domicile
        </h3>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="relative rounded-2xl p-6 border bg-white/70 border-sky-100/70">
          <p className="text-xs uppercase tracking-wider text-sky-400 font-medium">
            {domicile.duration}
          </p>
          <h4 className="mt-2 font-serif text-lg text-ink leading-snug">
            {domicile.name}
          </h4>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed">
            {domicile.desc}
          </p>
          <div className="mt-4 pt-4 border-t border-sky-100 flex items-baseline gap-1">
            <span className="font-serif text-3xl text-ink">{domicile.price}</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ReservationsSection() {
  return (
    <SectionShell id="reservations" tone="cream">
      <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.15]">
        Réservations
      </h2>
      <p className="mt-6 text-ink-soft text-base leading-relaxed max-w-2xl">
        Pour réserver un rendez-vous, contactez-moi par téléphone ou par email.
        Je recommande de prévoir une semaine à l'avance.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-px bg-sky-100 rounded-2xl overflow-hidden border border-sky-100">
        <InfoRow icon={MapPin} title="Cabinet">
          12 rue des Lilas<br />
          75011 Paris<br />
          <span className="text-ink-soft/60">Métro Père Lachaire</span>
        </InfoRow>
        <InfoRow icon={Clock} title="Horaires">
          Du lundi au samedi<br />
          9h30 — 19h30<br />
          <span className="text-ink-soft/60">Sur rendez-vous</span>
        </InfoRow>
        <InfoRow icon={Phone} title="Téléphone">
          <a href="tel:+33612345678" className="hover:text-sky-600 transition-colors">
            06 12 34 56 78
          </a>
        </InfoRow>
        <InfoRow icon={Mail} title="Email">
          <a
            href="mailto:contact@yael-massage.fr"
            className="hover:text-sky-600 transition-colors break-all"
          >
            contact@yael-massage.fr
          </a>
        </InfoRow>
      </div>

    </SectionShell>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-4 h-4 text-sky-400" strokeWidth={1.5} />
        <h3 className="font-serif text-base text-ink">{title}</h3>
      </div>
      <p className="text-ink-soft text-sm leading-relaxed pl-7">{children}</p>
    </div>
  );
}

function AProposSection() {
  return (
    <SectionShell id="apropos" tone="sage">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="md:col-span-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.15]">
            À propos de moi
          </h2>
          <div className="mt-6 space-y-5 text-ink-soft text-base leading-relaxed">
            <p>
              Je m'appelle Yaël. Je pratique le massage ayurvédique depuis plus
              de dix ans, après une formation en Inde auprès de praticiens
              traditionnels. Ce qui m'a touchée dès le départ, c'est la façon
              dont ce soin relie le corps et l'esprit, sans jamais les séparer.
            </p>
            <p>
              Mon approche est simple et à l'écoute. Chaque passage s'adapte à
              la personne reçue, à son état du jour, à ce qui a besoin d'être
              relâché. Je travaille dans un petit cabinet paisible, à l'abri du
              bruit, pensé pour qu'on puisse véritablement se déposer.
            </p>
            <p>
              Au-delà du geste, j'aime partager l'esprit de l'Ayurveda : une
              attention au souffle, une qualité de présence, et la conviction
              que prendre soin de soi n'est pas un luxe mais une nécessité.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Yaël, praticienne en massage ayurvédique"
              className="w-full h-72 md:h-80 object-cover"
            />
          </div>
          <p className="mt-4 text-center text-ink-soft/70 text-sm italic font-light">
            « Prendre soin de soi, c'est prendre soin de la vie. »
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer className="bg-ink py-12">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white/70">
          <span className="font-serif text-base text-white">Yaël Massage</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-sky-200 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Yaël Massage — Massage ayurvédique traditionnel
        </div>
      </div>
    </footer>
  );
}

function App() {
  const active = useScrollSpy();

  return (
    <div className="min-h-screen bg-cream">
      <Header active={active} />
      <main>
        <Hero />
        <MassageSection />
        <SoinsSection />
        <ReservationsSection />
        <AProposSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
