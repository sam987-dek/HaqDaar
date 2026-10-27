import { lazy, Suspense, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useReducedMotion } from 'framer-motion';
import { FileSearch, BookOpen, Coins, Send } from 'lucide-react';
import { useMedia } from '../../lib/useMedia';

const StepStage = lazy(() => import('../three/StepStage'));

const STEPS = [
  { word: 'Read', note: 'your documents', icon: FileSearch, text: 'Upload your offer letter, payslips, settlement statement, ticket or rental agreement. AI suggests the dates and amounts it finds; you check and correct each one before anything is used.' },
  { word: 'Check', note: 'against the rules', icon: BookOpen, text: 'Your facts run through rules written from the Labour Codes, the DGCA passenger rules and the terms of your rental agreement. Each finding names the section it relies on, so you can verify it.' },
  { word: 'Estimate', note: 'line by line', icon: Coins, text: 'Gratuity, leave encashment, refunds, compensation and deposit deductions are estimated line by line, with the working shown, and set against what you were offered.' },
  { word: 'Claim', note: 'and follow up', icon: Send, text: 'Download a formal letter for the right person, mark it sent, and HaqDaar counts down the reply window and suggests where to escalate next.' },
];

// Phones and reduced-motion: a plain list, no pinning and no WebGL.
function StepList() {
  return (
    <section id="how" className="border-t border-white/[0.08] px-5 sm:px-8 py-20">
      <p className="eyebrow">How it works</p>
      <h2 className="mt-4 font-serif text-[clamp(40px,10vw,64px)] leading-[0.95]">Read, check, estimate, claim</h2>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {STEPS.map((s, i) => (
          <li key={s.word} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
              <span className="text-xs font-semibold text-white/50 tabular">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-serif text-3xl">{s.word} <span className="italic text-white/50 text-xl">{s.note}</span></h3>
            <p className="mt-2 text-white/65 leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Desktop: a pinned stage. Scrolling steps through the list on the left while the object on the right changes.
function PinnedSteps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIndex(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden border-t border-white/[0.08] grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 px-8 lg:px-12">
        <div className="flex flex-col justify-center py-16">
          <p className="eyebrow self-start">How it works</p>
          <h2 className="mt-4 font-serif text-[clamp(40px,4.6vw,72px)] leading-[0.95]">Read, check, estimate, claim</h2>
          <ol className="mt-10 space-y-1">
            {STEPS.map((s, i) => {
              const on = i === index;
              return (
                <li key={s.word} aria-current={on ? 'step' : undefined} className={`relative rounded-2xl pl-6 pr-4 py-3 transition-colors duration-300 ${on ? 'bg-white/[0.05]' : ''}`}>
                  <span className={`absolute left-0 top-3 bottom-3 w-px transition-colors duration-300 ${on ? 'bg-white' : 'bg-white/15'}`} />
                  <p className={`flex items-baseline gap-3 transition-colors duration-300 ${on ? 'text-white' : 'text-white/40'}`}>
                    <span className="text-xs font-semibold tabular">0{i + 1}</span>
                    <span className="font-serif text-[28px] leading-none">{s.word}</span>
                    <span className="font-serif italic text-base text-white/45">{s.note}</span>
                  </p>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p key="t" className="text-white/65 leading-relaxed max-w-md overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 8 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        {s.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 h-px bg-white/10 relative max-w-md">
            <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: bar }} />
          </div>
        </div>
        <div className="relative">
          <Suspense fallback={null}>
            <StepStage active={index} className="absolute inset-0" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default function StepsScroll() {
  const reduce = useReducedMotion();
  const desktop = useMedia('(min-width: 1024px)');
  return reduce || !desktop ? <StepList /> : <PinnedSteps />;
}
