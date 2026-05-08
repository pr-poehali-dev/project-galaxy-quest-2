import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExport } from "@/hooks/use-export";
import Icon from "@/components/ui/icon";

const circulationData = [
  { year: "2015", total: 450, fiction: 112 },
  { year: "2016", total: 432, fiction: 104 },
  { year: "2017", total: 418, fiction: 98 },
  { year: "2018", total: 395, fiction: 89 },
  { year: "2019", total: 376, fiction: 81 },
  { year: "2020", total: 340, fiction: 71 },
  { year: "2021", total: 352, fiction: 69 },
  { year: "2022", total: 318, fiction: 60 },
  { year: "2023", total: 301, fiction: 55 },
  { year: "2024", total: 287, fiction: 51 },
];

const genreData = [
  { genre: "Детектив", value: 28 },
  { genre: "Фантастика", value: 22 },
  { genre: "Классика", value: 18 },
  { genre: "Современ. проза", value: 16 },
  { genre: "Романтика", value: 10 },
  { genre: "Прочее", value: 6 },
];

const formatData = [
  { name: "Бумажные", value: 62, color: "#1a1a2e" },
  { name: "Электронные", value: 26, color: "#4a4e69" },
  { name: "Аудиокниги", value: 12, color: "#9a8c98" },
];

const authorData = [
  { year: "2015", domestic: 68, foreign: 32 },
  { year: "2017", domestic: 65, foreign: 35 },
  { year: "2019", domestic: 60, foreign: 40 },
  { year: "2021", domestic: 57, foreign: 43 },
  { year: "2023", domestic: 52, foreign: 48 },
  { year: "2024", domestic: 49, foreign: 51 },
];

const allDataForCSV = circulationData.map((row) => {
  const author = authorData.find((a) => a.year === row.year);
  return {
    year: row.year,
    total: row.total,
    fiction: row.fiction,
    domestic: author?.domestic ?? "",
    foreign: author?.foreign ?? "",
  };
});

export default function Featured() {
  const { exportCSV, exportPDF, exportingPdf } = useExport();

  function handleExportCSV() {
    exportCSV(
      allDataForCSV,
      "книжный-рынок-2015-2024.csv",
      {
        year: "Год",
        total: "Общий тираж (млн экз.)",
        fiction: "Худ. литература (млн экз.)",
        domestic: "Отечественные авторы (%)",
        foreign: "Зарубежные авторы (%)",
      }
    );
    exportCSV(
      genreData,
      "жанры-2024.csv",
      { genre: "Жанр", value: "Доля (%)" }
    );
    exportCSV(
      formatData.map(({ name, value }) => ({ name, value })),
      "форматы-2024.csv",
      { name: "Формат", value: "Доля (%)" }
    );
  }

  function handleExportPDF() {
    exportPDF("dashboard-content", "аналитика-книжного-рынка-2024.pdf");
  }

  return (
    <div id="dashboard" className="bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="uppercase text-xs tracking-[0.3em] text-neutral-500 mb-3">Дашборд · 2015–2024</p>
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              Аналитика рынка<br />в реальных данных
            </h2>
            <p className="text-neutral-500 max-w-2xl text-lg">
              Комплексный мониторинг ключевых показателей художественной литературы России:
              тиражи, жанры, форматы и соотношение авторов.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-sm px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
            >
              <Icon name="Table" size={15} />
              Скачать CSV
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exportingPdf}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 disabled:opacity-60 text-white text-sm px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
            >
              {exportingPdf ? (
                <Icon name="Loader2" size={15} className="animate-spin" />
              ) : (
                <Icon name="FileDown" size={15} />
              )}
              {exportingPdf ? "Создаю PDF..." : "Скачать PDF"}
            </button>
          </div>
        </div>

        <div id="dashboard-content" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <h3 className="font-semibold text-neutral-800 mb-1">Динамика тиражей</h3>
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-6">Млн экземпляров · Общий vs Худ. литература</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={circulationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  formatter={(value: number, name: string) => [
                    `${value} млн экз.`,
                    name === "total" ? "Всего" : "Художественная",
                  ]}
                />
                <Legend formatter={(value) => (value === "total" ? "Всего" : "Художественная")} />
                <Line type="monotone" dataKey="total" stroke="#1a1a2e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fiction" stroke="#9a8c98" strokeWidth={2} dot={false} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <h3 className="font-semibold text-neutral-800 mb-1">Соотношение авторов</h3>
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-6">Отечественные vs Зарубежные · %</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={authorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === "domestic" ? "Отечественные" : "Зарубежные",
                  ]}
                />
                <Legend formatter={(value) => (value === "domestic" ? "Отечественные" : "Зарубежные")} />
                <Bar dataKey="domestic" fill="#1a1a2e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="foreign" fill="#9a8c98" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <h3 className="font-semibold text-neutral-800 mb-1">Структура по жанрам</h3>
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-6">Доля тиража · 2024</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={genreData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
                <YAxis dataKey="genre" type="category" tick={{ fontSize: 11 }} width={110} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => [`${value}%`, "Доля"]}
                />
                <Bar dataKey="value" fill="#1a1a2e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <h3 className="font-semibold text-neutral-800 mb-1">Форматы изданий</h3>
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-6">Доля рынка · 2024</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={formatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {formatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center mt-2">
              {formatData.map((f) => (
                <div key={f.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: f.color }} />
                  <span className="text-xs text-neutral-600">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
