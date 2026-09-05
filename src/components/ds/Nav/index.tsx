import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

interface Props {
  brand?: string;
  slug?: string;
  items?: NavItem[];
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Writing', href: '/', active: true },
  { label: 'Archive', href: '/posts' },
  { label: 'Log', href: '/log' },
];

const Nav = ({
  brand = 'geongyu',
  slug = '/notes',
  items = DEFAULT_ITEMS,
}: Props) => (
  <header className="h-16 sticky top-0 z-10 bg-ink-0 border-b border-ink-200">
    <div className="h-full max-w-container mx-auto px-s-7 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-baseline gap-[10px] no-underline text-ink-950"
      >
        <span className="text-[17px] font-semibold tracking-[-0.02em]">
          {brand}
        </span>
        <span className="font-mono text-[11px] text-ink-500">{slug}</span>
      </Link>
      <nav className="flex gap-s-6 text-sm items-center">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              item.active
                ? 'text-ink-950 font-semibold border-b-[1.5px] border-ink-950 pb-[2px]'
                : 'text-ink-500 hover:text-ink-950 transition-colors'
            }
          >
            {item.external ? `↗ ${item.label}` : item.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default Nav;
