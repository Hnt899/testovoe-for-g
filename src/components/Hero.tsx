import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-office.jpg";

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("interview-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAdvantages = () => {
    document.getElementById("advantages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Добро пожаловать<br />в ГЭНДАЛЬФ!
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
          Мы готовы поделиться секретом, почему любим компанию,
          в которой работаем. Если тебе будут близки наши ценности и идеи,
          то смело записывайся на собеседование!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="hero"
            onClick={scrollToAdvantages}
            className="min-w-[200px]"
          >
            Почему мы
          </Button>
          <Button 
            size="lg" 
            variant="heroOutline"
            onClick={scrollToForm}
            className="min-w-[200px]"
          >
            Записаться на собеседование
          </Button>
        </div>
      </div>

    </section>
  );
};
