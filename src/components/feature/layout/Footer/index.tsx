const LAST_UPDATED = '2026.05.25';
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 select-none">
      <div className="max-w-container mx-auto px-s-7 py-s-7 flex items-center justify-between text-sm text-ink-500">
        <div>© {CURRENT_YEAR} 박건규 (geongyu)</div>
        <div className="font-mono text-[11px] tracking-[0.06em] uppercase">
          BUILT WITH NEXT.JS · LAST UPDATED {LAST_UPDATED}
        </div>
      </div>
    </footer>
  );
}
