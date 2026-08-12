import { useEffect, useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import heroImage from './pictures/hero-door.jpg';
import yael01 from './pictures/yael01.jpg';

const HERO_IMAGE = heroImage;

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
        scrolled ? 'bg-cream drop-shadow' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span
              className={`font-serif text-xl tracking-wide transition-colors ${
                scrolled 
                  ? 'text-ink-soft/90 hover:text-ink'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Yaël Marquet Massage
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-12">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative text-xs uppercase tracking-widest transition-colors py-1 ${
                  scrolled
                    ? 'text-ink-soft/90 hover:text-ink'
                    : 'text-white/90 hover:text-white'
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
              scrolled ? 'text-ink/90' : 'text-white/90'
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
          open ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <nav className="px-5 py-3 flex flex-col">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`text-ink-soft/90 text-left px-4 py-3 text-sm uppercase tracking-widest transition-colors
                `}
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
        <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-cream/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="font-serif font-medium text-white text-5xl sm:text-8xl leading-[1.1] tracking-wide opacity-0 animate-[fadeUp_0.9s_0.25s_forwards] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
          Yaël Marquet
        </h1>
        <p className="mt-5 text-white/90 text-base uppercase sm:text-2xl font-light tracking-widest max-w-xl mx-auto leading-relaxed opacity-0 animate-[fadeUp_0.9s_0.4s_forwards] drop-shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
          Praticien Massage Ayurvédique
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
  tone?: 'cream' | 'sage';
}) {
  const bg =
    tone === 'sage'
      ? 'bg-secondary/15'
      : 'bg-cream';
  return (
    <section id={id} className={`${bg} py-24 scroll-mt-16`}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
}

function MassageSection() {
  return (
    <SectionShell id="massage" tone="cream">
      <h2 className="font-serif text-primary text-3xl sm:text-4xl leading-[1.15] max-w-2xl">
        Le massage ayurvédique
      </h2>

      <div className="mt-6 space-y-16">

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="md:col-span-3">
            <h3 className="font-serif text-2xl text-ink-soft w-full">
              L'Ayurveda
            </h3>
            <p className="mt-2 text-ink-soft text-base leading-relaxed max-w-2xl">
              C'est la médecine traditionnelle de l'Inde, une science de la vie qui invite à cultiver l'harmonie entre l'être humain, son corps et le monde qui l'entoure. 
              Issu d'une tradition ancienne transmise au fil des générations, elle considère la santé comme une harmonie subtile entre le corps, le souffle, le mental, les sens et la conscience.
              À travers l'alimentation, les plantes médicinales, les massages, le yoga, la respiration, la méditation et l'observation des rythmes de la nature, l'Ayurveda accompagne chacun dans la compréhension de sa constitution et de son propre chemin vers l'équilibre.
              C'est une invitation à vivre plus consciemment, en accord avec notre nature profonde et les lois du vivant. 
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6628696/pexels-photo-6628696.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Yaël Marquet, praticien en massage ayurvédique"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={yael01}
                alt="Yaël Marquet, praticien en massage ayurvédique"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="md:col-span-3 order-1 md:order-2">
            <h3 className="font-serif text-2xl text-ink-soft w-full">
              Le massage
            </h3>
            <p className="mt-2 text-ink-soft text-base leading-relaxed max-w-2xl">
              Dans la tradition ayurvédique, le massage est un soin ancestral destiné à préserver la santé, soutenir la vitalité et accompagner les forces naturelles d'équilibre de l'organisme.
              Réalisé avec des huiles végétales et des gestes précis, il favorise une détente profonde, nourrit les tissus, apaise le système nerveux et soutient les capacités naturelles du corps.
              Chaque massage est une rencontre unique, adaptée à la constitution, au moment de vie et aux besoins de chacun, dans le respect des principes de l'Ayurveda.
              Recevoir un massage ayurvédique, c'est s'offrir un temps de soin et de présence, où les tensions se relâchent, où le souffle retrouve son rythme et où le corps peut renouer avec sa vitalité.
            </p>
          </div>
        </div>

      </div>

    </SectionShell>
  );
}

function SoinsSection() {
  const cabinet = [
    {
      name: 'Massage découverte',
      duration: '1 h',
      price: '40 €',
      desc: 'Une première approche ciblée sur une zone de tension.',
      featured: false,
    },
    {
      name: 'Massage dos & tête',
      duration: '1 h',
      price: '55 €',
      desc: 'Un soin ciblé sur le dos, les épaules et le cuir chevelu.',
      featured: false,
    },
    {
      name: 'Massage ayurvédique',
      duration: '1 h',
      price: '70 €',
      desc: 'Le soin complet, de la tête aux pieds.',
      featured: false,
    },
    {
      name: 'Massage approfondi',
      duration: '1 h',
      price: '95 €',
      desc: 'Le massage intégral avec un temps prolongé sur les zones de tension.',
      featured: true,
    },
    {
      name: 'Massage énergétique',
      duration: '1 h',
      price: '75 €',
      desc: 'Axé sur les points marmas pour rééquilibrer l\'énergie vitale.',
      featured: false,
    },
    {
      name: 'Massage détente absolue',
      duration: '2 h',
      price: '120 €',
      desc: 'Le soin le plus complet, un véritable voyage sensoriel.',
      featured: false,
    },
  ];

  const domicile = {
    name: 'Massage à domicile',
    duration: '2 h',
    price: '110 €',
    desc: 'Le soin complet ayurvédique, pratiqué chez vous, dans votre cocon. Paris et proche banlieue, déplacement inclus.',
  };

  return (
    <SectionShell id="soins" tone="sage">
      <h2 className="font-serif text-primary text-3xl sm:text-4xl leading-[1.15]">
        Soins
      </h2>
      <p className="mt-6 text-ink-soft text-base leading-relaxed">
        Six formules sont possible au cabinet selon le temps dont vous disposez et l'intention
        du moment.
      </p>
      <p className="mt-6 text-ink-soft text-base leading-relaxed">
        Je me déplace également à votre domicile dans un un rayon d'environ 30 minutes du Mas d'Azil. 
        Pour les massages à domicile, un seul soin est possible, le massage de 2h.
      </p>

      <div className="mt-12">
        <h3 className="font-serif text-2xl text-ink-soft w-full pb-3 border-b border-primary/30">
          À mon cabinet
        </h3>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cabinet.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-6 border text-center transition-all duration-300 ${
              t.featured
                ? 'bg-white border-primary/70'
                : 'bg-white/70 border-primary/30'
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-medium tracking-wide">
                recommandé
              </span>
            )}
            <h4 className="font-serif text-2xl text-ink leading-snug">
              {t.name}
            </h4>
            <p className="mt-2 flex items-center justify-center text-xs uppercase tracking-wider text-primary font-medium">
              <Clock
                className="inline-block w-4 h-4 mr-1.5 text-primary"
                strokeWidth={1.5}
              />
              {t.duration}
            </p>
            <p className="mt-2 font-sans font-light text-3xl text-ink">
              {t.price}
            </p>
            <p className="mt-2 text-ink-soft text-sm leading-relaxed min-h-[3.5rem]">
              {t.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-serif text-2xl text-ink-soft w-full pb-3 border-b border-primary/30">
          À domicile
        </h3>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="relative rounded-2xl p-6 border bg-white/70 border-primary/30 text-center">
          <h4 className="font-serif text-2xl text-ink leading-snug"> 
            {domicile.name}
          </h4>
          <p className="mt-2 flex items-center justify-center text-xs uppercase tracking-wider text-primary font-medium">
            <Clock
              className="w-4 h-4 mr-1.5 text-primary"
              strokeWidth={1.5}
            />
            {domicile.duration}
          </p>
          <p className="mt-2 font-sans font-light text-3xl text-ink">
            {domicile.price}
          </p>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed">
            {domicile.desc}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function ReservationsSection() {
  return (
    <SectionShell id="reservations" tone="cream">
      <h2 className="font-serif text-primary text-3xl sm:text-4xl leading-[1.15]">
        Réservations
      </h2>
      <p className="mt-6 text-ink-soft text-base leading-relaxed">
        Pour réserver un rendez-vous, vous pouvez directement me contacter par téléphone, SMS ou email.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-px bg-primary/30 rounded-2xl overflow-hidden border border-primary/30">
        <InfoRow icon={Phone} title="Téléphone">
          <a href="tel:+336000000000" className="hover:text-ink/90 transition-colors">
            06 42 93 71 61
          </a>
        </InfoRow>
        <InfoRow icon={Mail} title="Email">
          <a
            href="mailto:contact@yael-massage.fr"
            className="hover:text-ink/90 transition-colors break-all"
          >
            contact@yael-massage.fr
          </a>
        </InfoRow>
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
        <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
        <h3 className="font-serif text-base text-ink">{title}</h3>
      </div>
      <p className="text-ink-soft text-sm leading-relaxed pl-7">{children}</p>
    </div>
  );
}

function AProposSection() {
  return (
    <SectionShell id="apropos" tone="sage">
    <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
      <div className="md:col-span-3">
        <h2 className="font-serif text-primary text-3xl sm:text-4xl leading-[1.15]">
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
            Mon approche est simple et à l'écoute. Chaque massage s'adapte à
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

      <div className="md:col-span-2 md:pt-18">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={yael01}
            alt="Yaël Marquet, praticien en massage ayurvédique"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground/95 py-12">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white/70">
          <span className="font-serif text-base text-white/90">Yaël Marquet Massage</span>
          <div className="flex flex-col items-center md:items-end gap-2 text-sm font-light">
        <a href="mailto:contact@yael-massage.fr" className="hover:text-white/90 transition-colors flex items-center gap-2">
          <Mail className="w-4 h-4" /> contact@yael-massage.fr
        </a>
        <a href="tel:+33600000000" className="hover:text-white/90 transition-colors flex items-center gap-2">
          <Phone className="w-4 h-4" /> 06 42 93 71 61
        </a>
      </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Yaël Marquet Massage
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
