import { useState } from "react";
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

  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const nextSlide = () => {
    if (activeIndex === null) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => ((prev || 0) + 1) % newsItems.length);
    }
  };

  const prevSlide = () => {
    if (activeIndex === null) {
      setActiveIndex(newsItems.length - 1);
    } else {
      setActiveIndex((prev) => ((prev || 0) - 1 + newsItems.length) % newsItems.length);
    }
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
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12">
          Живая лента
        </h2>

        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center gap-6 flex-wrap">
              {newsItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "w-full md:w-[calc(40%-12px)] scale-105"
                      : "w-full md:w-[calc(30%-12px)] scale-100"
                  }`}
                >
                  <div className="bg-card rounded-lg overflow-hidden card-shadow h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold mb-4 flex-grow text-foreground">
                        {item.title}
                      </h3>
                      {activeIndex === index && (
                        <p className="text-muted-foreground text-sm mb-4 animate-fade-in">
                          Подробная информация о данной статье. Узнайте больше о последних новостях и событиях.
                        </p>
                      )}
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Перейти к статье
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
