import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteUrl } from './site-url'

// CSS 압축 단계에서 바뀌는 그라데이션 색과 투명도를 시안 그대로 유지한다.
const globalCss = readFileSync(join(process.cwd(), 'app', 'globals.css'), 'utf8')

export const metadata: Metadata = {
  title: '한잔해 — 물 한 잔이 정원이 되는 습관',
  description: '물을 마실 때마다 바탕화면 위 정원이 자라요. 로그인 없이 Mac에서 바로 쓰는 물 마시기 습관 앱, 한잔해.',
  metadataBase: siteUrl,
  alternates: { canonical: '/' }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
