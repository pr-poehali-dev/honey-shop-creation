import { useState } from "react";
import Icon from "@/components/ui/icon";

const HONEY_IMAGE = "https://cdn.poehali.dev/projects/280aa30f-98c2-466b-af62-1adb1760ecc2/files/b4011cc7-71f8-425f-a192-6389c34b4302.jpg";
const MEADOW_IMAGE = "https://cdn.poehali.dev/projects/280aa30f-98c2-466b-af62-1adb1760ecc2/files/0e704aab-1768-4865-b479-e9610a5b92b3.jpg";

const products = [
  { id: 1, name: "Липовый мёд", type: "Цветочный", origin: "Башкортостан", price: 490, weight: "500 г", desc: "Нежный аромат липового цвета, светло-янтарный оттенок. Собран в период цветения липы." },
  { id: 2, name: "Гречишный мёд", type: "Монофлорный", origin: "Алтай", price: 540, weight: "500 г", desc: "Тёмный, насыщенный вкус с характерной горчинкой. Богат железом и аминокислотами." },
  { id: 3, name: "Акациевый мёд", type: "Монофлорный", origin: "Краснодарский край", price: 620, weight: "500 г", desc: "Прозрачный, почти бесцветный. Долго не засахаривается, мягкий вкус." },
  { id: 4, name: "Разнотравье", type: "Цветочный", origin: "Алтай", price: 420, weight: "500 г", desc: "Сбор с луговых трав высокогорного Алтая. Богатый букет ароматов." },
  { id: 5, name: "Таёжный мёд", type: "Таёжный", origin: "Сибирь", price: 690, weight: "500 г", desc: "Собран с дикоросов тайги. Тёмный, смолистый аромат, глубокий вкус." },
  { id: 6, name: "Подсолнечниковый", type: "Монофлорный", origin: "Краснодарский край", price: 360, weight: "500 г", desc: "Золотистый, быстро кристаллизуется. Лёгкий вкус с ореховыми нотками." },
  { id: 7, name: "Горный мёд", type: "Таёжный", origin: "Алтай", price: 780, weight: "250 г", desc: "Редкий горный сбор с высоты 1500 метров. Уникальный состав горных трав." },
  { id: 8, name: "Клеверный мёд", type: "Цветочный", origin: "Башкортостан", price: 470, weight: "500 г", desc: "Белёсый, нежный. Традиционный вкус натурального мёда с ванильным послевкусием." },
];

const typeOptions = ["Все", "Цветочный", "Монофлорный", "Таёжный"];
const originOptions = ["Все", "Алтай", "Башкортостан", "Краснодарский край", "Сибирь"];
const priceRanges = [
  { label: "Все", min: 0, max: Infinity },
  { label: "до 450 ₽", min: 0, max: 450 },
  { label: "450–600 ₽", min: 450, max: 600 },
  { label: "от 600 ₽", min: 600, max: Infinity },
];

