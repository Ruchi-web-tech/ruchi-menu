import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from 'react';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

/**
 * Curved, looping marquee text (based on the React Bits Curved Loop).
 *
 * The SVG is drawn in real pixels (its viewBox matches the container's
 * actual width), so the font size set via `className` (e.g. text-[36px])
 * is the size you see on screen — on phones as well as on desktop.
 */
const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 100,
  direction = 'left',
  interactive = true,
}) => {
  // One copy of the text, always ending in a single non-breaking space
  const text = useMemo(
    () => marqueeText.replace(/\s+$/, '') + ' ',
    [marqueeText]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);

  const [width, setWidth] = useState(0); // container width in px
  const [fontSize, setFontSize] = useState(0); // rendered font size in px
  const [spacing, setSpacing] = useState(0); // length of one text copy in px

  const uid = useId();
  const pathId = `curve-${uid}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  // Measure container width, font size and text length.
  // Re-measures on resize (breakpoints change the font size) and once the
  // web font has loaded, so the loop length is always correct.
  useLayoutEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      const m = measureRef.current;
      if (!el || !m) return;
      setWidth(el.clientWidth);
      setFontSize(parseFloat(getComputedStyle(m).fontSize) || 0);
      setSpacing(m.getComputedTextLength());
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    document.fonts?.ready.then(measure);

    return () => ro.disconnect();
  }, [text, className]);

  const ready = width > 0 && spacing > 0 && fontSize > 0;

  // Geometry in real pixels
  const pad = fontSize * 0.25;
  const baseline = fontSize * 0.85 + pad;
  const height = Math.ceil(baseline + curveAmount + fontSize * 0.25 + pad);
  // The curve spans just past both screen edges, so the bend is visible
  // across the screen. Text starting before the path is simply not drawn.
  const edge = Math.max(40, width * 0.07);
  const pathD = `M${-edge},${baseline} Q${width / 2},${
    baseline + curveAmount * 2
  } ${width + edge},${baseline}`;

  // Enough copies to cover the whole curve plus one extra for wrapping
  const copies = spacing ? Math.ceil((width + spacing * 2) / spacing) + 2 : 1;
  const totalText = Array(copies).fill(text).join('');

  const wrap = (value: number) => {
    let v = value;
    while (v <= -spacing) v += spacing;
    while (v > 0) v -= spacing;
    return v;
  };

  const applyOffset = (value: number) => {
    offsetRef.current = wrap(value);
    textPathRef.current?.setAttribute('startOffset', `${offsetRef.current}px`);
  };

  // Animation loop — updates the SVG attribute directly (no React re-render
  // every frame).
  useEffect(() => {
    if (!ready) return;

    applyOffset(offsetRef.current || -spacing);

    let frame = 0;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        applyOffset(offsetRef.current + delta);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, spacing, speed]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    applyOffset(offsetRef.current + dx);
  };

  const endDrag = () => {
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    if (velRef.current !== 0) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{
        height: ready ? height : undefined,
        visibility: ready ? 'visible' : 'hidden',
        cursor: interactive ? 'grab' : 'auto',
        touchAction: interactive ? 'pan-y' : 'auto',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none block"
        width={width || '100%'}
        height={ready ? height : 0}
        viewBox={`0 0 ${width || 1} ${ready ? height : 1}`}
      >
        {/* Invisible copy used only for measuring — same classes as the real text */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={className}
          style={{ visibility: 'hidden', pointerEvents: 'none' }}
          x={0}
          y={-1000}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className={`fill-current ${className ?? ''}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offsetRef.current}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
