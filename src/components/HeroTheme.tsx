import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { THEME_TAG, type ThemeId } from '@/lib/themes';

/*
 * Decorations laid over the homepage hero photo on seasonal days.
 * Purely visual: aria-hidden and pointer-events-none, so the buttons
 * underneath keep working. Animations stop for visitors who have turned
 * off motion on their device (see .theme-* rules in index.css).
 */

const RUCHI_COLOURS = ['#D4FB37', '#F792C1', '#0ecec4', '#a393ec', '#FBF5E9'];

/** Same "random" layout for every visitor and every page load. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const Bat = ({ size }: { size: number }) => (
  <svg viewBox="0 0 64 32" width={size} height={size / 2} aria-hidden="true" className="block">
    <path
      fill="#1B1433"
      d="M32 10c2-4 4-6 6-6-1 2-1 4 0 6 4-3 10-3 16 2-4 0-7 2-8 5-3-2-6-2-8 1-1-3-4-4-6-4s-5 1-6 4c-2-3-5-3-8-1-1-3-4-5-8-5 6-5 12-5 16-2 1-2 1-4 0-6 2 0 4 2 6 6z"
    />
  </svg>
);

const Star = ({ size, style }: { size: number; style: CSSProperties }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="theme-twinkle absolute" style={style}>
    <path fill="#FBF5E9" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
  </svg>
);

function Halloween() {
  const rnd = seeded(31);
  const bats = Array.from({ length: 7 }, (_, i) => ({
    left: 8 + rnd() * 82,
    top: 6 + rnd() * 30,
    size: 30 + Math.round(rnd() * 36),
    delay: rnd() * 3,
    phone: i < 4,
  }));
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.62)_0%,rgba(27,20,51,0.18)_45%,rgba(255,122,26,0.30)_100%)]" />
      <div className="absolute left-[44%] top-[9%] h-[96px] w-[96px] rounded-full bg-[#FFE7B0] shadow-[0_0_80px_30px_rgba(255,170,60,0.55)] md:left-[56%] md:top-[10%] md:h-[170px] md:w-[170px]" />
      {bats.map((b, i) => (
        <div
          key={i}
          className={cn('theme-drift absolute', !b.phone && 'hidden md:block')}
          style={{ left: `${b.left}%`, top: `${b.top}%`, animationDelay: `-${b.delay.toFixed(1)}s` }}
        >
          <Bat size={b.size} />
        </div>
      ))}
      <svg viewBox="0 0 100 100" className="absolute left-0 top-0 h-24 w-24 opacity-75 md:h-36 md:w-36" aria-hidden="true">
        <g fill="none" stroke="#FBF5E9" strokeWidth="0.8">
          <path d="M0 0L100 30M0 0L70 70M0 0L30 100" />
          <path d="M0 22Q14 18 22 8Q20 0 22 0" />
          <path d="M0 46Q30 40 46 16Q44 4 44 0" />
          <path d="M0 72Q46 62 70 22Q66 6 68 0" />
        </g>
      </svg>
    </>
  );
}

/** A garland of bulbs in RUCHI colours, hanging in swags across the top. */
function Garland({ swags, bulbs, className }: { swags: number; bulbs: number; className: string }) {
  const amp = 40;
  const top = 10;
  const yAt = (f: number) => {
    const x = f * swags;
    return top + amp * Math.sin(Math.PI * (x - Math.floor(x)));
  };
  const d = Array.from({ length: 121 }, (_, i) => `${i === 0 ? 'M' : 'L'}${(i / 120) * 1000} ${yAt(i / 120).toFixed(1)}`).join(' ');
  const rnd = seeded(12);
  return (
    <div className={cn('absolute inset-x-0 top-0 h-[90px]', className)}>
      <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={d} fill="none" stroke="#1B1433" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: bulbs }, (_, i) => {
        const f = (i + 0.5) / bulbs;
        const colour = RUCHI_COLOURS[i % RUCHI_COLOURS.length];
        return (
          <div
            key={i}
            className="theme-twinkle absolute flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${f * 100}%`, top: `${yAt(f) - 1}px`, animationDelay: `-${(rnd() * 1.8).toFixed(1)}s` }}
          >
            <div className="h-[7px] w-[6px] rounded-[1.5px] bg-ruchi-ink" />
            <div
              className="h-[21px] w-[15px] rounded-full"
              style={{ background: colour, boxShadow: `0 0 14px 6px ${colour}55` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function Falling({ count, seed, render }: { count: number; seed: number; render: (rnd: () => number, i: number) => JSX.Element }) {
  const rnd = seeded(seed);
  return <>{Array.from({ length: count }, (_, i) => render(rnd, i))}</>;
}

function Christmas() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.45)_0%,rgba(27,20,51,0.05)_40%,rgba(27,20,51,0)_60%)]" />
      <Garland swags={2} bulbs={8} className="md:hidden" />
      <Garland swags={3} bulbs={16} className="hidden md:block" />
      <Falling
        count={60}
        seed={25}
        render={(rnd, i) => {
          const size = [3, 4, 5, 6, 8][Math.floor(rnd() * 5)];
          const duration = 7 + rnd() * 7;
          return (
            <span
              key={i}
              className={cn('theme-fall absolute rounded-full bg-white', i % 2 === 1 && 'hidden md:block')}
              style={{
                left: `${rnd() * 100}%`,
                top: '-12px',
                ['--still' as string]: rnd().toFixed(2),
                width: size,
                height: size,
                opacity: 0.55 + rnd() * 0.4,
                animationDuration: `${duration.toFixed(1)}s`,
                animationDelay: `-${(rnd() * duration).toFixed(1)}s`,
              }}
            />
          );
        }}
      />
    </>
  );
}

