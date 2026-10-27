import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';
import { scrollToId } from '../ui/SmoothScroll';

const ease = [0.22, 1, 0.36, 1];

export default function Closing() {
  const reduce = useReducedMotion();
  // Each line rises out of its own mask as the section scrolls in.
  const rise = (i) => (reduce ? {} : { initial: { y: '100%' }, whileInView: { y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 1, ease, delay: i * 0.1 } });
  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, ease, delay: d } });

  return (
    <section className="border-t border-white/[0.08]">
      <div className="relative px-6 sm:px-12 pt-28 sm:pt-36 pb-10 overflow-hidden">
        {/* Soft spotlight behind the headline */}
        <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.08),transparent)]" aria-hidden="true" />

        <div className="relative text-center">
          <motion.p className="eyebrow" {...fade(0)}>Haq means what is rightfully yours</motion.p>
          <h2 aria-label="Your haq, in writing" className="mt-8 text-[clamp(48px,9.5vw,152px)] leading-none">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="flex items-baseline justify-center gap-[0.22em]" {...rise(0)}>
                <span className="display-serif">YOUR</span>
                <span className="display-black text-aurora pb-[0.08em]">HAQ,</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.2em]">
              <motion.span className="flex items-baseline justify-center gap-[0.22em]" {...rise(1)}>
                <span className="display-black">IN</span>
                <span className="display-serif italic normal-case tracking-normal text-white/85">writing.</span>
              </motion.span>
            </span>
          </h2>
          <motion.p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/65" {...fade(0.2)}>
            Questions, feedback or an idea for a new case type? We would like to hear from you.
          </motion.p>
          <motion.div className="mt-9 flex justify-center" {...fade(0.3)}>
            <Link to="/contact" className="btn-white h-12 px-8">Contact us</Link>
          </motion.div>
        </div>

        <footer className="relative mt-28 pt-8 border-t border-white/10 grid gap-8 text-sm sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 text-white/50 max-w-sm leading-relaxed">HaqDaar gives guidance, not legal advice. Check every figure against your own documents before you send a letter.</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Explore</p>
            <ul className="mt-3 space-y-2">
              {[['how', 'How it works'], ['types', 'Case types'], ['trust', 'Why trust it']].map(([id, label]) => (
                <li key={id}><button onClick={() => scrollToId(id)} className="text-white/70 hover:text-white transition-colors">{label}</button></li>
              ))}
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact us</Link></li>
            </ul>
          </nav>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Made by</p>
            <p className="mt-3 text-white/70">Samarth Patil</p>
            <p className="text-white/50">Scaler School of Technology</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
