import { MenuItem } from '@/types/menu';
import { cn, formatPrice } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

/** Tag pill colours — each readable on white and on the photo. */
const TAG_STYLES: Record<string, string> = {
  NEW: 'bg-ruchi-yellow text-ruchi-ink',
  Popular: 'bg-ruchi-ink text-ruchi-cream',
  VGN: 'bg-[#DDF5E6] text-[#155C33]',
  VEG: 'bg-[#DDF5E6] text-[#155C33]',
  'Vegan Option': 'bg-[#DDF5E6] text-[#155C33]',
  GF: 'bg-[#DCEBFF] text-[#1D4E9E]',
  SPICY: 'bg-[#FFE1DA] text-[#A32A12]',
};

const tagClass = (tag: string) =>
  cn(
    'inline-flex items-center rounded-full font-sans font-bold tracking-wide leading-none',
    TAG_STYLES[tag] ?? 'bg-ruchi-cream text-ruchi-ink'
  );

/**
 * Phone: compact row (photo left, text right) so the menu scrolls fast.
 * Tablet/desktop: big square photo on top, tag on the photo, price pill.
 */
const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const tags = item.tags ?? [];
  const [firstTag] = tags;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full gap-3 rounded-3xl bg-white p-2.5 text-left transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ruchi-blue md:flex-col md:gap-3.5 md:rounded-[32px] md:p-3 md:pb-5"
    >
      {/* Photo */}
      <div className="relative h-[108px] w-[108px] flex-shrink-0 overflow-hidden rounded-[18px] bg-ruchi-cream md:aspect-square md:h-auto md:w-full md:rounded-3xl">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grain h-full w-full bg-ruchi-purple/40" />
        )}
        {firstTag && (
          <span className={cn(tagClass(firstTag), 'absolute left-3.5 top-3.5 hidden h-7 px-3 text-xs md:inline-flex')}>
            {firstTag}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-0.5 pr-1 md:gap-2 md:px-2 md:py-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="font-display text-base font-extrabold leading-tight tracking-tight text-ruchi-ink md:text-[22px]">
              {item.name}
            </h3>
            {firstTag && (
              <span className={cn(tagClass(firstTag), 'h-5 px-2 text-[10.5px] md:hidden')}>{firstTag}</span>
            )}
          </div>
          <span className="hidden h-8 flex-shrink-0 items-center rounded-full bg-ruchi-ink px-3.5 font-sans text-sm font-bold text-ruchi-cream md:inline-flex">
            {formatPrice(item)}
          </span>
        </div>

        <p className="line-clamp-2 font-sans text-[12.5px] font-normal leading-snug text-[#4A4360] md:line-clamp-3 md:text-sm md:leading-relaxed">
          {item.description}
        </p>

        <span className="mt-auto inline-flex h-7 w-fit items-center rounded-full bg-ruchi-ink px-3 font-sans text-[13px] font-bold text-ruchi-cream md:hidden">
          {formatPrice(item)}
        </span>
      </div>
    </button>
  );
};

export default MenuCard;