function NewYear() {
  const colours = [...RUCHI_COLOURS.slice(0, 4), '#FFD54A'];
  const rnd = seeded(2027);
  const stars = Array.from({ length: 9 }, (_, i) => ({
    left: 3 + rnd() * 90,
    top: 5 + rnd() * 40,
    size: 16 + Math.round(rnd() * 26),
    delay: rnd() * 1.8,
    phone: i < 5,
  }));
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.55)_0%,rgba(27,20,51,0.1)_50%,rgba(27,20,51,0.25)_100%)]" />
      <Falling
        count={80}
        seed={2026}
        render={(r, i) => {
          const duration = 6 + r() * 6;
          return (
            <span
              key={i}
              className={cn('theme-fall absolute', i % 2 === 1 && 'hidden md:block')}
              style={{
                left: `${r() * 100}%`,
                top: '-16px',
                ['--still' as string]: r().toFixed(2),
                width: [6, 8, 10, 12][Math.floor(r() * 4)],
                height: [4, 6, 14, 16][Math.floor(r() * 4)],
                borderRadius: r() < 0.3 ? 999 : 2,
                background: colours[Math.floor(r() * colours.length)],
                rotate: `${Math.round(r() * 180)}deg`,
                animationDuration: `${duration.toFixed(1)}s`,
                animationDelay: `-${(r() * duration).toFixed(1)}s`,
              }}
            />
          );
        }}
      />
      {stars.map((s, i) => (
        <span key={i} className={cn(!s.phone && 'hidden md:block')}>
          <Star size={s.size} style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `-${s.delay.toFixed(1)}s` }} />
        </span>
      ))}
    </>
  );
}

/** Shapes that drift down (fall) or float up (rise) across the photo. */
function Particles({
  count,
  seed,
  motion,
  render,
}: {
  count: number;
  seed: number;
  motion: 'fall' | 'rise';
  render: (rnd: () => number) => JSX.Element;
}) {
  const rnd = seeded(seed);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const duration = (motion === 'rise' ? 9 : 8) + rnd() * 7;
        return (
          <div
            key={i}
            className={cn(motion === 'fall' ? 'theme-fall' : 'theme-rise', 'absolute', i % 2 === 1 && 'hidden md:block')}
            style={{
              left: `${rnd() * 96}%`,
              top: motion === 'fall' ? '-40px' : '100%',
              ['--still' as string]: rnd().toFixed(2),
              animationDuration: `${duration.toFixed(1)}s`,
              animationDelay: `-${(rnd() * duration).toFixed(1)}s`,
            }}
          >
            {render(rnd)}
          </div>
        );
      })}
    </>
  );
}

