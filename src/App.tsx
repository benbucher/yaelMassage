import { useEffect, useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import heroImage01 from './pictures/hero-door.jpg';
import heroImage02 from './pictures/hero-door-2.jpg';
import yael01 from './pictures/yael01.jpg';
import yael02 from './pictures/yael02.jpg';
import massage01 from './pictures/massage01.jpg';
import massage02 from './pictures/massage02.jpg';
import massage03 from './pictures/massage03.jpg';

const HERO_IMAGE = heroImage02;

const NAV = [
  { id: 'massage', label: 'Massage' },
  { id: 'tarifs', label: 'Tarifs' },
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
        scrolled ? 'bg-cream drop-shadow' : 'bg-cream' // 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span
              className={`font-serif md:text-2xl text-xl tracking-wide transition-colors ${
                scrolled 
                  ? 'text-ink-soft hover:text-ink'
                  : 'text-ink-soft hover:text-ink' // 'text-white/90 hover:text-white'
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
                    ? 'text-ink-soft hover:text-ink'
                    : 'text-ink-soft hover:text-ink' // 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[0.5px] bg-current transition-all duration-300 ${
                    active === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          <button
            className={`md:hidden grid place-items-center w-10 h-10 rounded-full transition-colors ${
              scrolled ? 'text-ink/90' : 'text-ink/90' // 'text-white/90'
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
              className={`text-ink-soft text-left px-4 py-3 text-sm uppercase tracking-widest transition-colors
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
        <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
       
        <div className="absolute inset-0 bg-gradient-to-l from-secondary/20 via-transparent sm:via-70% via-85% to-cream/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent sm:via-70% via-85% to-cream/60" />
        
        {/* 
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-cream/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,theme(colors.cream)_100%)]" />
         */}

      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="font-serif font-medium text-white text-5xl sm:text-8xl leading-[1.1] tracking-wide opacity-0 animate-[fadeUp_0.9s_0.25s_forwards] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
          Yaël Marquet
        </h1>
        <p className="mt-5 text-white text-base uppercase sm:text-2xl font-light tracking-widest max-w-xl mx-auto leading-relaxed opacity-0 animate-[fadeUp_0.9s_0.4s_forwards] drop-shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
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
                src={massage02}
                alt="Massage"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={massage03}
                alt="Massage"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="md:col-span-3 order-1 md:order-2">
            <h3 className="font-serif text-2xl text-ink-soft w-full">
              Ma pratique
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
      name: 'Abyanga',
      duration: '1h30',
      price: '65 €',
      desc: 'Massage du corps entier avec des huiles médicinales',
      featured: false,
    },
    {
      name: 'Marmathérapie',
      duration: '1h30',
      price: '65 €',
      desc: 'Abyanga et acupression (stimulation des points énergétiques)',
      featured: true,
      durationLong: '2h',
      priceLong: '80 €',
    },
    {
      name: 'Udvartana',
      duration: '1h30',
      price: '65 €',
      desc: 'Massage tonique à la farine de pois\u00A0chiche et aux poudres de plantes',
      featured: false,
    },
    {
      name: 'Neerabyanga',
      duration: '1h',
      price: '55 €',
      desc: 'Drainage lymphatique\n(purifiant et amaincissant)',
      featured: false,
      durationLong: '2h',
      priceLong: '75 €',
    },
    {
      name: 'Thandabyanga',
      duration: '1h15',
      price: '60 €',
      desc: 'Massage du dos',
      featured: false,
    },
    {
      name: 'Padabyanga',
      duration: '30 min',
      price: '35 €',
      desc: 'Massage des pieds (réflexologie)',
      featured: false,
    },
  ];

  const domicile = {
    name: 'Marmathérapie',
    duration: '2h',
    price: '90 €',
    desc: 'Massage du corps entier avec des huiles médicinales et stimulation des points énergétiques',
  };

  return (
    <SectionShell id="tarifs" tone="sage">
      <h2 className="font-serif text-primary text-3xl sm:text-4xl leading-[1.15]">
        Tarifs
      </h2>
      <p className="mt-6 text-ink-soft text-base leading-relaxed">
        Six massages différents sont possibles au cabinet selon le temps dont vous disposez et l'intention
        du moment.
      </p>
      <p className="mt-6 text-ink-soft text-base leading-relaxed">
        Pour le massage Marmathérapie de 2h, je peux également me déplacer à domicile dans un rayon d'environ 30 minutes autour du Mas d'Azil. 
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

            {t.durationLong && t.priceLong ? (
            <div className="mt-3 flex items-stretch justify-center">
              
              {/* Short option */}
              <div className="flex-1 pr-6 text-right">
                <p className="flex items-center justify-end text-sm uppercase tracking-wider text-primary font-medium">
                  <Clock
                    className="w-4 h-4 mr-1.5 text-primary"
                    strokeWidth={1.5}
                  />
                  {t.duration}
                </p>
                <p className="mt-2 font-sans font-light text-3xl text-ink">
                  {t.price}
                </p>
              </div>

              {/* Vertical separator */}
              <div className="w-px bg-primary/30" />

              {/* Long option */}
              <div className="flex-1 pl-6 text-left">
                <p className="flex items-center text-sm uppercase tracking-wider text-primary font-medium">
                  <Clock
                    className="w-4 h-4 mr-1.5 text-primary"
                    strokeWidth={1.5}
                  />
                  {t.durationLong}
                </p>
                <p className="mt-2 font-sans font-light text-3xl text-ink">
                  {t.priceLong}
                </p>
              </div>

            </div>
          ) : (
            <>
              {/* Normal single option */}
              <p className="mt-2 flex items-center justify-center text-sm uppercase tracking-wider text-primary font-medium">
                <Clock
                  className="w-4 h-4 mr-1.5 text-primary"
                  strokeWidth={1.5}
                />
                {t.duration}
              </p>
              <p className="mt-2 font-sans font-light text-3xl text-ink">
                {t.price}
              </p>
            </>
          )}
            <p className="mt-2 text-ink-soft text-sm leading-relaxed min-h-[3.5rem] whitespace-pre-line">
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
          <p className="mt-2 flex items-center justify-center text-sm uppercase tracking-wider text-primary font-medium">
            <Clock
              className="w-4 h-4 mr-1.5 text-primary"
              strokeWidth={1.5}
            />
            {domicile.duration}
          </p>
          <p className="mt-2 font-sans font-light text-3xl text-ink">
            {domicile.price}
          </p>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed whitespace-pre-line">
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
          <a href="tel:+33642937161" className="hover:text-ink/90 transition-colors">
            06 42 93 71 61
          </a>
        </InfoRow>
        <InfoRow icon={Mail} title="Email">
          <a
            href="mailto:tattvaya@gmail.com"
            className="hover:text-ink/90 transition-colors break-all"
          >
            tattvaya@gmail.com
          </a>
        </InfoRow>
        <InfoRow icon={MapPin} title="Cabinet">
          2 Grande Route<br />
          09290 Le Mas d'Azil
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
            Je n'ai pas découvert l'Ayurveda par hasard.
            Depuis toujours, je suis curieux de ce qui touche à l'être humain : comprendre le corps, l'esprit, ce qui nous équilibre et nous fragilise.
          </p>
          <p>
            Puis la vie m'a amené à une expérience plus concrète.
            Après avoir exercé un métier physiquement exigeant plusieurs années, j'avais régulièrement mal au dos. C'est à cette période que j'ai découvert l'Ayurveda, à travers un massage.
            Je me souviens surtout d'une chose : au-delà de la détente physique, j'ai ressenti quelque chose de plus profond. Une approche qui ne cherchait pas simplement à faire disparaître un symptôme, mais à comprendre l'être humain dans sa globalité. Une autre manière de prendre soin de soi devenait possible.
          </p>
          <p>
            Cette découverte a été un véritable déclic. J'ai décidé de me former à mon tour, avec l'envie de comprendre cette approche en profondeur et, un jour, de pouvoir la transmettre.
          </p>
          <p>
            Parce qu'accompagner quelqu'un demande plus que de l'intuition, j'ai consacré trois années à une formation approfondie, auprès d'écoles et d'enseignants reconnus :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Institut Européen d'Études Védiques (IEEV) — Fondamentaux de l'Ayurveda et soins traditionnels</li>
            <li>Alex Duncan et Dr David Frawley — Alimentation, plantes et santé globale</li>
            <li>Kandeepan Jothishmayananda — Perfectionnement aux massages et protocoles avancés (SAP)</li>
          </ul>
          <p>
            Aujourd'hui, cela fait depuis 16 ans, je vous accueille simplement. De l'écoute, de l'échange, et une adaptation à vos besoins du moment.
          </p>
          <p>
            Avec sérieux dans ma pratique, mais aussi avec simplicité et bonne humeur, mon intention reste la même depuis mes débuts : 
            vous proposer un massage sur-mesure, efficace et profondément ressourçant. Et peut-être vous permettre, le temps d'une séance, de retrouver un peu plus d'espace, de légèreté et d'énergie.
          </p>
          <p>
            Au plaisir de vous accompagner sur ce chemin vers un mieux-être durable.
          </p>
        </div>
      </div>

      <div className="md:col-span-2 md:pt-18">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={yael02}
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
        <a href="mailto:tattvaya@gmail.com" className="hover:text-white/90 transition-colors flex items-center gap-2">
          <Mail className="w-4 h-4" /> tattvaya@gmail.com
        </a>
        <a href="tel:+33642937161" className="hover:text-white/90 transition-colors flex items-center gap-2">
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
