const ROW_A = [
  ['Gratuity appears to be missing', 'Code on Social Security, 2020, s.53'],
  ['Final dues were not paid within 2 working days', 'Code on Wages, 2019, s.17(2)'],
  ['Cancellation compensation may be due', 'DGCA CAR Section 3, Series M, Part IV'],
  ['The notice deduction looks too high', 'Indian Contract Act, 1872, s.74'],
  ['At least half your pay counts as wages', 'Code on Wages, 2019, s.2(y)'],
  ['Damage was deducted without proof', 'Your rental agreement; Indian Contract Act, 1872, s.73'],
];
const ROW_B = [
  ['Denied boarding compensation may be due', 'DGCA CAR, para 3.5'],
  ['Your non-compete may not be enforceable', 'Indian Contract Act, 1872, s.27'],
  ['Meals may have been owed during the delay', 'DGCA CAR, para 3.8'],
  ['Fixed-term gratuity after one year', 'Code on Social Security, 2020, s.53(1)'],
  ['A full refund may be due', 'DGCA CAR Section 3, Series M, Part IV'],
  ['Repainting may be normal wear and tear', 'Your rental agreement'],
];

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''} gap-4 py-2`}>
        {doubled.map(([title, cite], i) => (
          <div key={i} className="glass-dark rounded-2xl px-6 py-5 w-[340px] shrink-0">
            <p className="text-white text-[17px] leading-snug">{title}</p>
            <p className="text-white/50 text-sm mt-3">{cite}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dark interlude: real findings scroll past, behind the one idea that matters.
export default function Trust() {
  return (
    <section id="trust" className="border-t border-white/[0.08]">
      <div className="relative overflow-hidden py-20 sm:py-28">
        <div className="space-y-4 opacity-70" aria-hidden="true">
          <Row items={ROW_A} />
          <Row items={ROW_B} reverse />
          <Row items={[...ROW_A].reverse()} />
        </div>
        <div className="absolute inset-0 grid place-items-center px-6 pointer-events-none">
          <div className="text-center max-w-3xl bg-midnight/75 backdrop-blur-md border border-white/10 shadow-glow rounded-[28px] px-6 sm:px-12 py-10 pointer-events-auto">
            <h2 className="font-serif text-[clamp(48px,8vw,120px)] leading-[0.9]">Rules, <span className="text-aurora">not guesses</span></h2>
            <p className="mt-6 text-lg text-white/75 max-w-xl mx-auto">
              AI only reads your documents, and you confirm what it found. Every finding comes from a written rule that names the law it relies on, so you can check it yourself. It is guidance, not legal advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
