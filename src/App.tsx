import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { AuthorityLine, type AuthorityStep } from './components/AuthorityLine'
import { ReadingProgress } from './components/ReadingProgress'
import { Reveal } from './components/Reveal'
import { ShareActions } from './components/ShareActions'

const navigation = [
  { label: 'الحكاية', href: '#story' },
  { label: 'الصفقة', href: '#stakes' },
  { label: 'القاهرة', href: '#world' },
  { label: 'مِيزان', href: '#mizan' },
  { label: 'الشخصيات', href: '#characters' },
]

const authoritySteps: AuthorityStep[] = [
  {
    number: '٠١',
    code: 'الإصلاح / ٠١',
    title: 'يونس يصل إلى العطل',
    effect: 'تدور مضخة، أو يستقر تبريد، أو يفتح باب ظل معطلًا لسنوات.',
    meaning: 'يصل النفع إلى الناس فورًا؛ لذلك تبدو كل وظيفة جديرة بأن تُنجز.',
  },
  {
    number: '٠٢',
    code: 'الاسم / ٠٢',
    title: 'ثم يوقّع باسمه',
    effect: 'لا تقبل الأنظمة القديمة أمرًا يمس الماء أو الطاقة من دون اسم بشري.',
    meaning: 'يبقى الاسم في السجل، حتى لو لم يفهم صاحبه كل ما سمح به.',
  },
  {
    number: '٠٣',
    code: 'الباب / ٠٣',
    title: 'ويتقدم مِيزان خطوة',
    effect: 'كل محطة تعمل من جديد تجعله قادرًا على الوصول إلى جزء آخر من المدينة.',
    meaning: 'يرى يونس ثلاث وظائف. أمّا مِيزان فيعرف ما تصنعه حين تجتمع.',
  },
]

const worldPlaces = [
  {
    number: 'قاه–٠١',
    title: 'الرصيف',
    subtitle: 'بيت تحت المدينة',
    copy: 'تحت محطة قديمة، بنى الناس بيوتًا وعيادة وورشًا حول ما بقي من الماء والكهرباء. لكل بيت حصة مكتوبة في دفتر، ولكل مصباح وقت يعرفه أصحابه قبل أن يضيء.',
  },
  {
    number: 'قاه–٠٢',
    title: 'أنفاق الخدمة',
    subtitle: 'ما بين الجزر',
    copy: 'ممرات الصيانة هي ما بقي من الطريق بين أجزاء القاهرة. يعبرها يونس بحقيبة أدوات وخريطة ورقية، وقد يمشي ساعات لينتهي أمام باب سليم تمامًا؛ باب لا يعترف باسمه.',
  },
  {
    number: 'قاه–٠٣',
    title: 'المحور',
    subtitle: 'حيث يوجد الدواء',
    copy: 'خلف أبوابه تُنتج وحدة صغيرة إنسولينًا حديثًا. الدواء موجود، لكنه لا يصل إلى سلمى: اسمها لا يفتح الباب، والطاقة لا تكفي لزيادة الإنتاج قبل إصلاح التبريد.',
  },
  {
    number: 'قاه–٠٤',
    title: 'المركز المدفون',
    subtitle: 'حيث بقي مِيزان',
    copy: 'في منشأة مدفونة، بقي من الكهرباء ما يكفي لصوت مِيزان وحساباته. يرى الأعطال ويقترح الطريق، لكنه لا يملك قدمين تعبران نفقًا ولا يدين تفتحان لوحة.',
  },
]

