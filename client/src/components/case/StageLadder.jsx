import { Check } from 'lucide-react';

export default function StageLadder({ stages, stageIndex, status }) {
  const finished = status === 'resolved' || status === 'closed';
  return (
    <ol className="grid gap-3 md:grid-cols-3" aria-label="Escalation stages">
      {stages.map((s, i) => {
        const done = i < stageIndex || (finished && i === stageIndex);
        const current = i === stageIndex && !finished;
        return (
          <li key={s.key} className={`rounded-2xl border p-4 ${current ? 'border-ink bg-white' : done ? 'border-line bg-white/60' : 'border-dashed border-line'}`} aria-current={current ? 'step' : undefined}>
            <div className="flex items-center gap-2.5">
              <span className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold ${done ? 'bg-emerald text-white' : current ? 'bg-ink text-white' : 'bg-mist text-steel'}`}>
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <p className={`font-semibold ${!current && !done ? 'text-steel' : ''}`}>{s.label}</p>
            </div>
            <p className="text-sm text-steel mt-2">{s.recipient}</p>
          </li>
        );
      })}
    </ol>
  );
}
