interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-wide font-semibold">
          КнигоАналитика
        </div>
        <nav className="flex gap-8">
          <a
            href="#dashboard"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm"
          >
            Дашборд
          </a>
          <a
            href="#forecast"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm"
          >
            Прогнозы
          </a>
          <a
            href="#about"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm"
          >
            Методология
          </a>
        </nav>
      </div>
    </header>
  );
}
