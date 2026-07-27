import { motion, useReducedMotion, useScroll } from 'motion/react'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-right bg-rust"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