const Heart = ({ size, colour }: { size: number; colour: string }) => (
  <svg viewBox="0 0 24 22" width={size} height={size * 0.92} aria-hidden="true" className="block">
    <path fill={colour} d="M12 21.6 10.3 20C4.2 14.5 0 10.7 0 6.2 0 2.7 2.7 0 6.2 0c1.9 0 3.8.9 5.8 2.6C14 .9 15.9 0 17.8 0 21.3 0 24 2.7 24 6.2c0 4.5-4.2 8.3-10.3 13.8z" />
  </svg>
);

const Feather = ({ size, colour, turn }: { size: number; colour: string; turn: number }) => (
  <svg viewBox="0 0 20 48" width={size * 0.42} height={size} aria-hidden="true" className="block" style={{ rotate: `${turn}deg` }}>
    <path fill={colour} d="M10 0C17 8 19 20 15 32c-1.6 4.6-3.4 7-5 8-1.6-1-3.4-3.4-5-8C1 20 3 8 10 0z" />
    <path d="M10 6v42" stroke="#1B1433" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Flower = ({ size, petal, centre }: { size: number; petal: string; centre: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="block">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="12" cy="6.5" rx="4.2" ry="5.8" fill={petal} transform={`rotate(${a} 12 12)`} />
    ))}
    <circle cx="12" cy="12" r="3.4" fill={centre} />
  </svg>
);

const Swirl = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="block">
    <circle cx="12" cy="12" r="11" fill="#E2A15C" />
    <path d="M12 12c0-1.4 1.6-1.8 2.4-.8 1.2 1.5-.2 3.8-2.4 3.8-2.8 0-4.2-3-2.8-5.4 1.6-2.8 6-3 7.8 0 2 3.4-.6 7.6-4.8 7.6" fill="none" stroke="#7A3E14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Lantern = ({ size }: { size: number }) => (
  <svg viewBox="0 0 40 80" width={size} height={size * 2} aria-hidden="true" className="block">
    <path d="M20 0v10" stroke="#1B1433" strokeWidth="1.5" />
    <rect x="12" y="10" width="16" height="5" rx="1.5" fill="#F2B632" />
    <ellipse cx="20" cy="34" rx="17" ry="19" fill="#E23A2E" />
    <path d="M20 15c-7 6-7 32 0 38M20 15c7 6 7 32 0 38M20 15v38" fill="none" stroke="#B5221A" strokeWidth="1.2" />
    <rect x="12" y="51" width="16" height="5" rx="1.5" fill="#F2B632" />
    <path d="M17 56v16M20 56v20M23 56v16" stroke="#F2B632" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Small round paper lantern with its own glow. */
const GlowLantern = ({ size, colour }: { size: number; colour: string }) => (
  <div
    className="rounded-full"
    style={{ width: size, height: size * 1.15, background: colour, boxShadow: `0 0 ${size}px ${size / 3}px ${colour}66` }}
  />
);

const Moon = ({ className }: { className: string }) => (
  <div className={cn('absolute rounded-full bg-[#FFF1C9] shadow-[0_0_90px_34px_rgba(255,214,120,0.5)]', className)} />
);

function Valentine() {
  const colours = ['#F792C1', '#FF5C8A', '#a393ec', '#FBF5E9'];
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.35)_0%,rgba(247,146,193,0.18)_55%,rgba(247,146,193,0.35)_100%)]" />
      <Particles count={28} seed={214} motion="rise" render={(r) => <Heart size={14 + Math.round(r() * 26)} colour={colours[Math.floor(r() * 4)]} />} />
    </>
  );
}

function Easter() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.35)_0%,rgba(27,20,51,0.05)_45%,rgba(212,251,55,0.12)_100%)]" />
      <Particles
        count={26}
        seed={404}
        motion="fall"
        render={(r) => <Feather size={30 + Math.round(r() * 26)} colour={RUCHI_COLOURS[Math.floor(r() * 4)]} turn={Math.round(r() * 120 - 60)} />}
      />
    </>
  );
}

