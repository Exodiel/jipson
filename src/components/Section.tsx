'use client';
import { sectionSlice, useDispatch } from '@/lib/redux';
import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Section({ children, id, className }: { children: React.ReactNode; id: string; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ref.current) return;
    if (isInView) {
      dispatch(sectionSlice.actions.setVisible({ key: ref.current.id }));
    } else {
      dispatch(sectionSlice.actions.setHidden({ key: ref.current.id }));
    }
  }, [ref, isInView, dispatch]);

  return (
    <section id={id} ref={ref} className={clsx('mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 py-6 text-white', className)}>
      {children}
    </section>
  );
}
