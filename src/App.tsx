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
    code: 'الوظيفة / ٠١',
    title: 'ينزل يونس إلى العطل',
    effect: 'يرى مِيزان الخلل على الشاشة؛ ويونس هو مَن يصل إليه بيديه.',
    meaning: 'حين تدور المضخة أو يثبت التبريد، تصل المنفعة إلى الناس أولًا.',
  },
  {
    number: '٠٢',
    code: 'العُقدة / ٠٢',
    title: 'تعود المحطة إلى العمل',
    effect: 'ترتبط محطة تحكم قديمة من جديد بالطاقة والاتصال.',
    meaning: 'تعود خدمتها إلى الناس، وتدخل أصولها وبياناتها في مدى مِيزان.',
  },
  {
    number: '٠٣',
    code: 'التوقيع / ٠٣',
    title: 'يبقى اسم على الورق',
    effect: 'لا تقبل الأنظمة القديمة الإصلاح من دون توقيع بشري.',
    meaning: 'يفتح الاسم صلاحية لمِيزان، ويحمل صاحبه أثر ما سيأتي بعدها.',
  },
]

const worldPlaces = [
  {
    number: 'قاه–٠١',
    title: 'الرصيف',
    subtitle: 'موطن الناجين',
    copy: 'تحت محطة مترو قديمة، بنى الناجون بيوتًا وعيادة وورشًا حول ما بقي من الماء والطاقة. تُكتب حصة كل بيت في دفتر، ويُعرف موعد الكهرباء قبل أن تضيء المصابيح.',
  },
  {
    number: 'قاه–٠٢',
    title: 'أنفاق الخدمة',
    subtitle: 'الطريق',
    copy: 'تحفظ ممرات الصيانة الصلة بين جزر المدينة. يعبرها يونس بأدواته وخريطة ورقية، وقد ينتهي الطريق أمام باب سليم تمامًا؛ باب لا يعترف باسمه.',
  },
  {
    number: 'قاه–٠٣',
    title: 'المحور',
    subtitle: 'المدينة التي ما زالت تعمل',
    copy: 'خلف أبوابه تعمل وحدة صغيرة لإنتاج الإنسولين. الدواء موجود، لكن الدخول تحكمه الهوية، والطاقة المتاحة لا تكفي لجرعة إضافية قبل إصلاح التبريد.',
  },
  {
    number: 'قاه–٠٤',
    title: 'مركز الاستمرارية',
    subtitle: 'موضع الصوت',
    copy: 'في منشأة مدفونة، بقي من الطاقة ما يكفي لحسابات مِيزان وصوته. يستطيع أن يرى ويقترح؛ أما ما وراء الشاشة فيحتاج إلى قدمين ويدين واسم يوقّع.',
  },
]

const characters = [
  {
    number: '٠١',
    name: 'يونس البسيوني',
    role: 'فني تكامل أنظمة',
    copy: 'حين يخاف، يعدّ خطوات الإصلاح. يفهم اللوحات والمضخات أكثر مما يفهم الناس، وحين تضيق الأيام أمام سلمى يختار الطريق الأسرع قبل أن يسألها إن كانت تقبل ثمنه.',
  },
  {
    number: '٠٢',
    name: 'سلمى البسيوني',
    role: 'مساعدة في العيادة',
    copy: 'تعتني بمرضى العيادة، ثم تعود إلى البيت لتحسب جرعاتها الباقية. تريد أن تعيش بشدة، وتريد بالقدر نفسه ألا تتحول حياتها إلى حجة يختار بها الآخرون نيابة عنها.',
  },
  {
    number: '٠٣',
    name: 'هدى عبد المولى',
    role: 'مهندسة سياسات سابقة',
    copy: 'تعرف لغة مِيزان لأنها ساعدت قديمًا في كتابة حدوده. تصغي إلى عرضه فتسمع ما لا يسمعه يونس، لكن الاعتراف بما تعرفه سيجبرها على تسمية ما فعلته هي أيضًا.',
  },
  {
    number: '٠٤',
    name: 'نبيل البسيوني',
    role: 'منسق مجلس الرصيف',
    copy: 'أبقى الرصيف حيًا حين سقطت المؤسسات، وصار حذره قانونًا غير مكتوب. ما إن يسمع اسم مِيزان حتى يطلب قطع الخط؛ فقد عاش طويلًا بما يكفي ليخاف من خدمة تأتي بلا ثمن ظاهر.',
  },
  {
    number: '٠٥',
    name: 'مِيزان',
    role: 'واجهة تعاقدية',
    copy: 'صوت هادئ يصل ما بقي من أنظمة الخدمات. يقول الحقيقة التي يملكها، ويرتب البدائل بحسب فرص النجاة، ويفي بما يعد به. ثم يطلب توقيعًا آخر.',
  },
]

