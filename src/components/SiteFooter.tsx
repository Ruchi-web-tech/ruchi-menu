import RotatingText from '@/components/RotatingText';
import { useMenuStore } from '@/store/menuStore';

/** Shared dark footer at the bottom of every page. */
const SiteFooter = ({ className = '' }: { className?: string }) => {
  const info = useMenuStore((s) => s.info);

  return (
    <footer
      className={`grain mx-3 mb-6 flex flex-col gap-6 rounded-[32px] bg-ruchi-ink px-6 py-8 text-ruchi-cream sm:mx-6 md:mx-auto md:mb-10 md:max-w-[calc(80rem-4rem)] md:gap-10 md:rounded-[40px] md:p-14 ${className}`}
    >
      <div className="flex flex-col-reverse gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <RotatingText />
        <img
          src="/logo-square-cream.png"
          alt="RUCHI"
          className="h-[72px] w-[72px] flex-shrink-0 md:h-40 md:w-40"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 font-sans text-[13px] leading-relaxed text-[#CFC8E6] md:flex-row md:text-sm">
        <span className="font-sans text-[13px] text-[#CFC8E6] md:text-sm">
          {info.address}, {info.postalCity.replace(/,?\s*Sweden$/i, '')} ·{' '}
          <span className="whitespace-nowrap font-sans text-[13px] text-[#CFC8E6] md:text-sm">{info.phone}</span>
        </span>
        <span className="font-sans text-[13px] text-[#CFC8E6] md:text-sm">© RUCHI</span>
      </div>
    </footer>
  );
};

export default SiteFooter;
