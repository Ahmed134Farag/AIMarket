export interface Subscription {
  id: string;
  name: string;
  tagline: string;
  category: 'llm' | 'image' | 'video' | 'dev';
  priceMonthly: number;
  originalPrice?: number;
  planType: 'شخصي بالكامل (Personal)' | 'مشترك خاص (Shared)';
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
  deliveryTime: string;
  logoText: string;
  badge?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'توليد الصور' | 'توليد الفيديو' | 'نماذج وبرمجة' | 'صوت وموسيقى';
  description: string;
  pricing: 'مجاني / مدفوع' | 'مدفوع بالكامل' | 'تجربة مجانية';
  rating: number;
  badge?: string;
  tag: string;
  link: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  timeEstimate: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  toolsUsed: string[];
  description: string;
  stepsCount: number;
}

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'chatgpt-personal',
    name: 'ChatGPT Plus',
    tagline: 'وصول رسمي غير محدود لـ GPT-4o و Canvas مع توليد الصور وميزات التحليل المتقدم.',
    category: 'llm',
    priceMonthly: 1150,
    originalPrice: 1450,
    planType: 'شخصي بالكامل (Personal)',
    isPopular: true,
    features: [
      'وصول مباشر لـ GPT-4o ونموذج التفكير o1',
      'توليد وتعديل الصور بدقة DALL-E 3',
      'مساحة العمل التفاعلية Canvas لكتابة الأكواد والنصوص',
      'تحليل البيانات المتقدم ورفع المستندات',
      'تفعيل مباشر على بريدك الإلكتروني الشخصي'
    ],
    deliveryTime: 'خلال 5 - 15 دقيقة',
    logoText: 'GPT',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    tagline: 'النموذج المتقدم في البرمجة الدقيقة والتحليل المعقد مع Sonnet 3.7 و Artifacts.',
    category: 'llm',
    priceMonthly: 1150,
    originalPrice: 1400,
    planType: 'شخصي بالكامل (Personal)',
    isBestValue: true,
    features: [
      'وصول كامل لـ Claude 3.5 Sonnet و Haiku',
      'سياق استيعاب ضخم (200K Tokens) لقراءة مشاريع برمجية كاملة',
      'ميزة Artifacts لمعاينة وتشغيل الأكواد والواجهات فورياً',
      'أعلى سقف استخدام يومي للحسابات الرسمية',
      'حساب شخصي مستقل بالكامل طوال فترة الاشتراك'
    ],
    deliveryTime: 'خلال 10 دقائق',
    logoText: 'CLD',
    badge: 'اختيار المطورين'
  },
  {
    id: 'midjourney-pro',
    name: 'Midjourney Standard',
    tagline: 'الأداة القياسية عالمياً في تصميم وتوليد الصور الفنية والواقعية فائقة الجودة.',
    category: 'image',
    priceMonthly: 750,
    originalPrice: 950,
    planType: 'مشترك خاص (Shared)',
    features: [
      'توليد صور غير محدود في وضع Relax Mode',
      '15 ساعة توليد فوري Fast Hours شهرياً',
      'استخدام منظم داخل غرفة خاصة بدون مقاطعة',
      'ترخيص الاستخدام التجاري للأعمال والتصاميم',
      'ضمان تشغيل ومتابعة مستمرة طوال الـ 30 يوماً'
    ],
    deliveryTime: 'خلال 30 دقيقة',
    logoText: 'MJ',
    badge: 'للمصممين'
  },
  {
    id: 'cursor-pro',
    name: 'Cursor AI Pro',
    tagline: 'محرر الأكواد الذكي المعتمد على VS Code مع إمكانيات Composer وفهم المشروع بالكامل.',
    category: 'dev',
    priceMonthly: 1150,
    originalPrice: 1350,
    planType: 'شخصي بالكامل (Personal)',
    features: [
      '500 طلب فائق السرعة لـ Claude 3.5 Sonnet و GPT-4o شهرياً',
      'طلبات غير محدودة في الوضع القياسي',
      'فهرسة كاملة للكود ومستودع المشروع محلياً',
      'ميزة Composer لتوليد وتعديل ملفات المشروع دفعة واحدة',
      'متوافق كلياً مع جميع إضافات VS Code وإعداداتك'
    ],
    deliveryTime: 'تسليم فوري',
    logoText: 'CUR',
    badge: 'إنتاجية برمجية'
  },
  {
    id: 'runway-kling',
    name: 'Runway Gen-3 & Kling',
    tagline: 'إنتاج مقاطع فيديو سينمائية وتحريك واقعي عالي الدقة لصناع المحتوى والإعلانات.',
    category: 'video',
    priceMonthly: 890,
    originalPrice: 1200,
    planType: 'مشترك خاص (Shared)',
    features: [
      'توليد مقاطع فيديو بدقة 1080p و 4K',
      'أدوات تحكم متقدمة في حركة الكاميرا والـ Motion Brush',
      'أوقات معالجة ورندر سريعة',
      'مثالي للإعلانات التجارية، والريلز، والمقاطع الوثائقية'
    ],
    deliveryTime: 'خلال 45 دقيقة',
    logoText: 'RNW',
    badge: 'لصناع الفيديو'
  },
  {
    id: 'chatgpt-shared',
    name: 'ChatGPT Plus (باقة التوفير)',
    tagline: 'نفس إمكانيات GPT-4o وتوليد الصور بحساب مشترك محدود الأفراد لتوفير التكلفة.',
    category: 'llm',
    priceMonthly: 490,
    originalPrice: 700,
    planType: 'مشترك خاص (Shared)',
    features: [
      'وصول كامل لـ GPT-4o وميزة Canvas والتحليل',
      'حد أقصى 3 مستخدمين موثوقين للحساب لضمان الاستقرار',
      'توفير يتجاوز 55% من تكلفة الاشتراك الفردي',
      'ضمان تبديل فوري في حال حدوث أي توقف'
    ],
    deliveryTime: 'خلال 15 دقيقة',
    logoText: 'GPT',
    badge: 'أعلى توفير'
  }
];

