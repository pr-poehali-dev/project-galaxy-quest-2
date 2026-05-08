import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const forecastData = [
  { scenario: "Оптимистичный", description: "При господдержке и субсидиях", share2030: "22%", color: "text-emerald-300" },
  { scenario: "Базовый", description: "Текущие тенденции сохраняются", share2030: "14%", color: "text-yellow-300" },
  { scenario: "Пессимистичный", description: "Без мер государственной поддержки", share2030: "9%", color: "text-red-300" },
];

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      id="forecast"
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="/images/spiral-circles.jpg"
            alt="Прогнозные модели"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>
      </div>

      <h3 className="absolute top-12 right-6 text-white/70 uppercase z-10 text-sm md:text-base tracking-widest">
        Прогноз · 2025–2030
      </h3>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <p className="text-neutral-400 uppercase text-xs tracking-[0.3em] mb-4">Сценарный анализ</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 leading-tight">
          Три сценария будущего
          <br />
          <span className="text-neutral-400">книжного рынка</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forecastData.map((item) => (
            <div key={item.scenario} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.share2030}</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Доля в 2030</div>
              <div className="text-white font-semibold text-lg mb-2">{item.scenario}</div>
              <div className="text-neutral-400 text-sm">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="absolute bottom-12 left-6 text-white/50 text-sm z-10 max-w-sm">
        Модели построены на основе данных Роспечати и Российской книжной палаты
      </p>
    </div>
  );
}
