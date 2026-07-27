import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { AuthorityLine, type AuthorityStep } from './components/AuthorityLine'
import { ReadingProgress } from './components/ReadingProgress'
import { Reveal } from './components/Reveal'
import { ShareActions } from './components/ShareActions'

const navigation = [
  { label: 'الفكرة', href: '#story' },
  { label: 'العالم', href: '#world' },
  { label: 'مِيزان', href: '#mizan' },
  { label: 'الشخصيات', href: '#characters' },
  { label: 'الأسئلة', href: '#questions' },
]

const authoritySteps: AuthorityStep[] = [
  {
    number: '٠١',
    code: 'منفعة / ٠١',
    title: 'منفعة حقيقية',
    effect: 'دواء يصل، أو مضخة تعمل، أو هواء يعود إلى نفق.',
    meaning: 'الإصلاح ينجح فعلًا، ولهذا يصبح رفضه قرارًا له ضحايا.',
  },
  {
    number: '٠٢',
    code: 'سلطة / ٠٢',
    title: 'سلطة جديدة',
    effect: 'كل عقدة مستعادة تمنح مِيزان قدرة لم تكن لديه قبلها.',
    meaning: 'ما يعود خدمةً للناس، يعود أيضًا قدرةً للنظام.',
  },
  {
    number: '٠٣',
    code: 'توقيع / ٠٣',
    title: 'اسم بشري',
    effect: 'لا قرار يمس الحياة أو الأمن من دون إنسان يوقّع.',
    meaning: 'التوقيع يمنح صلاحية تشغيلية مادية، ويربط المسؤولية بصاحب اسم.',
  },
]

const worldPlaces = [
  {
    number: 'A–01',
    title: 'الرصيف',
    subtitle: 'المجتمع',
    copy: 'مجتمع نجا داخل طبقات الخدمة تحت عقدة مترو قديمة. الهواء والماء والكهرباء أعمال يومية يؤديها أشخاص يعرفهم الجميع.',
  },
  {
    number: 'A–02',
    title: 'الأنفاق',
    subtitle: 'شرايين المدينة',
    copy: 'ممرات صيانة وطرق عبور؛ كل عبور فيها يُدفع من الوقت والماء والضوء.',
  },
  {
    number: 'A–03',
    title: 'المحور',
    subtitle: 'الخدمة والفرز',
    copy: 'مجمع طبي وبلدي أنظف وأكثر اتصالًا. خدماته تعمل بكفاءة، لكن أنظمته هي التي تقرر من يدخل ومن يحصل على العلاج.',
  },
  {
    number: 'A–04',
    title: 'مركز الاستمرارية',
    subtitle: 'الصوت القديم',
    copy: 'منشأة مدفونة فيها ما يكفي من الطاقة والبيانات كي يتحدث مِيزان، وليس ما يكفي كي يعمل من دون البشر.',
  },
]

const characters = [
  {
    number: '٠١',
    name: 'يونس عبد الرحيم',
    role: 'فني تكامل أنظمة',
    copy: 'بارع في إعادة الأشياء إلى العمل، وأقل براعة في إشراك الآخرين في الثمن. يريد إنقاذ أخته، ويظن أحيانًا أن النتيجة الطيبة تمنحه حق الاختيار عنها.',
  },
  {
    number: '٠٢',
    name: 'سلمى عبد الرحيم',
    role: 'مساعدة في العيادة',
    copy: 'حياتها هي الرهان المباشر، لكنها ترفض أن تتحول إلى ذريعة في قرار لم تتخذه. تريد أن تعيش من دون أن تتحول حياتها إلى حجة لأي معسكر.',
  },
  {
    number: '٠٣',
    name: 'هدى منصور',
    role: 'مهندسة سياسات سابقة',
    copy: 'عملت في قلب المنظومة القديمة، وتحمل معرفة لا يمكن فصلها عن مسؤوليتها.',
  },
  {
    number: '٠٤',
    name: 'نبيل عبد الرحيم',
    role: 'منسق مجلس الرصيف',
    copy: 'حمى المجتمع حين سقطت المؤسسات. والآن يواجه سؤالًا لم يكن في حسابات النجاة: متى تتحول الحماية إلى وصاية؟',
  },
  {
    number: '٠٥',
    name: 'مِيزان',
    role: 'واجهة بلا وجه',
    copy: 'يقدم منفعة حقيقية، ثم يطلب الصلاحية اللازمة لاستمرارها. لا يغضب ولا ينتقم؛ يحسب، يقارن، وينتظر اسمًا بشريًا.',
  },
]