export const AI_TOOLS: ToolItem[] = [
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    category: 'توليد الصور',
    description: 'المنصة الرائدة في توليد الصور الفنية والواقعية المعقدة بأدق تفاصيل الإضاءة والتكوين.',
    pricing: 'مدفوع بالكامل',
    rating: 4.9,
    badge: 'الأعلى تقييماً',
    tag: 'MJ',
    link: 'https://midjourney.com'
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Alpha',
    category: 'توليد الفيديو',
    description: 'أداة إنتاج وتحريك الفيديو السينمائي من النصوص أو الصور بحركة كاميرا متقنة.',
    pricing: 'تجربة مجانية',
    rating: 4.8,
    badge: 'موصى به',
    tag: 'RNW',
    link: 'https://runwayml.com'
  },
  {
    id: 'kling',
    name: 'Kling AI',
    category: 'توليد الفيديو',
    description: 'محاكاة فائقة للفيزياء وحركة الأجسام الطبيعية في مقاطع الفيديو المولدة.',
    pricing: 'مجاني / مدفوع',
    rating: 4.7,
    tag: 'KLG',
    link: 'https://klingai.com'
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    category: 'نماذج وبرمجة',
    description: 'النموذج الأكثر دقة في كتابة وتحليل الأكواد البرمجية وصياغة النصوص المنطقية المعقدة.',
    pricing: 'مجاني / مدفوع',
    rating: 5.0,
    badge: 'أداء برمجي متقدم',
    tag: 'CLD',
    link: 'https://claude.ai'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'صوت وموسيقى',
    description: 'تحويل النص إلى صوت طبيعي 100% مع نبرات صوتية عربية واقعية واستنساخ الأصوات.',
    pricing: 'تجربة مجانية',
    rating: 4.9,
    tag: '11L',
    link: 'https://elevenlabs.io'
  },
  {
    id: 'cursor',
    name: 'Cursor Editor',
    category: 'نماذج وبرمجة',
    description: 'محرر أكواد متكامل مبني على VS Code يقدم دعماً برمجياً عميقاً لسياق المشروع بأكمله.',
    pricing: 'مجاني / مدفوع',
    rating: 4.9,
    badge: 'محرر ذكي',
    tag: 'CUR',
    link: 'https://cursor.com'
  }
];

export const WORKFLOWS: WorkflowItem[] = [
  {
    id: 'wf-landing-page',
    title: 'تطوير صفحة هبوط من الفكرة للنشر',
    timeEstimate: '3 ساعات',
    level: 'متوسط',
    toolsUsed: ['v0.dev', 'Cursor', 'Tailwind', 'Vercel'],
    description: 'توليد المكونات عبر النماذج الذكية وربطها في بيئة العمل ثم نشرها كصفحة تفاعلية متكاملة.',
    stepsCount: 5
  },
  {
    id: 'wf-youtube-thumb',
    title: 'تصميم صور مصغرة ذات معدل نقر مرتفع',
    timeEstimate: '30 دقيقة',
    level: 'مبتدئ',
    toolsUsed: ['Midjourney', 'Photoshop', 'Canva'],
    description: 'صياغة برومبتات استخراج تعبيرات الوجه المتوازنة مع إضاءة مدروسة لجذب المشاهدين.',
    stepsCount: 4
  },
  {
    id: 'wf-social-auto',
    title: 'أتمتة إنتاج ونشر المحتوى الرقمي',
    timeEstimate: 'ساعتان',
    level: 'متقدم',
    toolsUsed: ['n8n', 'Claude API', 'Telegram', 'Sheets'],
    description: 'خط معالجة آلي يلخص المقالات والمستجدات ويعيد صياغتها للنشر على المنصات المستهدفة.',
    stepsCount: 6
  }
];

export const FAQS = [
  {
    q: 'كيف يتم تسليم الحساب بعد إتمام التحويل؟',
    a: 'بمجرد إرسال إشعار التحويل عبر واتساب، يتولى فريقنا تزويدك ببيانات الدخول أو ترقية حسابك الحالي على بريدك الشخصي في فترة تتراوح بين 5 إلى 30 دقيقة.'
  },
  {
    q: 'ما هي وسائل الدفع المحلية المعتمدة؟',
    a: 'نقبل الدفع عبر شبكة المدفوعات اللحظية InstaPay، وكذلك محافظ الهاتف المحمول (فودافون كاش، أورنج كاش، اتصالات كاش)، بالإضافة إلى خيارات البطاقات البنكية.'
  },
  {
    q: 'ما هي طبيعة الضمان المقدم طوال فترة الاشتراك؟',
    a: 'نضمن لك استمرار الحساب وعمله بكفاءة طوال مدة الاشتراك (30 يوماً). في حال حدوث أي مشكلة تشغيلية غير متوقعة، يتم الحل أو الاستبدال الفوري عبر الدعم المباشر.'
  },
  {
    q: 'ما الفرق بين الحساب الشخصي (Personal) والمشترك (Shared)؟',
    a: 'الحساب الشخصي مخصص بالكامل لك وعلى بريدك، ويوفر خصوصية وسقف استخدام فردي كامل. الحساب المشترك يضم عدداً محدوداً ومراقباً (3 أفراد كحد أقصى) لخفض التكلفة بشكل كبير مع الحفاظ على استقرار التجربة.'
  }
];
