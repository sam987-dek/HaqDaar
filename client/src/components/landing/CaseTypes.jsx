import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../../api/hooks';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Plane, KeyRound } from 'lucide-react';
import { useMedia } from '../../lib/useMedia';

const CaseObject = lazy(() => import('../three/CaseObject'));
const ICONS = { employment: Briefcase, flight: Plane, rent: KeyRound };

// Shown if the API is still waking up, so the landing page never looks empty.
const FALLBACK = [
  { key: 'employment', name: 'Job exit and final settlement', tagline: 'Left a job and your dues are late or short?', status: 'live' },
  { key: 'flight', name: 'Cancelled, delayed or overbooked flight', tagline: 'Airline offered only a refund, or nothing?', status: 'live' },
  { key: 'rent', name: 'Deposit not returned', tagline: 'Landlord kept your deposit?', status: 'live' },
];

export default function CaseTypes() {
  const { data } = usePacks();
  const { user } = useAuth();
  const packs = data?.length ? data : FALLBACK;
  return (
    <section id="types" className="border-t border-white/[0.08]">
      <div className="px-6 sm:px-12 py-20 sm:py-28">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[clamp(44px,6.5vw,96px)] leading-[0.92]">Pick what happened to you</h2>
          <p className="mt-5 text-lg text-white/60 max-w-xl">Each kind of case is a pack of rules, calculations and letters, ready to use today.</p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p, i) => {
            const href = user ? `/cases/new?pack=${p.key}` : `/register?next=${encodeURIComponent(`/cases/new?pack=${p.key}`)}`;
            return (
              <motion.li key={p.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <CaseCard pack={p} href={href} />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function CaseCard({ pack, href }) {
  const [hovered, setHovered] = useState(false);
  const live = pack.status === 'live';
  // Four small 3D scenes are fine on a desktop; phones get a flat icon instead.
  const show3d = useMedia('(min-width: 768px)');
  const Icon = ICONS[pack.key] || Briefcase;
  const icon = <div className="absolute inset-0 grid place-items-center"><Icon className={`h-12 w-12 ${live ? 'text-white' : 'text-white/40'}`} strokeWidth={1.25} /></div>;
  const body = (
    <>
      <div className="relative -mx-2 -mt-2 h-40 rounded-[18px] bg-[radial-gradient(55%_65%_at_50%_45%,rgba(255,255,255,.16),rgba(255,255,255,.03)_70%)] overflow-hidden">
        {show3d ? (
          <Suspense fallback={icon}>
            <CaseObject packKey={pack.key} hovered={hovered} muted={!live} className="absolute inset-0" />
          </Suspense>
        ) : icon}
        <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${live ? 'bg-white text-ink' : 'bg-white/10 text-white/60'}`}>{live ? 'Live' : 'Soon'}</span>
      </div>
      <h3 className="mt-6 font-serif text-[28px] leading-[1.04]">{pack.name}</h3>
      <p className="mt-2 text-white/55">{pack.tagline}</p>
      <p className={`mt-6 text-sm font-semibold ${live ? 'text-white' : 'text-white/40'}`}>{live ? 'Start this claim →' : 'Coming soon'}</p>
    </>
  );
  const hover = { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };
  return live ? (
    <Link to={href} {...hover} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)} className="block h-full rounded-[24px] bg-white/[0.03] border border-white/10 backdrop-blur-sm p-4 pb-7 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.06]">{body}</Link>
  ) : (
    <div {...hover} className="h-full rounded-[24px] bg-white/[0.015] border border-white/[0.06] p-4 pb-7" aria-disabled="true">{body}</div>
  );
}
