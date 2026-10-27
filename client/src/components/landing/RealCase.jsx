import { motion } from 'framer-motion';
import GapMeter from '../ui/GapMeter';
import { inr } from '../../lib/format';

const LINES = [
  ['Unpaid salary for 45 days', 150000],
  ['Leave encashment for 20 days', 38461],
  ['Gratuity for 6 years', 173077],
  ['Notice shortfall of 15 days', -50000],
];

export default function RealCase() {
  return (
    <section className="border-t border-white/[0.08]">
      <div className="px-6 sm:px-12 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1fr_1.05fr] items-center">
        <div>
          <h2 className="font-serif text-[clamp(40px,5.5vw,80px)] leading-[0.95]">Priya resigned after five and a half years</h2>
          <p className="mt-6 text-lg text-white/60 max-w-lg">
            HR offered ₹84,000 and said it would take 60 days. HaqDaar read her appointment letter, payslip and settlement statement and flagged three likely problems: no gratuity, no leave encashment and about ₹16,000 too much taken for notice. The payment deadline also appeared to have passed.
          </p>
          <ul className="mt-8 space-y-3 max-w-lg">
            {['Gratuity appears to be missing from the settlement', 'Final dues may not have been paid within 2 working days', 'The notice deduction looks too high'].map((t) => (
              <li key={t} className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-white shrink-0" /><span className="text-white/85">{t}</span></li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/40">An illustrative case built from made-up documents.</p>
        </div>
        <motion.div className="rounded-[26px] glass-dark p-7 sm:p-9 shadow-glow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <GapMeter offered={84000} owed={311538} dark />
          <dl className="mt-8 divide-y divide-white/10 text-[15px]">
            {LINES.map(([label, amount]) => (
              <div key={label} className="flex justify-between py-2.5"><dt className="text-white/55">{label}</dt><dd className="tabular font-medium">{amount < 0 ? `− ${inr(-amount)}` : inr(amount)}</dd></div>
            ))}
            <div className="flex justify-between py-3 font-semibold"><dt>Estimated total due</dt><dd className="tabular">{inr(311538)}</dd></div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
