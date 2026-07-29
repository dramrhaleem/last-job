import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './Reveal'

export type AuthorityStep = {
  number: string
  code: string
  title: string
  effect: string
  meaning: string
}

type AuthorityLineProps = {
  steps: AuthorityStep[]
}

export function AuthorityLine({ steps }: AuthorityLineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 78%', 'end 42%'],
  })
  const progress = reduceMotion ? 1 : scrollYProgress

  return (
    <div ref={sectionRef} className="relative">
      <div className="relative hidden md:block" aria-hidden="true">
        <div className="absolute inset-x-0 top-5 h-px bg-concrete" />
        <motion.div
          className="absolute inset-x-0 top-5 h-px origin-right bg-rust"
          style={{ scaleX: progress }}
        />
        <div className="grid grid-cols-3">
          {steps.map((step) => (
            <div key={step.code} className="flex justify-center">
              <span className="relative grid size-10 place-items-center border border-paper/30 bg-ink font-display text-sm text-paper">
                {step.number}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-5 top-0 w-px bg-concrete md:hidden" aria-hidden="true">
        <motion.div
          className="h-full w-px origin-top bg-rust"
          style={{ scaleY: progress }}
        />
      </div>

      <ol className="mt-0 grid gap-0 md:mt-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li
            key={step.code}
            className="relative border-b border-paper/15 py-10 pe-16 last:border-b-0 md:border-b-0 md:border-e md:px-6 md:py-0 md:first:pe-0 md:last:border-e-0 md:last:ps-0"
          >
            <span
              className="absolute right-0 top-10 grid size-10 place-items-center border border-paper/30 bg-ink font-display text-sm text-paper md:hidden"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <Reveal delay={index * 0.08}>
              <p className="font-display text-xs text-rust">
                {step.code}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                {step.title}
              </h3>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="font-display text-xs text-muted">ما يحدث فورًا</dt>
                  <dd className="mt-2 font-reading text-xl leading-relaxed text-paper">
                    {step.effect}
                  </dd>
                </div>
                <div className="border-r-2 border-rust pr-4">
                  <dt className="font-display text-xs text-muted">ما يتركه وراءه</dt>
                  <dd className="mt-2 font-reading text-lg leading-relaxed text-paper/85">
                    {step.meaning}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
