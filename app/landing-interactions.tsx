'use client'

import { useEffect } from 'react'

export default function LandingInteractions() {
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const nav = document.querySelector('.nav')
    window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 8), {
      passive: true,
      signal
    })

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav ul a'))
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.toggle('on', link.hash === '#' + entry.target.id))
        }
      }
    }, { rootMargin: '-45% 0px -50% 0px' })
    for (const link of links) {
      const section = document.querySelector(link.hash)
      if (section) observer.observe(section)
    }

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelectorAll<HTMLDetailsElement>('.faq-list details').forEach((details) => {
      const body = details.querySelector('p')
      if (!body) return
      details.querySelector('summary')?.addEventListener('click', (event) => {
        if (calm) return
        event.preventDefault()
        body.getAnimations().forEach((animation) => animation.cancel())

        const opening = !details.open
        if (opening) details.open = true
        const full = body.scrollHeight + 'px'
        const animation = body.animate(
          [
            { height: opening ? '0px' : full, opacity: opening ? 0 : 1, paddingBottom: opening ? '0px' : '22px' },
            { height: opening ? full : '0px', opacity: opening ? 1 : 0, paddingBottom: opening ? '22px' : '0px' }
          ],
          { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' }
        )
        if (!opening) animation.onfinish = () => { details.open = false }
      }, { signal })
    })

    document.querySelectorAll<HTMLElement>('[data-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = document.getElementById(button.dataset.open ?? '')
        if (dialog instanceof HTMLDialogElement) dialog.showModal()
      }, { signal })
    })
    document.querySelectorAll('dialog').forEach((dialog) => {
      dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close(), { signal })
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close()
      }, { signal })
    })

    const copy = document.querySelector('[data-copy]')
    const copyTimers = new Set<number>()
    copy?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('ja2x0n09@gmail.com')
        copy.textContent = '복사됨'
      } catch {
        copy.textContent = '직접 복사해 주세요'
      }
      if (signal.aborted) return
      const timer = window.setTimeout(() => {
        copy.textContent = '복사'
        copyTimers.delete(timer)
      }, 1600)
      copyTimers.add(timer)
    }, { signal })

    return () => {
      controller.abort()
      observer.disconnect()
      copyTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return null
}