function NationalDay() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,106,167,0.45)_0%,rgba(0,106,167,0.08)_50%,rgba(27,20,51,0.2)_100%)]" />
      <Particles
        count={70}
        seed={606}
        motion="fall"
        render={(r) => (
          <div
            style={{
              width: [6, 8, 10, 12][Math.floor(r() * 4)],
              height: [4, 6, 14, 16][Math.floor(r() * 4)],
              borderRadius: r() < 0.3 ? 999 : 2,
              background: r() < 0.5 ? '#006AA7' : '#FECC02',
              rotate: `${Math.round(r() * 180)}deg`,
            }}
          />
        )}
      />
    </>
  );
}

function Midsummer() {
  const petals = ['#FBF5E9', '#F792C1', '#a393ec', '#D4FB37'];
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.3)_0%,rgba(255,236,170,0.12)_50%,rgba(212,251,55,0.15)_100%)]" />
      {/* a flower crown hanging across the top */}
      <div className="absolute inset-x-0 top-0 h-[80px]">
        {Array.from({ length: 14 }, (_, i) => {
          const f = (i + 0.5) / 14;
          const y = 6 + 34 * Math.sin(Math.PI * ((f * 2) % 1));
          return (
            <div key={i} className={cn('absolute -translate-x-1/2', i % 2 === 1 && 'hidden md:block')} style={{ left: `${f * 100}%`, top: y }}>
              <Flower size={30} petal={petals[i % 4]} centre="#FFD54A" />
            </div>
          );
        })}
      </div>
      <Particles
        count={30}
        seed={621}
        motion="fall"
        render={(r) => <Flower size={12 + Math.round(r() * 14)} petal={petals[Math.floor(r() * 4)]} centre="#FFD54A" />}
      />
    </>
  );
}

function LunarNewYear() {
  const rnd = seeded(888);
  const lanterns = [8, 24, 50, 76, 92].map((left, i) => ({ left, size: 34 + Math.round(rnd() * 14), delay: rnd() * 3, phone: i % 2 === 0 }));
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(120,12,12,0.5)_0%,rgba(120,12,12,0.12)_45%,rgba(27,20,51,0.2)_100%)]" />
      {lanterns.map((l, i) => (
        <div
          key={i}
          className={cn('theme-sway absolute top-0 origin-top -translate-x-1/2', !l.phone && 'hidden md:block')}
          style={{ left: `${l.left}%`, animationDelay: `-${l.delay.toFixed(1)}s` }}
        >
          <Lantern size={l.size} />
        </div>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={cn(i % 2 === 1 && 'hidden md:block')}>
          <svg viewBox="0 0 24 24" width={12 + (i % 4) * 6} height={12 + (i % 4) * 6} aria-hidden="true" className="theme-twinkle absolute"
            style={{ left: `${(i * 37) % 92 + 4}%`, top: `${18 + ((i * 23) % 40)}%`, animationDelay: `-${(i * 0.37).toFixed(1)}s` }}>
            <path fill="#FFD54A" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </>
  );
}

function MidAutumn() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.65)_0%,rgba(27,20,51,0.25)_50%,rgba(27,20,51,0.15)_100%)]" />
      <Moon className="right-[10%] top-[8%] h-[110px] w-[110px] md:right-[14%] md:top-[9%] md:h-[190px] md:w-[190px]" />
      <Particles count={18} seed={815} motion="rise" render={(r) => <GlowLantern size={14 + Math.round(r() * 16)} colour={RUCHI_COLOURS[Math.floor(r() * 4)]} />} />
    </>
  );
}

function Kanelbulle() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.35)_0%,rgba(160,97,43,0.12)_50%,rgba(160,97,43,0.3)_100%)]" />
      <Particles count={22} seed={104} motion="fall" render={(r) => <Swirl size={18 + Math.round(r() * 20)} />} />
    </>
  );
}

