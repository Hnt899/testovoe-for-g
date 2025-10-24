import { Button } from "@/components/ui/button";
import logoHex from "@/assets/logo.png";

const navigation = [
  { label: "Профориентация", href: "#orientation" },
  { label: "Выбрать вакансии", href: "#vacancies" },
  { label: "Карьера в ГЭНДАЛЬФ", href: "#career" },
  { label: "Стажёры", href: "#interns" },
  { label: "Отзывы", href: "#feedback" },
];

export const Header = () => {
  const scrollToForm = () => {
    document.getElementById("interview-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-gradient-to-r from-cyan-300 via-sky-400 to-sky-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={logoHex} alt="Карьера в ГЭНДАЛЬФ" className="w-16 h-16 md:w-20 md:h-20 drop-shadow" />
            <div className="hidden sm:flex flex-col">
              <span className="uppercase tracking-[0.45em] text-xs font-semibold text-white/80">Gendalf</span>
              <span className="text-lg font-semibold leading-tight">Карьера мечты начинается здесь</span>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:text-base font-medium">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white/80"
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="outline"
              onClick={scrollToForm}
              className="border-transparent bg-white text-primary font-semibold shadow-none hover:bg-white/90"
            >
              Запись на собеседование
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
