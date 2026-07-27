import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.18 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={
        reduceMotion
          ? undefined
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