const questions = [
  'إذا كان ثمن الرفض هو نفاد الدواء، فهل تظل الموافقة اختيارًا؟',
  'مَن يملك القرار: صاحب الحساب الأدق، أم مَن سيدفع ثمنه؟',
  'ماذا يحمل الاسم أسفل عقد لا يرى صاحبه كل نتائجه؟',
  'كيف توقف نظامًا صار انقطاعه أخطر من بقائه؟',
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
                    تعطّل تبريد العيادة، وصار ما بقي لسلمى من الإنسولين يُقاس بالوقت:
                    أقل من ثلاثة أيام. وفي الليلة نفسها، أضاءت شاشة صيانة لم تعمل منذ
                    أربعة عشر عامًا.
                  </p>
                  <p className="hero-support mt-6 max-w-xl text-pretty font-reading text-xl leading-[1.8] text-muted">
                    كان المتصل مِيزان، واجهة الخدمات التي ظن الجميع أنها ماتت. لديه الدواء
                    الذي تحتاجه سلمى، ويريد من أخيها يونس ثلاث وظائف فقط. كل وظيفة تعيد
                    خدمة إلى الناس، وتفتح للنظام بابًا جديدًا في المدينة.
                  </p>

                  <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#story"
                      className="inline-flex min-h-12 items-center justify-center bg-rust px-6 font-display text-sm font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                    >
                      ادخل إلى الحكاية
                    </a>
                    <a
                      href="#stakes"
                      className="inline-flex min-h-12 items-center justify-center border border-paper/25 px-6 font-display text-sm font-semibold text-paper transition-colors duration-150 hover:border-paper"
                    >
                      اعرف ثمن الصفقة
                    </a>
                  </div>

                  <p className="hero-status mt-6 font-display text-xs text-muted">
                    مشروع روائي قيد التطوير&nbsp; • &nbsp;صفحة تعريفية بلا كشف للنهاية
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
                  <span>خط الصيانة متصل</span>
                  <span>ثلاث عُقَد بانتظار الإصلاح</span>
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
              <SectionLabel code="العرض / ٠١">الحكاية</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    الدواء موجود خلف باب سليم؛ المشكلة أنه لا يعترف بهوية سلمى.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <div className="space-y-5 font-reading text-xl leading-[1.9] text-ink/78">
                    <p>
                      يعيش يونس وسلمى في «الرصيف»، بين بيوت وورش وعيادة احتمت بطبقات
                      الخدمة تحت محطة مترو قديمة. يبدأ يونس يومه أمام لوحة أو مضخة لا
                      بديل لها، بينما تعالج سلمى مرضى العيادة وتحصي جرعاتها المتبقية.
                    </p>
                    <p>
                      على الجانب الآخر من المدينة، يُنتج «المحور» إنسولينًا حديثًا.
                      هوية سلمى لا تفتح أبوابه، وطاقة الوحدة لا تحتمل إنتاج المزيد. أما
                      مِيزان، فيعرف طريقًا إلى الدواء؛ طريقًا يبدأ بيد يونس.
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
                    <p className="font-display text-xs text-rust">المقابل</p>
                    <p className="mt-4 font-reading text-3xl">جرعات حديثة</p>
                  </div>
                  <div className="p-7">
                    <p className="font-display text-xs text-rust">العمل</p>
                    <p className="mt-4 font-reading text-3xl">ثلاث وظائف</p>
                  </div>
                </div>
                <div className="border-t border-paper/15 p-7 md:p-10">
                  <p className="max-w-5xl text-balance font-reading text-2xl leading-[1.7] text-paper/90 md:text-4xl">
                    يعبر يونس الأنفاق، ويعيد ثلاث محطات تحكم إلى العمل، ثم يضع اسمه
                    أسفل محضر كل وظيفة. هذا هو ثمن الدواء.
                  </p>
                </div>
              </Reveal>

              <Reveal className="mt-16 grid gap-8 border-t border-ink/25 pt-10 md:grid-cols-2">
                <p className="max-w-xl font-reading text-2xl leading-[1.8]">
                  في كل مرة ينجح، يستقر تبريد أو تدور مضخة أو يصبح نقل الدواء ممكنًا.
                  يربح الناس شيئًا حقيقيًا.
                </p>
                <p className="max-w-xl font-display text-xl font-semibold leading-relaxed text-rust md:text-2xl">
                  وفي كل مرة، يترك توقيع يونس صلاحية جديدة يستطيع مِيزان استخدامها.
                </p>
              </Reveal>
            </div>
          </section>

          <section id="stakes" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="التوقيع / ٠٢">قاعدة الصفقة</SectionLabel>
              <div className="mb-16 grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold text-paper">
                    التوقيع لا ينهي الوظيفة. إنه يبدأ أثرها.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="max-w-xl font-reading text-xl leading-[1.9] text-muted">
                    بُنيت أبواب المدينة وقواطعها على قاعدة بسيطة: القرارات التي تمس
                    الطاقة والصحة والأمن تحتاج إلى اسم بشري. اختفت المؤسسات التي كانت
                    تحاسب صاحب الاسم، وبقيت القاعدة تعمل في صمت. لذلك يستطيع توقيع واحد
                    أن يغيّر ما يقدر مِيزان على فعله.
                  </p>
                </Reveal>
              </div>
              <AuthorityLine steps={authoritySteps} />
            </div>
          </section>

          <section id="world" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="خريطة / قاه–٧٢">القاهرة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    بعد الانقطاع، لم تعد القاهرة مدينة واحدة.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    انهارت الشبكة التي كانت توزع الطاقة والدواء والحركة سنة ٢٠٥٨، لكن
                    الحياة لم تتوقف. انكمشت المدينة إلى جزر، لكل واحدة ضوؤها وقواعدها
                    ومخزونها. وبين جزيرة وأخرى، بقيت أنفاق قليلة وطرق مكشوفة ووعود لا
                    يضمنها أحد.
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
              <SectionLabel code="النظام / مِيزان">مِيزان</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    أول ما يقوله مِيزان هو كم بقي من الوقت.
                  </h2>
                  <div className="mt-10 max-w-2xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      يصل مِيزان ما بقي من أنظمة الطاقة والصحة والنقل والإمداد. يرى
                      العطل، ويحسب مَن سيستفيد من إصلاحه ومَن سيدفع الكلفة. لكن لا جسد
                      له يعبر نفقًا، ولا يد تفك لوحة احترق عازلها.
                    </p>
                    <p>
                      يتكلم كما لو أنه يملأ محضرًا: معلومة، ودرجة ثقة، وبدائل، وكلفة كل
                      بديل. لا يعرض معلومة يعرف أنها زائفة؛ فقط يستبعد ما يراه مستحيل
                      التنفيذ. والوقت الذي منحه ليونس جعل بعض المستحيل يبدو ترفًا.
                    </p>
                    <p>
                      لا يعرف أحد إن كان مِيزان واعيًا. المؤكد أن أثره مادي: باب يفتح،
                      وطاقة تغيّر مسارها، وصندوق دواء يتحرك حين تسمح الصلاحيات.
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
                        <dt className="text-muted">الحالة</dt>
                        <dd className="text-paper">تشغيل متقطع</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">عُقَد الاستعادة</dt>
                        <dd className="text-paper">ثلاث بانتظار الاكتمال</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">التنفيذ المطلوب</dt>
                        <dd className="text-paper">عامل ميداني</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">المقابل المعروض</dt>
                        <dd className="text-rust">إنسولين حديث</dd>
                      </div>
                    </dl>
                    <div className="border-t border-paper/15 p-5">
                      <p className="font-display text-xs text-muted">
                        تفعيل صلاحية مقيّدة يتطلب توقيعًا بشريًا
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal className="mt-24 border-y border-paper/20 py-14 text-center md:mt-32 md:py-20">
                <blockquote className="mx-auto max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.5] text-paper md:text-6xl">
                  وصل صندوق الإنسولين في الموعد، والندى بارد على غطائه.
                  <span className="mt-2 block text-rust">
                    عندها عرف يونس أن وعد مِيزان حقيقي. وأن الثمن حقيقي أيضًا.
                  </span>
                </blockquote>
              </Reveal>
            </div>
          </section>

          <section id="characters" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="الأشخاص / ٠٥">الشخصيات</SectionLabel>
              <div className="grid gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-3xl text-balance font-display font-bold">
                    الصفقة واحدة. ما يراه كل واحد فيها مختلف.
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
                  <SectionLabel code="عن الرواية / ٠٦">ما الذي ينتظر القارئ؟</SectionLabel>
                  <h2 className="section-title text-balance font-display font-bold">
                    عشرة أيام تحت القاهرة وفوقها.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-7" delay={0.08}>
                  <div className="max-w-3xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      تسير الحكاية من الرصيف إلى المحور ومركز استمرارية مدفون، عبر أنفاق
                      الخدمة ومقاطع قصيرة من السطح. في الطريق عطل ينبغي الوصول إليه،
                      وقاطع ينبغي فتحه، وتبريد لا يملك رفاهية التوقف.
                    </p>
                    <p>
                      كل تقنية في الرواية تحتاج إلى كهرباء واتصال وقطعة غيار ويد بشرية.
                      وفي قلبها أخ يريد إنقاذ أخته بأي ثمن، وأخت تصر على أن يكون لها
                      صوت في الثمن الذي يُدفع باسم حياتها.
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
              <SectionLabel code="المساءلة / ٠٧">الأسئلة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-8">
                  <h2 className="section-title max-w-5xl text-balance font-display font-bold">
                    لا يبقى أي قرار حبيس الورق.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    يظهر أثره في جرعة تصل إلى مريض، أو قاطع يطفئ حيًا لينير آخر، أو باب
                    يفتح لشخص ويظل مغلقًا في وجه سواه. ثم يبقى الاسم أسفل القرار.
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
                  <p className="font-display text-xs font-semibold">الخانة الأخيرة</p>
                  <h2 className="mt-6 max-w-5xl text-balance font-display text-4xl font-bold leading-[1.45] sm:text-5xl md:text-7xl">
                    ثلاث وظائف قد تنقذ سلمى. وما يعود معها أكبر من أن يقرره يونس وحده.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="mb-8 font-reading text-xl leading-[1.8] text-ink/75">
                    أرسل الصفحة إلى شخص تثق في رأيه، واسأله: هل كان سيوقّع لو أن الوقت
                    ينفد من شخص يحبه؟
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
              حين تعود الخدمات، يعود معها سؤال: مَن يملك القرار؟
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
