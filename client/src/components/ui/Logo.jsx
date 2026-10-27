import { Link } from 'react-router-dom';

// The हक़ (haq) mark. public/logo.png is 256px so it stays sharp on high-density screens.
export function Mark({ className = 'h-8 w-8' }) {
  return <img src="/logo.png" alt="" width="32" height="32" className={`${className} shrink-0 rounded-[22%] ring-1 ring-white/10`} draggable="false" />;
}

export default function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 ${light ? 'text-white' : 'text-ink'}`} aria-label="HaqDaar home">
      <Mark />
      <span className="text-[19px] tracking-tight"><span className="font-serif text-[22px]">Haq</span><span className="font-semibold">Daar</span></span>
    </Link>
  );
}
