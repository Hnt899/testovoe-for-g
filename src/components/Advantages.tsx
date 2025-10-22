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
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const animateScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        }
        
        scrollContainer.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(animateScroll);
    };

    const animation = requestAnimationFrame(animateScroll);
    
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section id="advantages" className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          Наши ценности скажут о нас больше:
        </h2>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {[...advantages, ...advantages].map((advantage, index) => (
            <div
              key={`${advantage.id}-${index}`}
              className="flex-shrink-0 w-64 text-center"
            >
              <div className="w-full h-48 mb-4 flex items-center justify-center">
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
