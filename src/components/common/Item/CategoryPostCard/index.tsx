import Link from 'next/link';

interface CategoryPostCardProps {
  title: string;
  description: string;
  date: string;
  href: string;
  image?: string;
}

export default function CategoryPostCard({
  title,
  description,
  date,
  href,
  image,
}: CategoryPostCardProps) {
  return (
    <Link href={href} className="block">
      <article className="group overflow-hidden rounded-lg bg-white transition-colors hover:bg-stone-50">
        <div
          className="h-[180px] w-full bg-stone-100 bg-cover bg-center"
          style={image ? { backgroundImage: `url(${image})` } : undefined}
        />

        <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
          <span className="text-xs text-[#C8B496]">{date}</span>
          <h4 className="text-xl font-medium text-[#1A1A1A] line-clamp-2">
            {title}
          </h4>
          <p className="text-sm leading-[1.6] text-[#4A4A4A] line-clamp-3">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}

CategoryPostCard.defaultProps = {
  image: '',
};