function Lucia() {
  const rnd = seeded(1213);
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,51,0.7)_0%,rgba(27,20,51,0.35)_55%,rgba(27,20,51,0.2)_100%)]" />
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-twinkle absolute left-1/2 top-[7%] h-16 w-16 -translate-x-1/2 md:h-24 md:w-24">
        <path fill="#FFE7B0" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
      </svg>
      {/* warm candle lights */}
      {Array.from({ length: 16 }, (_, i) => {
        const size = 10 + Math.round(rnd() * 22);
        return (
          <div
            key={i}
            className={cn('theme-twinkle absolute rounded-full', i % 2 === 1 && 'hidden md:block')}
            style={{
              left: `${4 + rnd() * 90}%`,
              top: `${20 + rnd() * 45}%`,
              width: size,
              height: size,
              background: '#FFD58A',
              opacity: 0.7,
              boxShadow: `0 0 ${size * 1.5}px ${size / 2}px rgba(255,200,110,0.55)`,
              animationDelay: `-${(rnd() * 1.8).toFixed(1)}s`,
            }}
          />
        );
      })}
    </>
  );
}

const TAG_STYLE: Record<ThemeId, string> = {
  lunarnewyear: 'bg-[#E23A2E] text-[#FFD54A] left-[18px] top-[96px] md:left-10 md:top-[130px]',
  valentine: 'bg-ruchi-pink text-ruchi-ink left-[18px] top-[18px] md:left-10 md:top-10',
  easter: 'bg-ruchi-yellow text-ruchi-ink left-[18px] top-[18px] md:left-10 md:top-10',
  nationalday: 'bg-[#006AA7] text-[#FECC02] left-[18px] top-[18px] md:left-10 md:top-10',
  midsummer: 'bg-ruchi-cream text-ruchi-ink left-[18px] top-[84px] md:left-10 md:top-[96px]',
  midautumn: 'bg-ruchi-ink text-ruchi-cream left-[18px] top-[18px] md:left-10 md:top-10',
  kanelbulle: 'bg-[#A0612B] text-ruchi-cream left-[18px] top-[18px] md:left-10 md:top-10',
  halloween: 'bg-[#FF8A1F] text-ruchi-ink left-[112px] top-[18px] md:left-[170px] md:top-10',
  lucia: 'bg-ruchi-cream text-ruchi-ink left-[18px] top-[18px] md:left-10 md:top-10',
  christmas: 'bg-ruchi-ink text-ruchi-cream left-[18px] top-[84px] md:left-10 md:top-[110px]',
  newyear: 'bg-ruchi-ink text-ruchi-yellow left-[18px] top-[18px] md:left-10 md:top-10',
};

/** Colour of the "Open today" pill on the hero, per theme. */
export const THEME_PILL: Partial<Record<ThemeId, string>> = {
  halloween: 'bg-[#FF8A1F]',
  valentine: 'bg-ruchi-pink',
  nationalday: 'bg-[#FECC02]',
  lunarnewyear: 'bg-[#FFD54A]',
  kanelbulle: 'bg-[#F3C98B]',
};

const SCENES: Record<ThemeId, () => JSX.Element> = {
  lunarnewyear: LunarNewYear,
  valentine: Valentine,
  easter: Easter,
  nationalday: NationalDay,
  midsummer: Midsummer,
  midautumn: MidAutumn,
  kanelbulle: Kanelbulle,
  halloween: Halloween,
  lucia: Lucia,
  christmas: Christmas,
  newyear: NewYear,
};

/** Everything a seasonal theme adds on top of the hero photo. */
const HeroTheme = ({ theme }: { theme: ThemeId }) => {
  const Scene = SCENES[theme];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Scene />
      <div
        className={cn(
          'absolute inline-flex h-[34px] items-center rounded-full px-3.5 font-display text-xs font-extrabold tracking-[-0.01em] md:h-[42px] md:px-5 md:text-[15px]',
          TAG_STYLE[theme]
        )}
      >
        {THEME_TAG[theme]}
      </div>
    </div>
  );
};

export default HeroTheme;
