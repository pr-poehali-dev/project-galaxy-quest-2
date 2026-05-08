import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { label: "Тираж худ. литературы", value: "↓42%", sub: "за 10 лет" },
  { label: "Доля в общем тираже", value: "18%", sub: "в 2024 году" },
  { label: "Новых изданий", value: "12 400", sub: "названий в год" },
  { label: "Средняя цена", value: "↑3.2×", sub: "с 2015 года" },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Аналитика книжного рынка"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6 w-full max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] mb-4 text-neutral-300 opacity-90">
          Аналитический инструмент · Российский книжный рынок
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          ДЕФИЦИТ
          <br />
          <span className="text-neutral-300">ХУДОЖЕСТВЕННОЙ</span>
          <br />
          ЛИТЕРАТУРЫ
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto opacity-80 mb-12">
          Интерактивный дашборд для издателей, аналитиков и государственных органов.
          Данные 2015–2025 с прогнозом до 2030 года.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-xs text-neutral-300 uppercase tracking-wide">{m.label}</div>
              <div className="text-xs text-neutral-400 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
