import { useState } from "react";
import type { FocusEvent, TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";

const newsItems = [
  {
    id: 1,
    image: news1,
    title: "Экономим на бумаге и угадываем фильмы: дайджест видео марта 2022 года",
  },
  {
    id: 2,
    image: news2,
    title: "Изменения 2022 года",
  },
  {
    id: 3,
    image: news3,
    title: "Почему стоит работать программистом в 2022 году",
  },
  {
    id: 4,
    image: news4,
    title: "Автоматизированный УСН и путевые листы: дайджест новостей за март 2022.",
  },
];

export const NewsFeed = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => {
      if (prev === null) {
        return 0;
      }
      return (prev + 1) % newsItems.length;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prev) => {
      if (prev === null) {
        return newsItems.length - 1;
      }
      return (prev - 1 + newsItems.length) % newsItems.length;
    });
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
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

  const handleArticleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveIndex(null);
    }
  };

  const handleButtonBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) {
      setActiveIndex(null);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12">
          Живая лента
        </h2>

        <div className="relative">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {newsItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <article
                  key={item.id}
                  className={`group h-full transition-transform duration-500 ease-out ${
                    isActive ? "-translate-y-1.5" : "translate-y-0"
                  }`}
                  tabIndex={0}
                  onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={handleArticleBlur}
                >
                  <div
                    className={`rounded-2xl overflow-hidden h-full flex flex-col shadow-[var(--shadow-card)] transition-all duration-500 ${
                      isActive ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-transparent"
                    }`}
                  >
                    <div className="h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-foreground leading-snug flex-1">
                        {item.title}
                      </h3>
                      <div
                        className={`text-muted-foreground text-sm transition-opacity duration-500 ease-out min-h-[88px] ${
                          isActive ? "opacity-100 mt-3" : "opacity-0"
                        }`}
                        aria-hidden={!isActive}
                      >
                        Подробная информация о данной статье. Узнайте больше о последних новостях и событиях.
                      </div>
                      <Button
                        variant="outline"
                        className="mt-6 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onFocus={() => setActiveIndex(index)}
                        onBlur={handleButtonBlur}
                      >
                        Перейти к статье
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            aria-label="Показать предыдущую новость"
            className="absolute left-[-3.5rem] top-1/2 -translate-y-1/2 bg-background z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Показать следующую новость"
            className="absolute right-[-3.5rem] top-1/2 -translate-y-1/2 bg-background z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