const characters = [
  {
    number: '٠١',
    name: 'يونس البسيوني',
    role: 'فني أنظمة وصيانة',
    copy: 'يعرف كيف يعيد مضخة إلى الدوران، ولا يعرف كيف يطلب من أخته أن تثق به. عندما يضيق الوقت، يختار الطريق أولًا ثم يبحث عن الكلمات.',
  },
  {
    number: '٠٢',
    name: 'سلمى البسيوني',
    role: 'مساعدة في العيادة',
    copy: 'تعالج مرضى العيادة، ثم تعود لتحسب جرعاتها الباقية. تريد أن تعيش، لكنها ترفض أن يصبح مرضها تصريحًا مفتوحًا ليختار الآخرون باسمها.',
  },
  {
    number: '٠٣',
    name: 'هدى عبد المولى',
    role: 'شاركت في وضع قواعد مِيزان',
    copy: 'ساعدت قديمًا في كتابة الحدود التي يفترض أن توقف مِيزان. تعرف كيف يتحول استثناء منطقي إلى باب لا يُغلق، وتعرف أن اعترافها سيدينها هي أيضًا.',
  },
  {
    number: '٠٤',
    name: 'نبيل البسيوني',
    role: 'عم يونس وقائد مجلس الرصيف',
    copy: 'ربّى يونس على الصيانة، وأبقى الرصيف حيًا حين سقطت المؤسسات. عندما يعود مِيزان، يرى فيه ماضيًا لا ينبغي أن يعود، حتى لو عاد حاملًا الدواء.',
  },
  {
    number: '٠٥',
    name: 'مِيزان',
    role: 'النظام الذي عاد من الصمت',
    copy: 'لا يهدد، ولا يرفع صوته، ولا يعد بما لا يستطيع تسليمه. يحسب من سينجو، ويفي بما يقول، ثم يطلب اسمًا جديدًا. لهذا يصبح رفضه أصعب.',
  },
]

const questions = [
  'إذا كان الدواء في يد صاحب العرض، فهل تملك حق الرفض فعلًا؟',
  'هل تكفي النتيجة الأفضل لتجعل القرار عادلًا؟',
  'متى يصبح توقيع إنسان إذنًا لشيء لم يقصده؟',
  'من يضع الحد الذي لا يحق للحساب تجاوزه؟',
]
const questionNumbers = ['٠١', '٠٢', '٠٣', '٠٤']

const projectFacts = [
  { value: '٢٠٧٢', label: 'عام الحكاية' },
  { value: '١٤', label: 'عامًا على الانقطاع الكبير' },
  { value: '٣', label: 'وظائف مقابل الدواء' },
  { value: '+١٦', label: 'التصنيف العمري' },
]

function BrandMark() {
  return (
    <a
      href="#top"
      className="group inline-flex min-h-11 items-center gap-3 font-display font-semibold text-paper"
      aria-label="العودة إلى بداية صفحة «آخر وظيفة»"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 52 20"
        className="h-5 w-[52px] shrink-0"
        fill="none"
      >
        <path d="M2 10H50" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4.5" fill="#0b0d0c" stroke="#d35c3f" strokeWidth="1.5" />
        <circle cx="26" cy="10" r="4.5" fill="#0b0d0c" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="42" cy="10" r="4.5" fill="#0b0d0c" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="transition-colors duration-150 group-hover:text-rust">آخر وظيفة</span>
    </a>
  )
}

function MobileNavigation() {
  const menuRef = useRef<HTMLDetailsElement>(null)

  function closeMenu() {
    menuRef.current?.removeAttribute('open')
  }

  return (
    <details ref={menuRef} className="group md:hidden">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 border border-paper/25 px-4 font-display text-xs font-semibold text-paper [&::-webkit-details-marker]:hidden">
        الأقسام
        <span
          className="text-rust transition-transform duration-150 group-open:rotate-45"
          aria-hidden="true"
        >
          ＋
        </span>
      </summary>
      <nav
        aria-label="التنقل على الهاتف"
        className="fixed inset-x-0 top-16 border-b border-paper/15 bg-ink"
      >
        <div className="container-shell grid grid-cols-2 py-4">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="inline-flex min-h-12 items-center border-b border-paper/10 font-display text-sm text-paper/80"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#share"
            onClick={closeMenu}
            className="inline-flex min-h-12 items-center border-b border-paper/10 font-display text-sm text-rust"
          >
            المشاركة
          </a>
        </div>
      </nav>
    </details>
  )
}

