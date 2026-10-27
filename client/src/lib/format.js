export const inr = (n) => (n === null || n === undefined ? '—' : '₹' + Math.round(Number(n)).toLocaleString('en-IN'));
export const date = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
export const dateTime = (d) => (d ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—');
export const ago = (d) => {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return date(d);
};

export const STATUS = {
  draft: { label: 'Collecting facts', tone: 'bg-mist text-steel' },
  confirmed: { label: 'Facts confirmed', tone: 'bg-glacier-100 text-glacier-700' },
  letter_ready: { label: 'Letter ready', tone: 'bg-marigold/15 text-[#8A5A12]' },
  awaiting_response: { label: 'Waiting for reply', tone: 'bg-glacier-100 text-glacier-700' },
  resolved: { label: 'Resolved', tone: 'bg-emerald/10 text-emerald' },
  closed: { label: 'Closed', tone: 'bg-mist text-steel' },
};

export const SEVERITY = {
  high: { label: 'Strong point', dot: 'bg-crimson', ring: 'border-crimson/25' },
  medium: { label: 'Worth raising', dot: 'bg-marigold', ring: 'border-marigold/30' },
  info: { label: 'Good to know', dot: 'bg-glacier-500', ring: 'border-line' },
};

// Each case type is a "gem": a thing of value you are owed.
export const GEMS = {
  employment: { name: 'Pearl', mid: '#F4F4F1', deep: '#8E8E8A', light: '#FFFFFF', shadow: 'rgba(0,0,0,.22)' },
  flight: { name: 'Silver', mid: '#C9C9C4', deep: '#4A4A48', light: '#FFFFFF', shadow: 'rgba(0,0,0,.28)' },
  rent: { name: 'Onyx', mid: '#2E2E2E', deep: '#050505', light: '#A8A8A4', shadow: 'rgba(0,0,0,.38)' },
};
