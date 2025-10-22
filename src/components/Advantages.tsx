import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import advantage1 from "@/assets/advantage-1.png";
import advantage2 from "@/assets/advantage-2.png";
import advantage3 from "@/assets/advantage-3.png";
import advantage4 from "@/assets/advantage-4.png";

const advantages = [
  {
    id: 1,
    image: advantage1,
    title: "Быть командой",
    description: "Готовность вносить вклад в общие цели команды и достигать их.",
  },
  {
    id: 2,
    image: advantage2,
    title: "Побеждать и не сдаваться",
    description: "Быть ориентированным на результат, настойчивым и не сдаваться перед трудностями.",
  },
  {
    id: 3,
    image: advantage3,
    title: "Заботиться о клиентах",
    description: "Выполнять обещания и интересоваться потребностями своих клиентов.",
  },
  {
    id: 4,
    image: advantage4,
    title: "Быть увлеченным и ответственным",
    description: "Вкладывать душу в работу и получать от работы удовольствие.",
  },
];

export const Advantages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % advantages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + advantages.length) % advantages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  return (
    <section id="advantages" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Наши ценности скажут о нас больше:
        </h2>

        {/* Desktop View - All Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="bg-card rounded-lg p-6 text-center card-shadow hover-lift"
            >
              <div className="w-full h-48 mb-6 flex items-center justify-center">
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View - Slider */}
        <div className="md:hidden mt-12 relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {advantages.map((advantage) => (
                <div
                  key={advantage.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-lg p-6 text-center card-shadow">
                    <div className="w-full h-48 mb-6 flex items-center justify-center">
                      <img
                        src={advantage.image}
                        alt={advantage.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2"
            onClick={nextSlide}
            disabled={currentIndex === advantages.length - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {advantages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