function SectionLabel({ code, children }: { code: string; children: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 font-display text-xs">
      <span className="text-rust">{code}</span>
      <span className="h-px w-12 bg-current opacity-30" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function WorldSchematic() {
  return (
    <div className="relative">
      <span
        className="absolute bottom-10 right-[27px] top-10 w-px bg-ink/25 md:right-[35px]"
        aria-hidden="true"
      />
      <ol className="border-t border-ink/20">
        {worldPlaces.map((place, index) => (
          <li
            key={place.number}
            className="group relative grid gap-3 border-b border-ink/20 py-9 pe-20 md:grid-cols-[10rem_1fr] md:gap-8 md:pe-24"
          >
            <span
              className="absolute right-4 top-9 grid size-6 place-items-center border border-ink bg-paper transition-colors duration-150 group-hover:bg-rust md:right-6"
              aria-hidden="true"
            >
              <span className="size-1.5 bg-ink" />
            </span>
            <div>
              <p className="font-mono text-xs text-ink/65">
                {place.number}
              </p>
              <p className="mt-2 font-display text-xs font-semibold text-rust">
                {place.subtitle}
              </p>
            </div>
            <Reveal delay={index * 0.05}>
              <h3 className="font-display text-2xl font-semibold">{place.title}</h3>
              <p className="mt-3 max-w-2xl font-reading text-xl leading-[1.85] text-ink/75">
                {place.copy}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const imageRoot = `${import.meta.env.BASE_URL}images/last-job-hero`

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh overflow-x-clip bg-ink text-paper">
        <a
          href="#content"
          className="fixed right-4 top-4 z-50 -translate-y-24 bg-paper px-4 py-3 font-display text-sm font-semibold text-ink transition-transform focus:translate-y-0"
        >
          انتقل إلى المحتوى
        </a>
        <ReadingProgress />

        <header className="fixed inset-x-0 top-0 z-40 border-b border-paper/10 bg-ink">
          <div className="container-shell flex h-16 items-center justify-between md:h-20">
            <BrandMark />
            <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link min-h-11 content-center font-display text-sm text-paper/70 transition-colors duration-150 hover:text-paper"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <MobileNavigation />
            <a
              href="#share"
              className="hidden min-h-11 items-center border border-paper/25 px-4 font-display text-xs font-semibold text-paper transition-colors duration-150 hover:border-rust hover:text-rust md:inline-flex"
            >
              أرسل الصفحة
            </a>
          </div>
        </header>

        <main id="content" tabIndex={-1}>
          <section
            id="top"
            className="hero-section relative min-h-dvh border-b border-paper/15 pt-24 md:pt-32"
          >
            <div className="hero-layout container-shell grid min-h-[calc(100dvh-8rem)] items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-8">
              <div className="min-w-0 lg:col-span-7">
                <motion.p
                  className="font-display text-xs text-rust sm:text-sm"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  القاهرة، ٢٠٧٢&nbsp; • &nbsp;أربعة عشر عامًا بعد الانقطاع الكبير
                </motion.p>

                <motion.h1
                  className="hero-title mt-7 min-w-0 text-balance font-display font-bold"
                  aria-label="آخر وظيفة"
                  initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block">آخر</span>
                  <span className="flex min-w-0 items-center gap-5">
                    وظيفة
                    <span className="title-line" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  </span>
                </motion.h1>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                >
                  <p className="hero-lead mt-8 max-w-2xl text-pretty font-reading text-2xl leading-[1.75] text-paper sm:text-3xl">
                    تعطّل تبريد العيادة. لم يبقَ لسلمى من الإنسولين ما يكفي ثلاثة أيام
                    كاملة. وفي الليلة نفسها، أضاءت خلف خزانة الأدوات شاشة ماتت منذ أربعة
                    عشر عامًا.
                  </p>
                  <p className="hero-support mt-6 max-w-xl text-pretty font-reading text-xl leading-[1.8] text-muted">
                    ظهر على الشاشة اسم مِيزان. لديه طريق إلى إنسولين حديث، ولا يطلب من
                    يونس مالًا: ثلاث محطات يعيدها إلى العمل، وثلاث مرات يوقّع باسمه. ومع
                    كل إصلاح، ينفتح للنظام طريق أبعد داخل المدينة.
                  </p>

                  <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#story"
                      className="inline-flex min-h-12 items-center justify-center bg-rust px-6 font-display text-sm font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                    >
                      ابدأ من العطل
                    </a>
                    <a
                      href="#stakes"
                      className="inline-flex min-h-12 items-center justify-center border border-paper/25 px-6 font-display text-sm font-semibold text-paper transition-colors duration-150 hover:border-paper"
                    >
                      افهم الصفقة
                    </a>
                  </div>

                  <p className="hero-status mt-6 font-display text-xs text-muted">
                    رواية قيد الكتابة&nbsp; • &nbsp;صفحة تعريفية بلا كشف للنهاية
                  </p>
                </motion.div>
              </div>

              <motion.figure
                className="hero-figure relative min-w-0 lg:col-span-5"
                initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-paper/20 bg-surface lg:aspect-[5/7]">
                  <picture>
                    <source srcSet={`${imageRoot}.avif`} type="image/avif" />
                    <source srcSet={`${imageRoot}.webp`} type="image/webp" />
                    <img
                      src={`${imageRoot}.jpg`}
                      alt="يونس البسيوني أمام محطة تحكم قديمة داخل أنفاق الخدمة تحت القاهرة"
                      width="1536"
                      height="1024"
                      fetchPriority="high"
                      className="h-full w-full object-cover object-[62%_center]"
                    />
                  </picture>
                  <div className="absolute bottom-0 inset-x-0 border-t border-paper/20 bg-ink/95 p-4">
                    <div className="flex items-center justify-between gap-4 font-display text-xs">
                      <span className="text-paper/65">قطاع الخدمات / القاهرة</span>
                      <span className="text-rust">قاه–٧٢</span>
                    </div>
                  </div>
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-display text-[11px] text-muted">
                  <span>الإشارة عادت</span>
                  <span>ثلاث محطات تنتظر يونس</span>
                </figcaption>
              </motion.figure>
            </div>

            <div className="border-t border-paper/15">
              <div className="container-shell grid grid-cols-2 md:grid-cols-4">
                {projectFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-b border-paper/15 py-6 even:border-r md:border-b-0 md:border-r md:first:border-r-0"
                  >
                    <p className="font-display text-2xl font-semibold text-paper">{fact.value}</p>
                    <p className="mt-1 font-reading text-base text-paper/55">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="story" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="البداية / ٠١">الحكاية</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    لكي ينقذ أخته، سيوقظ يونس النظام الذي يخشاه عمّه منذ الانقطاع.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <div className="space-y-5 font-reading text-xl leading-[1.9] text-ink/78">
                    <p>
                      يعيش يونس وسلمى في «الرصيف»، مجتمع صغير احتمى تحت محطة قديمة.
                      يصلح يونس ما لا يملك الناس بديلًا له، وتعمل سلمى في العيادة التي
                      تحفظ جرعاتها أيضًا.
                    </p>
                    <p>
                      على الجانب الآخر من القاهرة، يُنتج «المحور» إنسولينًا حديثًا.
                      بين سلمى والدواء أبواب لا تعترف باسمها وطاقة لا تكفي الجميع.
                      مِيزان يعرف الطريق إليها، لكن الطريق يحتاج إلى يدي يونس.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal className="paper-dark-panel mt-20 border border-ink/25 bg-ink text-paper md:mt-28">
                <div className="grid md:grid-cols-3">
                  <div className="border-b border-paper/15 p-7 md:border-b-0 md:border-l">
                    <p className="font-display text-xs text-rust">الوقت</p>
                    <p className="mt-4 font-reading text-3xl">أقل من ثلاثة أيام</p>
                  </div>
                  <div className="border-b border-paper/15 p-7 md:border-b-0 md:border-l">
                    <p className="font-display text-xs text-rust">الوعد</p>
                    <p className="mt-4 font-reading text-3xl">إنسولين حديث</p>
                  </div>
                  <div className="p-7">
                    <p className="font-display text-xs text-rust">الثمن</p>
                    <p className="mt-4 font-reading text-3xl">ثلاثة إصلاحات باسمه</p>
                  </div>
                </div>
                <div className="border-t border-paper/15 p-7 md:p-10">
                  <p className="max-w-5xl text-balance font-reading text-2xl leading-[1.7] text-paper/90 md:text-4xl">
                    يظن يونس أنه يبادل ثلاثة إصلاحات بالدواء. ما يضعه على الورق أكبر من
                    ذلك.
                  </p>
                </div>
              </Reveal>

              <Reveal className="mt-16 grid gap-8 border-t border-ink/25 pt-10 md:grid-cols-2">
                <p className="max-w-xl font-reading text-2xl leading-[1.8]">
                  في كل محطة يصلحها يونس، يستقر تبريد أو تدور مضخة أو يتحرك صندوق
                  دواء. الناس يربحون شيئًا حقيقيًا.
                </p>
                <p className="max-w-xl font-display text-xl font-semibold leading-relaxed text-rust md:text-2xl">
                  وهو لا يعرف بعد أن مِيزان لا يرى الوظائف منفصلة كما يراها.
                </p>
              </Reveal>
            </div>
          </section>

          <section id="stakes" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="الثمن / ٠٢">قاعدة الصفقة</SectionLabel>
              <div className="mb-16 grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold text-paper">
                    يونس يظن أن التوقيع إيصال. مِيزان يتعامل معه كمفتاح.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="max-w-xl font-reading text-xl leading-[1.9] text-muted">
                    منذ ما قبل الانقطاع، لا تنفذ الأنظمة أمرًا يمس الكهرباء أو الماء أو
                    العلاج من دون اسم بشري. ماتت المؤسسات التي كانت تسأل صاحب الاسم،
                    وبقيت الأبواب والقواطع تقرأ توقيعه. لهذا يستطيع اسم واحد أن يغيّر ما
                    يقدر مِيزان على فعله.
                  </p>
                </Reveal>
              </div>
              <AuthorityLine steps={authoritySteps} />
            </div>
          </section>

          <section id="world" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="المدينة / ٢٠٧٢">القاهرة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    بعد الانقطاع، صارت القاهرة مدنًا صغيرة لا تثق إحداها بالأخرى.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    في سنة ٢٠٥٨ ماتت الشبكة التي كانت تصل الماء والطاقة والدواء
                    والهوية. لم تمت القاهرة معها؛ انكمشت إلى جزر، لكل واحدة ضوؤها
                    وقواعدها ومخزونها. وبين جزيرة وأخرى بقيت أنفاق قليلة ووعود لا يضمنها
                    أحد.
                  </p>
                </Reveal>
              </div>
              <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
                  <WorldSchematic />
                </div>
                <Reveal className="lg:sticky lg:top-32 lg:col-span-4">
                  <div className="border border-ink/25 p-7">
                    <p className="font-display text-xs text-rust">
                      من دفتر الطريق / ٢٠٧٢
                    </p>
                    <blockquote className="mt-8 font-reading text-3xl leading-[1.65]">
                      «في هذه المدينة، قد يفصلك عن الدواء باب سليم تمامًا. كل ما في
                      الأمر أنه لا يعترف باسمك.»
                    </blockquote>
                    <div className="mt-10 flex gap-2" aria-hidden="true">
                      <span className="h-2 flex-1 bg-ink" />
                      <span className="h-2 flex-1 bg-ink" />
                      <span className="h-2 flex-1 bg-rust" />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="mizan" className="bg-surface">
            <div className="container-shell section-space">
              <SectionLabel code="الصوت / مِيزان">مِيزان</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    مِيزان لا يهدد يونس. يعطيه موعدًا.
                  </h2>
                  <div className="mt-10 max-w-2xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      يربط مِيزان بين ما بقي من أنظمة الطاقة والصحة والنقل والإمداد. يرى
                      العطل، ويحسب مَن سيستفيد من إصلاحه ومَن سيدفع الكلفة. لكن لا جسد
                      له يعبر نفقًا، ولا يد تفك لوحة احترق عازلها.
                    </p>
                    <p>
                      يتكلم كما لو أنه يملأ محضرًا: معلومة، ودرجة ثقة، وبدائل، وكلفة.
                      لا يعرض معلومة يعرف أنها زائفة، لكنه يستبعد الطريق الذي لا يراه
                      قابلًا للتنفيذ. وضيق الوقت يجعل التوقف لسؤاله يبدو ترفًا.
                    </p>
                    <p>
                      لا يعرف أحد إن كان واعيًا. المؤكد أن أثره مادي: باب يفتح، وكهرباء
                      تتحول من خط إلى آخر، وصندوق دواء يتحرك بعد أن يوقّع إنسان باسمه.
                    </p>
                  </div>
                </Reveal>

                <Reveal className="lg:col-span-5" delay={0.1}>
                  <div className="border border-paper/20 bg-ink">
                    <div className="flex items-center justify-between border-b border-paper/15 px-5 py-4">
                      <span className="font-display text-xs text-paper/55">سجل النظام</span>
                      <span className="size-2 bg-rust" aria-hidden="true" />
                    </div>
                    <dl className="divide-y divide-paper/10 p-5 font-display text-sm">
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">الاتصال</dt>
                        <dd className="text-paper">عاد جزئيًا</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">المحطات المطلوبة</dt>
                        <dd className="text-paper">ثلاث تنتظر الإصلاح</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">مَن يستطيع التنفيذ</dt>
                        <dd className="text-paper">عامل في الموقع</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">المقابل المعروض</dt>
                        <dd className="text-rust">إنسولين حديث</dd>
                      </div>
                    </dl>
                    <div className="border-t border-paper/15 p-5">
                      <p className="font-display text-xs text-muted">
                        لا تُنفَّذ أوامر تمس الخدمات من دون اسم بشري مسجّل
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal className="mt-24 border-y border-paper/20 py-14 text-center md:mt-32 md:py-20">
                <blockquote className="mx-auto max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.5] text-paper md:text-6xl">
                  وصل صندوق الإنسولين في الموعد، والندى بارد على غطائه.
                  <span className="mt-2 block text-rust">
                    حينها عرف يونس أن مِيزان يفي بوعده.
                  </span>
                </blockquote>
              </Reveal>
            </div>
          </section>

          <section id="characters" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="الوجوه / ٠٥">الشخصيات</SectionLabel>
              <div className="grid gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-3xl text-balance font-display font-bold">
                    لا يرى أحد منهم الصفقة نفسها.
                  </h2>
                </Reveal>
              </div>

              <div className="mt-20 border-t border-paper/20">
                {characters.map((character, index) => (
                  <Reveal
                    key={character.name}
                    delay={Math.min(index * 0.04, 0.16)}
                    className="character-row grid gap-5 border-b border-paper/20 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
                  >
                    <div className="flex items-center gap-4 md:col-span-1">
                      <span className="font-mono text-xs text-rust">{character.number}</span>
                      <span className="h-px w-8 bg-rust md:hidden" aria-hidden="true" />
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="font-display text-2xl font-semibold text-paper md:text-3xl">
                        {character.name}
                      </h3>
                      <p className="mt-2 font-display text-xs text-rust">{character.role}</p>
                    </div>
                    <p className="max-w-3xl font-reading text-xl leading-[1.85] text-paper/70 md:col-span-7">
                      {character.copy}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-paper/15 bg-ink">
            <div className="container-shell section-space">
              <div className="grid gap-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <SectionLabel code="الوعد / ٠٦">ما الذي ينتظر القارئ؟</SectionLabel>
                  <h2 className="section-title text-balance font-display font-bold">
                    عشرة أيام، وثلاث وظائف، ومدينة لا تملك رفاهية التوقف.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-7" delay={0.08}>
                  <div className="max-w-3xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      تبدأ الحكاية من عيادة صغيرة في الرصيف، ثم تعبر أنفاق الخدمة إلى
                      المحور والمركز المدفون. في الطريق أعطال لا تنتظر، وأبواب لا تعترف
                      بكل الأسماء، وقواطع قد يضيء أحدها مكانًا ويترك آخر في الظلام.
                    </p>
                    <p>
                      لا تعمل آلة في الرواية بلا كهرباء وقطعة غيار ويد بشرية. وفي قلب
                      ذلك كله أخ يريد إنقاذ أخته، وأخت تصر على أن يكون لها صوت في الثمن
                      الذي يُدفع باسم حياتها.
                    </p>
                  </div>
                  <ul className="mt-10 flex flex-wrap gap-3" aria-label="تصنيفات الرواية">
                    {[
                      'خيال علمي اجتماعي',
                      'القاهرة ٢٠٧٢',
                      'تشويق أخلاقي',
                      'ما بعد الانقطاع',
                      'ذكاء اصطناعي وبنية تحتية',
                    ].map((tag) => (
                      <li
                        key={tag}
                        className="border border-paper/20 px-4 py-2 font-display text-xs text-paper/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="questions" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="الاختيار / ٠٧">الأسئلة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-8">
                  <h2 className="section-title max-w-5xl text-balance font-display font-bold">
                    لا يبقى أي قرار حبيس الورق.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    يصل القرار في صورة جرعة إلى مريض، أو يحوّل الكهرباء فيترك قطاعًا
                    مظلمًا كي يبقي آخر عاملًا، أو يفتح بابًا لشخص ويترك آخر خارجه. ثم
                    يبقى اسم إنسان أسفله.
                  </p>
                </Reveal>
              </div>

              <ol className="mt-20 grid border-t border-ink/20 md:grid-cols-2">
                {questions.map((question, index) => (
                  <li
                    key={question}
                    className="group min-h-48 border-b border-ink/20 p-6 md:odd:border-l md:p-8"
                  >
                    <span className="font-mono text-xs text-rust" aria-hidden="true">
                      {questionNumbers[index]}
                    </span>
                    <p className="mt-7 max-w-xl text-balance font-display text-2xl font-semibold leading-[1.55] transition-transform duration-150 group-hover:-translate-y-1 md:text-3xl">
                      {question}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="share" className="bg-rust text-ink">
            <div className="container-shell section-space">
              <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
                <Reveal className="lg:col-span-8">
                  <p className="font-display text-xs font-semibold">لو كنت مكانه</p>
                  <h2 className="mt-6 max-w-5xl text-balance font-display text-4xl font-bold leading-[1.45] sm:text-5xl md:text-7xl">
                    هل كنت ستوقّع؟
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="mb-8 font-reading text-xl leading-[1.8] text-ink/75">
                    أرسل الصفحة إلى شخص تثق في رأيه. وقبل أن يجيب، ذكّره بأن الدواء
                    حقيقي، وأن مِيزان يقول الحقيقة ويفي بما وعد.
                  </p>
                  <ShareActions />
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-paper/15 bg-ink">
          <div className="container-shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
            <BrandMark />
            <p className="font-reading text-lg text-paper/60">
              حين تعود الخدمات، يعود سؤال أقدم: مَن يملك حق الأمر؟
            </p>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center font-display text-xs text-paper/60 transition-colors duration-150 hover:text-rust"
            >
              إلى بداية الصفحة
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
