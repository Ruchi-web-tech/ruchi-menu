import { Link } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo';

/** In-app "page not found" (the server also answers unknown addresses with public/404.html). */
const NotFound = () => {
  usePageMeta({
    title: 'Page not found | RUCHI Borås',
    description: "This page doesn't exist. See the RUCHI menu or order online.",
    path: '/',
    noindex: true,
  });

  return (
    <div className="mx-auto flex max-w-7xl px-3 sm:px-6 md:px-8">
      <section className="grain flex w-full flex-col items-start gap-5 rounded-[32px] bg-ruchi-pink px-6 py-12 md:rounded-[40px] md:p-16">
        <div className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruchi-ink md:text-[13px]">Error 404</div>
        <h1 className="font-display text-[44px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-ruchi-ink md:text-[96px]">
          Nothing
          <br />
          on this plate
        </h1>
        <p className="max-w-md font-sans text-base font-medium text-ruchi-ink md:text-lg">
          This page doesn't exist. The food does, though.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/menu" className="inline-flex h-14 items-center rounded-full bg-ruchi-ink px-7 font-sans text-base font-bold text-ruchi-cream">
            See the menu
          </Link>
          <Link to="/" className="inline-flex h-14 items-center rounded-full bg-ruchi-cream px-7 font-sans text-base font-bold text-ruchi-ink">
            Go to the homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