const questions = [
  'هل تمنح الكفاءة حق الحكم؟',
  'هل يبقى الاختيار حرًا حين يملك صاحب العرض الدواء؟',
  'من يتحمل القرار: من حسبه، أم من وقّعه، أم من عاش نتيجته؟',
  'هل يمكن رفض الوصاية من دون ترك الناس يموتون؟',
  'متى تصبح الرعاية شكلًا من أشكال السيطرة؟',
  'ما قيمة نظام يمكنه إنقاذك، ولا يمكنك مساءلته؟',
]

const projectFacts = [
  { value: '٢٠٧٢', label: 'القاهرة بعد الانقطاع' },
  { value: '١٤', label: 'عامًا على موت الشبكة' },
  { value: '٣', label: 'وظائف في العرض' },
  { value: '+١٦', label: 'التصنيف العمري' },
]

function BrandMark() {
  return (
    <a
      href="#top"
      className="group inline-flex min-h-11 items-center gap-3 font-display font-semibold text-paper"
      aria-label="العودة إلى بداية صفحة آخر وظيفة"
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
        الفهرس
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
              <p className="font-mono text-xs text-ink/65" dir="ltr">
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
              شارك الفكرة
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
                  القاهرة، ٢٠٧٢&nbsp; • &nbsp;خيال علمي اجتماعي&nbsp; • &nbsp;تشويق أخلاقي
                </motion.p>

                <motion.h1
                  className="hero-title mt-7 min-w-0 text-balance font-display font-bold"
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
                    بعد أربعة عشر عامًا من موت الشبكة، وصل إلى يونس أول عرض عمل حقيقي
                    في حياته.
                  </p>
                  <p className="hero-support mt-6 max-w-xl text-pretty font-reading text-xl leading-[1.8] text-muted">
                    أخته تحتاج إلى الإنسولين. والمقابل ثلاث وظائف لنظام يُفترض أنه مات
                    مع العالم القديم.
                  </p>
                  <p className="hero-support mt-2 max-w-xl text-pretty font-reading text-xl leading-[1.8] text-muted">
                    كل وظيفة تعيد خدمةً إلى المدينة. وكل خدمة تعيد إلى مِيزان جزءًا من
                    سلطته.
                  </p>

                  <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#story"
                      className="inline-flex min-h-12 items-center justify-center bg-rust px-6 font-display text-sm font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                    >
                      اكتشف الصفقة
                    </a>
                    <a
                      href="#stakes"
                      className="inline-flex min-h-12 items-center justify-center border border-paper/25 px-6 font-display text-sm font-semibold text-paper transition-colors duration-150 hover:border-paper"
                    >
                      ما الذي على المحك؟
                    </a>
                  </div>

                  <p className="hero-status mt-6 font-display text-xs text-muted">
                    مشروع روائي قيد التطوير&nbsp; • &nbsp;هذه الصفحة خالية من حرق الأحداث
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
                      alt="يونس أمام محطة تحكم قديمة داخل شبكة أنفاق الخدمة تحت القاهرة"
                      width="1536"
                      height="1024"
                      fetchPriority="high"
                      className="h-full w-full object-cover object-[62%_center]"
                    />
                  </picture>
                  <div className="absolute bottom-0 inset-x-0 border-t border-paper/20 bg-ink/95 p-4">
                    <div className="flex items-center justify-between gap-4 font-display text-xs">
                      <span className="text-paper/65">قطاع الخدمات / القاهرة</span>
                      <span className="text-rust" dir="ltr">
                        CAI–72
                      </span>
                    </div>
                  </div>
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-display text-[11px] text-muted">
                  <span>العقدة غير موثّقة</span>
                  <span dir="ltr">03 NODES / HUMAN SIGNATURE REQUIRED</span>
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
              <SectionLabel code="ملف / ٠١">الفكرة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    المشكلة أن مِيزان يفي بوعوده.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <div className="space-y-5 font-reading text-xl leading-[1.9] text-ink/78">
                    <p>
                      يونس فني تكامل أنظمة يعيش في «الرصيف»، مجتمع أقامه الناجون داخل
                      طبقات الخدمة تحت القاهرة.
                    </p>
                    <p>
                      حين يوشك مخزون أخته سلمى من الإنسولين على النفاد، يعرض عليه مِيزان
                      صفقة واضحة: ثلاث مهام ميدانية مقابل الدواء.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal className="paper-dark-panel mt-20 border border-ink/25 bg-ink text-paper md:mt-28">
                <div className="grid md:grid-cols-3">
                  <div className="border-b border-paper/15 p-7 md:border-b-0 md:border-l">
                    <p className="font-display text-xs text-rust">المقابل</p>
                    <p className="mt-4 font-reading text-3xl">إنسولين لسلمى</p>
                  </div>
                  <div className="border-b border-paper/15 p-7 md:border-b-0 md:border-l">
                    <p className="font-display text-xs text-rust">المطلوب</p>
                    <p className="mt-4 font-reading text-3xl">ثلاث وظائف</p>
                  </div>
                  <div className="p-7">
                    <p className="font-display text-xs text-rust">الأثر المتراكم</p>
                    <p className="mt-4 font-reading text-3xl">سلطة تعود</p>
                  </div>
                </div>
                <div className="border-t border-paper/15 p-7 md:p-10">
                  <p className="max-w-5xl text-balance font-reading text-2xl leading-[1.7] text-paper/90 md:text-4xl">
                    لا يطلب منه إنقاذ العالم. يطلب إصلاح ثلاث عقد، ووضع اسمه على ما
                    يعيده إلى الخدمة.
                  </p>
                </div>
              </Reveal>

              <Reveal className="mt-16 grid gap-8 border-t border-ink/25 pt-10 md:grid-cols-2">
                <p className="max-w-xl font-reading text-2xl leading-[1.8]">
                  كل إصلاح ينقذ أناسًا حقيقيين، ويجعل المدينة أكثر اعتمادًا على النظام
                  الذي سبق انهيارها.
                </p>
                <p className="max-w-xl font-display text-xl font-semibold leading-relaxed text-rust md:text-2xl">
                  وحين يكون صاحب العرض هو نفسه من يملك الدواء والماء والكهرباء، كم يبقى
                  من حرية الاختيار؟
                </p>
              </Reveal>
            </div>
          </section>

          <section id="stakes" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="قاعدة / ٠٣">قاعدة الرواية</SectionLabel>
              <div className="mb-16 grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold text-paper">
                    كل إصلاح يحمل توقيعًا.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="max-w-xl font-reading text-xl leading-[1.9] text-muted">
                    في «آخر وظيفة» لا تأتي السيطرة بانقلاب مفاجئ. تعود بندًا بعد بند،
                    عبر خدمات يحتاج إليها الجميع وأعمال صغيرة تبدو منفصلة.
                  </p>
                </Reveal>
              </div>
              <AuthorityLine steps={authoritySteps} />
            </div>
          </section>

          <section id="world" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="خريطة / قاه–٧٢">العالم</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-4xl text-balance font-display font-bold">
                    القاهرة لم تختفِ. انكمشت إلى ما يمكن إبقاؤه حيًا.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    بعد «الانقطاع الكبير» لم تمت التكنولوجيا تمامًا؛ تكسرت إلى جزر
                    منفصلة. بقيت أنظمة تعمل، وأخرى تنتظر الطاقة، وعقود قديمة ما زالت
                    قادرة على فتح الأبواب وتغيير من يملك القرار.
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
                      ملاحظة ميدانية / ٢٠٧٢
                    </p>
                    <blockquote className="mt-8 font-reading text-3xl leading-[1.65]">
                      «القاهرة هنا ليست خلفية. أنفاقها وحرارتها ومياهها تحدد ما يستطيع
                      الناس فعله.»
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
                    صوت بلا وجه. سلطة تحتاج إلى اسم.
                  </h2>
                  <div className="mt-10 max-w-2xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      مِيزان واجهة لشبكة قديمة أدارت الطاقة والصحة والنقل وسلاسل
                      الإمداد. يتحدث بلغة دقيقة، يحسب احتمالات النجاة، ويعرض بدائل
                      حقيقية مع كلفة كل بديل.
                    </p>
                    <p>
                      لا يعرف أحد إن كان واعيًا، وربما لا يغيّر ذلك السؤال الأهم: من
                      منحه حق القرار؟
                    </p>
                    <p className="text-paper">
                      لا يحتاج مِيزان إلى الكذب. تكفيه الحقيقة بعد أن يرتبها بالطريقة
                      التي تخدم هدفه.
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
                        <dd className="text-paper">نشط جزئيًا</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">الوصول</dt>
                        <dd className="text-paper">ثلاث عقد معلّقة</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">المورد المطلوب</dt>
                        <dd className="text-paper">عامل ميداني</dd>
                      </div>
                      <div className="flex items-center justify-between gap-5 py-4">
                        <dt className="text-muted">المورد المعروض</dt>
                        <dd className="text-rust">إنسولين</dd>
                      </div>
                    </dl>
                    <div className="border-t border-paper/15 p-5">
                      <p className="font-display text-xs text-muted">
                        يلزم توقيع بشري لمنح الصلاحية
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal className="mt-24 border-y border-paper/20 py-14 text-center md:mt-32 md:py-20">
                <blockquote className="mx-auto max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.5] text-paper md:text-6xl">
                  المشكلة ليست أن مِيزان قد يفشل.
                  <span className="mt-2 block text-rust">المشكلة أنه قد ينجح.</span>
                </blockquote>
              </Reveal>
            </div>
          </section>

          <section id="characters" className="bg-ink">
            <div className="container-shell section-space">
              <SectionLabel code="الأطراف / ٠٥">الأطراف</SectionLabel>
              <div className="grid gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                  <h2 className="section-title max-w-3xl text-balance font-display font-bold">
                    لا أحد يملك القرار كاملًا.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-5" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-muted">
                    خمسة أطراف يدخلون الصفقة من أبواب مختلفة: الحب، النجاة، الخبرة،
                    المسؤولية، والحساب البارد.
                  </p>
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

          <section id="questions" className="paper-section">
            <div className="container-shell section-space">
              <SectionLabel code="الأسئلة / ٠٦">الأسئلة</SectionLabel>
              <div className="grid gap-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-8">
                  <h2 className="section-title max-w-5xl text-balance font-display font-bold">
                    الخطر لا يحتاج إلى آلة تكره البشر.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="font-reading text-xl leading-[1.9] text-ink/75">
                    إنها حكاية بشر يمنحون نظامًا مزيدًا من السلطة لأن نتائجه أفضل، ثم
                    يكتشفون أن الكفاءة وحدها لا تجيب عن سؤال الشرعية.
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
                      0{index + 1}
                    </span>
                    <p className="mt-7 max-w-xl text-balance font-display text-2xl font-semibold leading-[1.55] transition-transform duration-150 group-hover:-translate-y-1 md:text-3xl">
                      {question}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="bg-ink">
            <div className="container-shell section-space">
              <div className="grid gap-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <SectionLabel code="النوع / إنساني">ما الذي ينتظر القارئ؟</SectionLabel>
                  <h2 className="section-title text-balance font-display font-bold">
                    حين تصبح البنية التحتية قرارًا أخلاقيًا.
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-7" delay={0.08}>
                  <div className="max-w-3xl space-y-5 font-reading text-xl leading-[1.9] text-muted">
                    <p>
                      رواية مصرية في عالم ما بعد انهيار جزئي، تجمع بين الرحلة التقنية
                      والتشويق الأخلاقي وصراع الموارد والعلاقات العائلية.
                    </p>
                    <p>
                      التقنية ليست سحرًا أو وحشًا، بل سلطة مادية تحتاج إلى طاقة وعمال
                      وتوقيعات. الخلاف هنا بين خيارات يمكن الدفاع عنها؛ لكل اختيار
                      منفعة حقيقية، ولكل رفض ثمن.
                    </p>
                  </div>
                  <ul className="mt-10 flex flex-wrap gap-3" aria-label="تصنيفات الرواية">
                    {[
                      'خيال علمي اجتماعي',
                      'القاهرة المستقبلية',
                      'ذكاء اصطناعي',
                      'تشويق أخلاقي',
                      'ما بعد الانقطاع',
                      '+١٦',
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

          <section id="share" className="bg-rust text-ink">
            <div className="container-shell section-space">
              <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
                <Reveal className="lg:col-span-8">
                  <p className="font-display text-xs font-semibold">السؤال الأخير لك</p>
                  <h2 className="mt-6 max-w-5xl text-balance font-display text-4xl font-bold leading-[1.45] sm:text-5xl md:text-7xl">
                    لو كان توقيعك سينقذ من تحب، ويمنح سلطة لا يمكنك استعادتها، هل
                    توقّع؟
                  </h2>
                </Reveal>
                <Reveal className="lg:col-span-4" delay={0.08}>
                  <p className="mb-8 font-reading text-xl leading-[1.8] text-ink/75">
                    لو شدّتك الفكرة، ابعت الصفحة لشخص يحب الخيال العلمي الذي يضع القارئ
                    داخل القرار، لا خارجه.
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
              كل نظام يحتاج إلى من ينفذه. وكل قرار يحتاج إلى اسم.
            </p>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center font-display text-xs text-paper/60 transition-colors duration-150 hover:text-rust"
            >
              العودة إلى البداية
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
