import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Clock,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  X,
  CreditCard,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { SUBSCRIPTIONS, AI_TOOLS, WORKFLOWS, FAQS } from './data/mockData';

export default function App() {
  const [selectedSubTab, setSelectedSubTab] = useState<'all' | 'llm' | 'image' | 'video' | 'dev'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // WhatsApp checkout generator
  const getWhatsAppLink = (planName: string, price: number) => {
    const text = encodeURIComponent(`مرحباً فرج، أرغب في الاشتراك في باقة: ${planName} بسعر ${price} ج.م. ما هي خطوات الدفع؟`);
    return `https://wa.me/201000000000?text=${text}`;
  };

  const filteredSubscriptions = SUBSCRIPTIONS.filter(sub => {
    if (selectedSubTab === 'all') return true;
    return sub.category === selectedSubTab;
  });

  const searchResults = searchQuery.trim() === '' ? [] : [
    ...SUBSCRIPTIONS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tagline.includes(searchQuery)).map(s => ({ type: 'اشتراك', title: s.name, desc: s.tagline, link: '#store' })),
    ...AI_TOOLS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.includes(searchQuery)).map(t => ({ type: 'أداة', title: t.name, desc: t.description, link: t.link })),
    ...WORKFLOWS.filter(w => w.title.includes(searchQuery)).map(w => ({ type: 'Workflow', title: w.title, desc: w.description, link: '#workflows' }))
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* 1. Announcement Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-2.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-3 text-zinc-300">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>توفير الاشتراكات الرسمية في مصر بالجنيه المصري عبر InstaPay والمحافظ الإلكترونية</span>
        <a href="#store" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mr-1">
          تصفح الباقات &larr;
        </a>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-white">فرج</span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Farag</span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-400">
            <a href="#store" className="hover:text-zinc-200 transition-colors">الاشتراكات المتاحة</a>
            <a href="#tools" className="hover:text-zinc-200 transition-colors">دليل الأدوات</a>
            <a href="#workflows" className="hover:text-zinc-200 transition-colors">تدفقات العمل</a>
            <a href="#why-us" className="hover:text-zinc-200 transition-colors">معايير الخدمة</a>
            <a href="#faq" className="hover:text-zinc-200 transition-colors">الأسئلة الشائعة</a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:border-zinc-700 hover:text-zinc-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">بحث سريع...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 rounded border border-zinc-700 font-mono">⌘K</kbd>
            </button>

            {/* Currency Pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium">
              <span>EGP (جنيه مصري)</span>
            </div>

            {/* Direct WhatsApp Contact */}
            <a
              href={`https://wa.me/201000000000?text=${encodeURIComponent('مرحباً فرج، عندي استفسار عن خدمات الاشتراكات')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors active:scale-[0.98]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>محادثة واتساب</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="pt-16 pb-20 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Hero Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>تفعيل مباشر لاشتراكات وأدوات الذكاء الاصطناعي في مصر</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            اشتراكات الذكاء الاصطناعي الرسمية، <br />
            <span className="text-zinc-400">بالجنيه المصري وبدون بطاقة دولارية</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed font-normal mb-8">
            احصل على حسابات رسمية ومستقرة في <strong className="text-zinc-200 font-semibold">ChatGPT Plus، و Claude Pro، و Cursor، و Midjourney</strong> دون الحاجة لبطاقة دفع بالدولار، مع تفعيل سريع وضمان تشغيل كامل طوال الشهر.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto mb-16">
            <a
              href="#store"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>استعراض الباقات المتاحة</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a
              href="#tools"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>دليل الأدوات المجانية</span>
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-right">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="text-xs font-semibold text-zinc-500 mb-1">سرعة التسليم</div>
              <div className="text-lg font-bold text-zinc-100">خلال 5 - 15 دقيقة</div>
              <div className="text-xs text-zinc-400 mt-1">تفعيل مباشر بعد إتمام التحويل</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="text-xs font-semibold text-zinc-500 mb-1">طرق الدفع</div>
              <div className="text-lg font-bold text-zinc-100">InstaPay ومحافظ الهاتف</div>
              <div className="text-xs text-zinc-400 mt-1">دفع محلي ميسر بدون رسوم تدبير</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="text-xs font-semibold text-zinc-500 mb-1">الضمان التشغيلي</div>
              <div className="text-lg font-bold text-zinc-100">30 يوماً كاملة</div>
              <div className="text-xs text-zinc-400 mt-1">استبدال أو صيانة فورية عند أي عطل</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="text-xs font-semibold text-zinc-500 mb-1">الدعم الفني</div>
              <div className="text-lg font-bold text-zinc-100">متابعة عبر واتساب</div>
              <div className="text-xs text-zinc-400 mt-1">تواصل مستمر مع فريق الدعم</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Subscriptions Store Section */}
      <section id="store" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">متجر الاشتراكات</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              باقات الاشتراكات الرسمية بالجنيه المصري
            </h2>
            <p className="text-zinc-400 text-sm">
              اختر خطتك المناسبة واستلم بيانات الحساب مباشرة بعد الدفع عبر InstaPay أو المحافظ الإلكترونية.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 p-1 rounded-xl bg-zinc-900 border border-zinc-800 w-fit">
              <button
                onClick={() => setSelectedSubTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubTab === 'all' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                الكل
              </button>
              <button
                onClick={() => setSelectedSubTab('llm')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubTab === 'llm' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                نماذج لغوية (ChatGPT / Claude)
              </button>
              <button
                onClick={() => setSelectedSubTab('image')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubTab === 'image' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                توليد الصور
              </button>
              <button
                onClick={() => setSelectedSubTab('video')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubTab === 'video' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                الفيديو والأنيميشن
              </button>
              <button
                onClick={() => setSelectedSubTab('dev')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubTab === 'dev' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                البرمجة (Cursor)
              </button>
            </div>
          </div>

          {/* Subscriptions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`surface-card rounded-2xl p-6 flex flex-col justify-between relative ${
                  sub.isPopular ? 'border-zinc-700 bg-zinc-900/90' : ''
                }`}
              >
                {/* Badge */}
                {sub.badge && (
                  <div className="absolute top-5 left-5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {sub.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Monogram & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-mono text-sm font-bold text-zinc-200">
                      {sub.logoText}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                      <span className="text-xs text-zinc-400">{sub.planType}</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {sub.tagline}
                  </p>

                  {/* Price Box */}
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 mb-6 flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">
                        {sub.priceMonthly} <span className="text-xs font-normal text-zinc-400">ج.م / شهرياً</span>
                      </div>
                      {sub.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          السعر الرسمي: {sub.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ضمان 30 يوم
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">المواصفات والصلاحيات:</span>
                    {sub.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-zinc-800/80 pt-5">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {sub.deliveryTime}
                    </span>
                    <span className="text-zinc-500">InstaPay / Cash</span>
                  </div>

                  <a
                    href={getWhatsAppLink(sub.name, sub.priceMonthly)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>طلب الاشتراك وتأكيد الدفع</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Tools Directory */}
      <section id="tools" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">الدليل المرجعي</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                أبرز أدوات الذكاء الاصطناعي للمحترفين
              </h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              قائمة منتقاة ومحدثة لأقوى نماذج إنتاج المحتوى، البرمجة، والوسائط المتعددة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS.map((tool) => (
              <div key={tool.id} className="surface-card rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-xs font-mono font-bold text-zinc-200">
                        {tool.tag}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{tool.name}</h4>
                        <span className="text-xs text-zinc-400">{tool.category}</span>
                      </div>
                    </div>
                    {tool.badge && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                    <span className="text-emerald-400 font-bold">{tool.rating}</span>
                    <span className="text-zinc-500">({tool.pricing})</span>
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>زيارة الموقع الرسمي</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Workflows Section */}
      <section id="workflows" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">منهجيات العمل</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              تدفقات عمل مجربة لربط الأدوات وإنتاج المحتوى
            </h2>
            <p className="text-zinc-400 text-sm">
              إجراءات عملية تجمع بين أكثر من نموذج ذكاء اصطناعي للوصول إلى مخرجات جاهزة للنشر والتنفيذ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKFLOWS.map((wf) => (
              <div key={wf.id} className="surface-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-medium">
                      {wf.level}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {wf.timeEstimate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{wf.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {wf.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {wf.toolsUsed.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[11px] font-mono border border-zinc-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#store"
                    className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>عرض خطوات التدفق ({wf.stepsCount} خطوات)</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us / Service Standards */}
      <section id="why-us" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">معايير الخدمة</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              لماذا يختار المحترفون خدمات فرج؟
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center mb-5 text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">الدفع بالجنيه المصري</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                تجاوز عقبات حدود المعاملات الدولية بالبطاقات المصرفية. ادفع فوراً عبر InstaPay أو فودافون كاش دون رسوم تحويل إضافية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center mb-5 text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">تفعيل مباشر وسريع</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                إجراءات تسليم محددة ومنظمة، يتلقى العميل تفاصيل الحساب أو كود التفعيل خلال دقائق معدودة من تأكيد التحويل.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center mb-5 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ضمان استقرار كامل 30 يوماً</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                اشتراكات رسمية مستقرة مع التزام كامل بالضمان طوال مدة الاشتراك، ودعم فني متواجد عبر واتساب للتعامل مع أي استفسار.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-20 border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">الأسئلة الشائعة</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              إجابات عن أكثر الاستفسارات تكراراً
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="surface-card rounded-xl overflow-hidden border border-zinc-800 transition-colors cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <h4 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
                </div>
                {activeFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/201000000000?text=${encodeURIComponent('مرحباً فرج، أريد الاستفسار عن الباقات')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center gap-2.5 transition-colors active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-semibold text-xs sm:text-sm">تواصل مع الدعم الفني</span>
      </a>

      {/* 10. Search Modal Dialog */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-5 left-5 p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">البحث عن أداة أو اشتراك</h3>
            <div className="relative mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="اكتب اسم الاشتراك (مثال: ChatGPT, Claude, Midjourney)..."
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto space-y-1.5">
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <a
                    key={i}
                    href={res.link}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 rounded-lg bg-zinc-950/60 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-between text-right transition-colors block"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{res.title}</div>
                      <div className="text-xs text-zinc-400 line-clamp-1">{res.desc}</div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                      {res.type}
                    </span>
                  </a>
                ))
              ) : searchQuery ? (
                <div className="text-center py-6 text-zinc-400 text-xs">لا توجد نتائج مطابقة</div>
              ) : (
                <div className="text-center py-4 text-zinc-500 text-xs">اكتب كلمة البحث للاستعراض السريع</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 11. Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white">فرج</span>
                <span className="text-xs font-semibold text-zinc-500 tracking-wider">Farag</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                خدمات تفعيل واشتراكات أدوات الذكاء الاصطناعي للمطورين والمصممين في مصر بأسعار محلية مباشرة.
              </p>
            </div>
            <div>
              <h5 className="text-zinc-200 font-semibold text-xs mb-3">الاشتراكات المتاحة</h5>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#store" className="hover:text-zinc-200 transition-colors">ChatGPT Plus (شخصي ومفتوح)</a></li>
                <li><a href="#store" className="hover:text-zinc-200 transition-colors">Claude 3.5 Sonnet Pro</a></li>
                <li><a href="#store" className="hover:text-zinc-200 transition-colors">Midjourney Standard</a></li>
                <li><a href="#store" className="hover:text-zinc-200 transition-colors">Cursor AI Pro</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-zinc-200 font-semibold text-xs mb-3">روابط مباشرة</h5>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#tools" className="hover:text-zinc-200 transition-colors">دليل أدوات الذكاء الاصطناعي</a></li>
                <li><a href="#workflows" className="hover:text-zinc-200 transition-colors">تدفقات العمل (Workflows)</a></li>
                <li><a href="#faq" className="hover:text-zinc-200 transition-colors">الأسئلة الشائعة وسياسة الضمان</a></li>
                <li><a href="https://wa.me/201000000000" className="hover:text-zinc-200 transition-colors">التواصل مع الدعم الفني</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-zinc-200 font-semibold text-xs mb-3">وسائل الدفع المقبولة</h5>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-300">
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">إنستاباي (InstaPay)</span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">فودافون كاش</span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">أورنج / اتصالات كاش</span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">بطاقات بنكية</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} منصة فرج Farag. جميع الحقوق محفوظة.</p>
            <p>مبني باستخدام React و Tailwind CSS بتصميم سريع ومدروس.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
