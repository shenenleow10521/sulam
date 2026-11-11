'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'motion/react';

const motionQuery = '(prefers-reduced-motion: no-preference) and (any-hover: hover) and (any-pointer: fine)';

export default function PointerBackground({ active }: { active: boolean }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const presence = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 50, damping: 20 });
  const opacity = useSpring(presence, { stiffness: 55, damping: 19 });
  const background = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, rgba(220, 161, 89, .16), rgba(114, 160, 155, .07) 48%, transparent 90%)`;

  useEffect(() => {
    if (!active) return;
    const allowed = window.matchMedia(motionQuery);
    let tracking = false;

    function follow(event: PointerEvent) {
      if (!allowed.matches || event.pointerType === 'touch') return;
      if (!tracking) {
        x.jump(event.clientX);
        y.jump(event.clientY);
        tracking = true;
      }
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      presence.set(1);
    }

    function fade() {
      tracking = false;
      presence.set(0);
    }

    function onPointerOut(event: PointerEvent) {
      if (!event.relatedTarget) fade();
    }

    window.addEventListener('pointermove', follow, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', fade);
    allowed.addEventListener('change', fade);

    return () => {
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', fade);
      allowed.removeEventListener('change', fade);
      presence.set(0);
    };
  }, [active, pointerX, pointerY, presence, x, y]);

  return <motion.div className="pointer-background" aria-hidden="true" style={{ background, opacity }}/>;
}
