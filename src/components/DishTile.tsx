import { cn } from '@/lib/utils';
import { categoryStyle } from '@/lib/categoryStyle';

/**
 * Stand-in for a dish photo: the dish name in big type on its category
 * colour. Used wherever a dish has no photo yet.
 */
const DishTile = ({
  name,
  categories,
  className,
  textClassName,
  inverted,
}: {
  name: string;
  categories?: string[];
  className?: string;
  textClassName?: string;
  /** Dark tile with the category colour as text (for use on a coloured card). */
  inverted?: boolean;
}) => {
  const style = categoryStyle(categories);
  const colour = inverted ? 'bg-ruchi-ink' : style.bg;
  const text = inverted ? style.accent : style.text;
  return (
    <div className={cn('grain flex h-full w-full items-end overflow-hidden p-3 md:p-5', colour, className)} role="img" aria-label={name}>
      <div
        className={cn(
          'font-display font-black uppercase leading-[0.92] tracking-[-0.03em] [overflow-wrap:anywhere]',
          text,
          textClassName
        )}
      >
        {name}
      </div>
    </div>
  );
};

export default DishTile;
