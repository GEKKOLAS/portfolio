"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  description: string;
  title: string;
  subtitle: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  interface AutoAdvanceProps {
    current: number;
    setCurrent: (index: number) => void;
    slidesLength: number;
    interval?: number;
  }

  const AutoAdvance = ({
    current,
    setCurrent,
    slidesLength,
    interval = 7000,
  }: AutoAdvanceProps) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrent((current + 1) % slidesLength);
      }, interval);
      return () => clearTimeout(timer);
    }, [current, setCurrent, slidesLength, interval]);

    return null;
  };

  return (
    <section className="w-full py-8 sm:py-10 lg:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-white/70 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-500">Services</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Capabilities shaped for digital products and execution.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[280px] sm:min-h-[340px]">
            <AutoAdvance
              current={active}
              setCurrent={setActive}
              slidesLength={testimonials.length}
            />
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.95, rotate: randomRotateY(), y: 20 }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.25,
                    scale: isActive(index) ? 1 : 0.92,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    y: isActive(index) ? 0 : 16,
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                  }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.title}
                    width={1200}
                    height={700}
                    draggable={true}
                    className="h-full w-full rounded-[1.5rem] border border-white/15 object-cover object-center shadow-[0_20px_60px_-24px_rgba(0,0,0,0.45)]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-5 rounded-[1.5rem] border border-white/10 bg-zinc-950/5 p-5 dark:bg-white/5">
            <motion.div
              key={active}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                {testimonials[active].title}
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-fuchsia-500/85">
                {testimonials[active].subtitle}
              </p>
              <motion.p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {testimonials[active].description
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut", delay: 0.02 * index }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
              </motion.p>
            </motion.div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/70 transition-colors hover:border-fuchsia-300 hover:bg-fuchsia-50 dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-700"
              >
                <IconArrowLeft className="h-5 w-5 text-zinc-700 transition-transform duration-300 group-hover/button:rotate-12 dark:text-zinc-300" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/70 transition-colors hover:border-fuchsia-300 hover:bg-fuchsia-50 dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-700"
              >
                <IconArrowRight className="h-5 w-5 text-zinc-700 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
