import { useEffect, useRef } from "react";
import value1 from "@/assets/value-1.png";
import value2 from "@/assets/value-2.png";
import value3 from "@/assets/value-3.png";
import value4 from "@/assets/value-4.png";
import value5 from "@/assets/value-5.png";

const advantages = [
  {
    id: 1,
    image: value1,
    title: "Быть командой",
    description: "Готовность вносить вклад в общие цели команды и достигать их.",
  },
  {
    id: 2,
    image: value2,
    title: "Побеждать и не сдаваться",
    description: "Быть ориентированным на результат, настойчивым и не сдаваться перед трудностями.",
  },
  {
    id: 3,
    image: value3,
    title: "Заботиться о клиентах",
    description: "Выполнять обещания и интересоваться потребностями своих клиентов.",
  },
  {
    id: 4,
    image: value4,
    title: "Быть увлеченным и ответственным",
    description: "Вкладывать душу в работу и получать от работы удовольствие.",
  },
  {
    id: 5,
    image: value5,
    title: "Развиваться",
    description: "Постоянно расти личностно и профессионально для достижения поставленных целей.",
  },
];

export const Advantages = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let scrollPosition = container.scrollLeft;

    const step = (timestamp: number) => {
      if (!container) return;

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (maxScroll > 0) {
        const pixelsPerMillisecond = 0.08;
        scrollPosition = (scrollPosition + pixelsPerMillisecond * delta) % maxScroll;
        container.scrollLeft = scrollPosition;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="advantages" className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
          Наши ценности скажут о нас больше
        </h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 text-base md:text-lg">
          Присмотрись к тому, что для нас важно, и узнай команду лучше через наши принципы.
        </p>

        <div className="relative -mx-8 sm:-mx-16 lg:-mx-24">
          <div className="pl-8 sm:pl-16 lg:pl-24 pr-8 sm:pr-16 lg:pr-24">
            <div ref={scrollRef} className="flex gap-8 md:gap-10 overflow-x-hidden pb-4">
              {[...advantages, ...advantages].map((advantage, index) => (
                <div
                  key={`${advantage.id}-${index}`}
                  className="flex-shrink-0 w-[20rem] sm:w-[22rem] md:w-[23rem]"
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-3xl px-6 py-8 h-full flex flex-col items-center md:items-start text-center md:text-left shadow-[var(--shadow-card)] transition-transform duration-500 ease-out">
                    <div className="w-full h-48 md:h-56 mb-6 flex items-center justify-center">
                      <img
                        src={advantage.image}
                        alt={advantage.title}
                        className="w-full h-full object-contain drop-shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground leading-snug">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