type Section = "home" | "catalog" | "about";

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [filterType, setFilterType] = useState("Все");
  const [filterOrigin, setFilterOrigin] = useState("Все");
  const [filterPrice, setFilterPrice] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = products.filter((p) => {
    const typeOk = filterType === "Все" || p.type === filterType;
    const originOk = filterOrigin === "Все" || p.origin === filterOrigin;
    const range = priceRanges[filterPrice];
    const priceOk = p.price >= range.min && p.price < range.max;
    return typeOk && originOk && priceOk;
  });

  const navTo = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream font-golos text-dark">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-honey-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navTo("home")} className="font-cormorant text-2xl font-semibold tracking-wide text-dark hover:text-honey-600 transition-colors">
            МедовЪ
          </button>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {(["home", "catalog", "about"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => navTo(s)}
                className={`pb-0.5 transition-all duration-200 ${
                  section === s
                    ? "text-honey-600 border-b border-honey-500"
                    : "text-dark/60 hover:text-dark"
                }`}
              >
                {s === "home" ? "Главная" : s === "catalog" ? "Каталог" : "О продукции"}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-cream border-t border-honey-200/60 px-6 py-4 flex flex-col gap-4">
            {(["home", "catalog", "about"] as Section[]).map((s) => (
              <button key={s} onClick={() => navTo(s)} className={`text-left text-sm font-medium ${section === s ? "text-honey-600" : "text-dark/70"}`}>
                {s === "home" ? "Главная" : s === "catalog" ? "Каталог" : "О продукции"}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ───── HOME ───── */}
        {section === "home" && (
          <div>
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${MEADOW_IMAGE})` }}
              />
              <div className="absolute inset-0 bg-dark/40" />
              <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                <p className="text-sm font-medium tracking-[0.25em] text-honey-200 uppercase mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  Натуральный фермерский мёд
                </p>
                <h1 className="font-cormorant text-6xl md:text-8xl font-light text-white leading-[0.95] mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
                  Чистый вкус<br /><em className="italic font-light text-honey-300">природы</em>
                </h1>
                <p className="text-white/70 text-lg max-w-md leading-relaxed mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  Мёд с пасек Алтая, Башкортостана и Сибири — без добавок, нагрева и примесей.
                </p>
                <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.55s" }}>
                  <button
                    onClick={() => navTo("catalog")}
                    className="bg-honey-500 hover:bg-honey-600 text-white px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200"
                  >
                    Смотреть каталог
                  </button>
                  <button
                    onClick={() => navTo("about")}
                    className="border border-white/50 hover:border-white text-white px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200"
                  >
                    О продукции
                  </button>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
                <Icon name="ChevronDown" size={20} />
              </div>
            </section>

            <section className="bg-honey-500 text-white py-5">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: "Leaf", text: "100% натуральный" },
                  { icon: "MapPin", text: "Прямо с пасеки" },
                  { icon: "FlaskConical", text: "Без добавок" },
                  { icon: "Package", text: "Доставка по России" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center justify-center gap-2 text-sm font-medium">
                    <Icon name={f.icon as "Leaf"} size={16} />
                    {f.text}
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs tracking-[0.2em] text-honey-600 uppercase font-medium mb-2">Выбор покупателей</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl font-light">Популярные сорта</h2>
                </div>
                <button onClick={() => navTo("catalog")} className="hidden md:flex items-center gap-1.5 text-sm text-honey-600 hover:text-honey-700 font-medium transition-colors">
                  Весь каталог <Icon name="ArrowRight" size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((p, i) => (
                  <ProductCard key={p.id} product={p} delay={i * 0.1} onClick={() => navTo("catalog")} />
                ))}
              </div>
            </section>

            <section className="mx-6 md:mx-auto max-w-6xl mb-20 relative overflow-hidden bg-dark text-white p-10 md:p-16">
              <div className="relative z-10">
                <h2 className="font-cormorant text-4xl md:text-5xl font-light mb-4">Прямо с пасеки<br /><em className="text-honey-300">— к вашему столу</em></h2>
                <p className="text-white/60 max-w-md mb-8 leading-relaxed">Сотрудничаем с небольшими семейными пасеками. Каждая партия проходит проверку качества.</p>
                <button onClick={() => navTo("catalog")} className="bg-honey-500 hover:bg-honey-400 text-white px-8 py-3.5 text-sm font-medium tracking-wide transition-colors">
                  Выбрать мёд
                </button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-gradient-to-l from-honey-400 to-transparent" />
            </section>
          </div>
        )}

        {/* ───── CATALOG ───── */}
        {section === "catalog" && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-honey-600 uppercase font-medium mb-2">Весь ассортимент</p>
              <h1 className="font-cormorant text-4xl md:text-5xl font-light">Каталог мёда</h1>
            </div>

            <div className="bg-white border border-honey-100 p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-dark/40 font-medium mb-3">Тип мёда</p>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                        filterType === t ? "bg-honey-500 border-honey-500 text-white" : "border-honey-200 text-dark/60 hover:border-honey-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-dark/40 font-medium mb-3">Происхождение</p>
                <div className="flex flex-wrap gap-2">
                  {originOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setFilterOrigin(o)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                        filterOrigin === o ? "bg-honey-500 border-honey-500 text-white" : "border-honey-200 text-dark/60 hover:border-honey-400"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-dark/40 font-medium mb-3">Цена</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setFilterPrice(i)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                        filterPrice === i ? "bg-honey-500 border-honey-500 text-white" : "border-honey-200 text-dark/60 hover:border-honey-400"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-dark/40 mb-6">
              Найдено: <span className="text-dark font-medium">{filtered.length}</span> позиций
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} delay={i * 0.05} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-dark/30">
                <Icon name="PackageOpen" size={40} className="mx-auto mb-4 opacity-30" />
                <p className="font-cormorant text-2xl">Ничего не найдено</p>
                <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        )}

        {/* ───── ABOUT ───── */}
        {section === "about" && (
          <div>
            <section className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-xs tracking-[0.2em] text-honey-600 uppercase font-medium mb-2">Наш подход</p>
              <h1 className="font-cormorant text-5xl md:text-6xl font-light mb-6 leading-tight">
                Честный продукт<br /><em className="text-honey-600 italic">без компромиссов</em>
              </h1>
              <div className="w-12 h-px bg-honey-400 mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                <div>
                  <img src={HONEY_IMAGE} alt="Мёд" className="w-full aspect-square object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-cormorant text-3xl font-light mb-5">Прямо с пасеки</h2>
                  <p className="text-dark/60 leading-relaxed mb-4">
                    Мы работаем напрямую с небольшими семейными пасеками в Башкортостане, на Алтае и в Сибири. Никаких посредников — только прямые поставки.
                  </p>
                  <p className="text-dark/60 leading-relaxed mb-8">
                    Каждая партия проходит лабораторный контроль на соответствие ГОСТ. Мёд не нагревается выше 40°C, что сохраняет все ферменты и полезные вещества.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { num: "12+", label: "лет на рынке" },
                      { num: "8", label: "партнёрских пасек" },
                      { num: "100%", label: "натуральный состав" },
                      { num: "ГОСТ", label: "сертификация" },
                    ].map((s) => (
                      <div key={s.label} className="border-l-2 border-honey-300 pl-4">
                        <p className="font-cormorant text-3xl text-honey-600 font-medium">{s.num}</p>
                        <p className="text-xs text-dark/50 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="font-cormorant text-4xl font-light mb-10 text-center">Как мы работаем</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Сбор", desc: "Пчеловоды собирают мёд в сезон цветения каждого растения" },
                  { step: "02", title: "Контроль", desc: "Лабораторный анализ каждой партии перед отправкой" },
                  { step: "03", title: "Фасовка", desc: "Мёд разливается при температуре не выше 40°C" },
                  { step: "04", title: "Доставка", desc: "Отправляем по всей России в течение 2–3 рабочих дней" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <p className="font-cormorant text-5xl text-honey-200 font-light mb-3">{s.step}</p>
                    <h3 className="font-cormorant text-xl font-medium mb-2">{s.title}</h3>
                    <p className="text-sm text-dark/50 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-honey-50 border-y border-honey-100 py-16 text-center">
              <h2 className="font-cormorant text-4xl font-light mb-4">Готовы попробовать?</h2>
              <p className="text-dark/50 mb-8 max-w-sm mx-auto">Выберите свой сорт мёда из нашего каталога</p>
              <button onClick={() => navTo("catalog")} className="bg-honey-500 hover:bg-honey-600 text-white px-10 py-4 text-sm font-medium tracking-wide transition-colors">
                Перейти в каталог
              </button>
            </section>
          </div>
        )}

        <footer className="border-t border-honey-200/60 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-cormorant text-xl font-semibold text-dark/70">МедовЪ</span>
            <p className="text-xs text-dark/30">© 2024 — Натуральный мёд с фермерских пасек России</p>
            <div className="flex gap-6">
              {(["home", "catalog", "about"] as Section[]).map((s) => (
                <button key={s} onClick={() => navTo(s)} className="text-xs text-dark/40 hover:text-honey-600 transition-colors">
                  {s === "home" ? "Главная" : s === "catalog" ? "Каталог" : "О нас"}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    type: string;
    origin: string;
    price: number;
    weight: string;
    desc: string;
  };
  delay?: number;
  onClick?: () => void;
}

function ProductCard({ product, delay = 0, onClick }: ProductCardProps) {
  return (
    <div
      className="group bg-white border border-honey-100 hover:border-honey-300 transition-all duration-300 hover:shadow-md opacity-0 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div className="aspect-square bg-honey-50 overflow-hidden relative">
        <img
          src={HONEY_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2 py-1 text-dark/60">
          {product.type}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-cormorant text-xl font-medium leading-tight">{product.name}</h3>
          <span className="text-honey-600 font-semibold text-sm ml-2 whitespace-nowrap">{product.price} ₽</span>
        </div>
        <p className="text-xs text-dark/40 mb-2 flex items-center gap-1">
          <Icon name="MapPin" size={11} />
          {product.origin} · {product.weight}
        </p>
        <p className="text-xs text-dark/50 leading-relaxed line-clamp-2">{product.desc}</p>
        <button className="mt-4 w-full border border-honey-400 text-honey-700 hover:bg-honey-500 hover:text-white hover:border-honey-500 py-2.5 text-xs font-medium tracking-wide transition-all duration-200">
          В корзину
        </button>
      </div>
    </div>
  );
}
