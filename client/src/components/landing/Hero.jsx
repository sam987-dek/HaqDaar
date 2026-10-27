import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import { scrollToId } from '../ui/SmoothScroll';
import { useAuth } from '../../context/AuthContext';
import { useMedia } from '../../lib/useMedia';

const HeroScene = lazy(() => import('../three/HeroScene'));
const ease = [0.22, 1, 0.36, 1];

// The headline mixes a tall serif with an expanded black grotesk, each line set full width.
const LINES = [
  [['KNOW', 'serif'], ['WHAT', 'black']],
  [['THE LAW', 'serif'], ['SAYS', 'black']],
  [['IS', 'serif'], ['YOURS', 'black']],
];

const STEPS = [
  { title: 'Read', text: 'Upload your payslips, ticket or rental agreement. The facts are pulled out for you to check.' },
  { title: 'Check', text: 'Rules from the Labour Codes, the DGCA rules and your rental agreement test every fact, with citations.' },
  { title: 'Claim', text: 'See an estimate with the working shown, a formal letter, and a tracker for each deadline.' },
];

export default function Hero() {
  const { user } = useAuth();
  const startHref = user ? '/cases/new' : '/register';
  // The 3D scene is decoration; phones skip it to save battery and data.
  const show3d = useMedia('(min-width: 768px)');
  return (
    <section>
      <div className="relative min-h-svh overflow-hidden flex flex-col">
        <header className="relative z-20 flex items-center justify-between gap-4 px-5 sm:px-8 pt-5">
          <Logo light />
          <nav className="hidden md:flex rounded-full p-1 text-sm bg-white/5 backdrop-blur-md border border-white/10" aria-label="Sections">
            {[['how', 'How it works'], ['types', 'Case types'], ['trust', 'Why trust it']].map(([id, label]) => (
              <button key={id} onClick={() => scrollToId(id)} className="rounded-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition">{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/dashboard" className="btn-white">Your claims</Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-flex btn text-white hover:bg-white/10">Log in</Link>
                <Link to="/register" className="btn-white">Start a claim</Link>
              </>
            )}
          </div>
        </header>

        {show3d && (
          <Suspense fallback={null}>
            <motion.div className="absolute inset-y-0 right-0 left-[40%] lg:left-[52%] z-0" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease, delay: 0.4 }}>
              <HeroScene className="h-full w-full opacity-40 lg:opacity-100" />
            </motion.div>
          </Suspense>
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-10 pointer-events-none">
          <motion.p className="eyebrow self-start mb-6 pointer-events-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.8)]" />
            Jobs · Flights · Rental deposits
          </motion.p>
          <h1 className="w-full max-w-[min(100%,600px)]" aria-label="Know what the law says is yours">
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.12em]">
                <motion.span className="flex justify-between gap-[0.25em] text-[clamp(44px,6.2vw,96px)]" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}>
                  {line.map(([w, style]) => <span key={w} className={`whitespace-nowrap ${style === 'serif' ? 'display-serif text-glacier-100' : 'display-black'} ${w === 'YOURS' ? 'text-aurora' : ''}`}>{w}</span>)}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div className="mt-10 max-w-lg pointer-events-auto" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.75 }}>
            <p className="text-[17px] leading-relaxed text-white/70">
              Left a job and the settlement looks short? Flight cancelled and the airline offers only a refund? Landlord kept part of your deposit? HaqDaar checks your documents against the rules, estimates what you may be owed with the working shown, drafts the letter, and helps you follow up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={startHref} className="btn-white h-12 px-6">Start a claim</Link>
              <button onClick={() => scrollToId('how')} className="btn h-12 px-6 text-white bg-white/5 border border-white/15 backdrop-blur-md hover:bg-white/10">See how it works</button>
            </div>
            <p className="mt-5 text-xs text-white/45">Guidance, not legal advice. Results depend on the facts you confirm.</p>
          </motion.div>
        </div>

        <motion.ol className="relative z-10 grid sm:grid-cols-3 border-t border-white/10 mx-5 sm:mx-8 lg:mx-12 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={`pt-5 pb-2 sm:px-6 ${i ? 'sm:border-l border-white/10' : 'sm:pl-0'}`}>
              <p className="font-serif text-[26px]"><span className="mr-2 align-middle font-sans text-xs font-semibold text-glacier-300 tabular">0{i + 1}</span>{s.title}</p>
              <p className="text-sm text-white/60 mt-1 max-w-[30ch]">{s.text}</p>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
