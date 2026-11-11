'use client';

import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowDown, Play } from 'lucide-react';

const coverEase = [.22, 1, .36, 1] as const;
const facts = [
  ['Proposed partner', 'SHELTER Home For Children'],
  ['Workshop', 'Five activities in one morning'],
  ['Proposed hours', '9:00 AM – 12:30 PM'],
];

export default function WorkshopCover({
  presentation,
  onPresent,
  onExplore,
}: {
  presentation: boolean;
  onPresent: () => void;
  onExplore: () => void;
}) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const followX = useSpring(pointerX, { stiffness: 76, damping: 23 });
  const followY = useSpring(pointerY, { stiffness: 76, damping: 23 });
  const x = useTransform(followX, [-.5, .5], [-6, 6]);
  const y = useTransform(followY, [-.5, .5], [-6, 6]);

  const reveal = {
    initial: reduced ? false as const : { opacity: .54, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5);
  }

  return (
    <div className="workshop-cover">
      <div className="cover-grid">
        <div className="cover-copy">
          <motion.p className="cover-kicker" {...reveal} transition={{ duration: .38, ease: coverEase }}>
            Universiti Malaya · SULAM
          </motion.p>
          <motion.h1 {...reveal} transition={{ duration: .56, delay: .04, ease: coverEase }}>
            AI for <em>Everyone.</em>
          </motion.h1>
          <motion.div className="cover-description" {...reveal} transition={{ duration: .5, delay: .12, ease: coverEase }}>
            <p className="cover-lead">A first step into AI for young learners.</p>
            <p>In this proposed workshop with SHELTER Home For Children, participants will try AI tools, practise checking answers and learn what to keep private.</p>
          </motion.div>
          {presentation ? (
            <p className="cover-course">WIX2001 · OCC 14 · Group 3</p>
          ) : (
            <motion.div className="cover-actions" {...reveal} transition={{ duration: .48, delay: .20, ease: coverEase }}>
              <button className="cover-present" onClick={onPresent}><Play size={15} fill="currentColor"/> Present proposal <span>8 min</span></button>
              <button className="cover-explore" onClick={onExplore}>Explore the workshop <ArrowDown size={17}/></button>
            </motion.div>
          )}
        </div>
        <motion.figure className="cover-figure" {...reveal} transition={{ duration: .65, delay: .08, ease: coverEase }}>
          <div className="cover-image-frame" onPointerMove={followPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
            <motion.img
              src={`${import.meta.env.BASE_URL}images/ai-workshop-cover.webp`}
              alt="Illustration of children working around a shared laptop with a university student facilitator"
              style={reduced ? undefined : { x, y }}
              fetchPriority={presentation ? 'auto' : 'high'}
              width={1448}
              height={1086}
            />
          </div>
          <figcaption>Illustration of the proposed workshop</figcaption>
        </motion.figure>
      </div>
      <motion.dl className="cover-facts" {...reveal} transition={{ duration: .5, delay: .23, ease: coverEase }}>
        {facts.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
