import { useState } from 'react'

const shareTitle = 'آخر وظيفة — رواية من القاهرة ٢٠٧٢'
const shareText =
  'أقل من ثلاثة أيام قبل أن ينفد دواء سلمى. لدى مِيزان ما ينقذها، وثمنه ثلاث وظائف يوقّعها يونس باسمه.'

export function ShareActions() {
  const [status, setStatus] = useState('')

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setStatus('نُسخ رابط الرواية.')
    } catch {
      setStatus('تعذّر النسخ تلقائيًا؛ يمكنك نسخ الرابط من شريط العنوان.')
    }
  }

  async function sharePage() {
    if (!navigator.share) {
      await copyLink()
      return
    }

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      })
      setStatus('فُتحت خيارات المشاركة.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
      setStatus('تعذّر فتح المشاركة؛ يمكنك نسخ الرابط بدلًا من ذلك.')
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={sharePage}
          className="inline-flex min-h-12 items-center justify-center border border-ink bg-ink px-6 font-display text-sm font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          أرسل صفحة «آخر وظيفة»
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-h-12 items-center justify-center border border-ink/30 bg-transparent px-6 font-display text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink focus-visible:border-ink"
        >
          انسخ الرابط
        </button>
      </div>
      <p className="mt-3 min-h-6 font-display text-sm text-ink" aria-live="polite">
        {status}
      </p>
    </div>
  )
}
