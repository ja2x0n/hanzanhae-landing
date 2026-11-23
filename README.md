# 한잔해 랜딩페이지

물 마시는 습관을 돕는 macOS 앱 한잔해의 소개 및 다운로드 페이지입니다. Next.js App Router로 구현했으며, 배포 시점에 정적 HTML을 생성합니다.

## 로컬 실행

```sh
npm ci
npm run dev
```

[localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## Vercel 배포

1. 이 저장소를 Vercel에 연결하고 Framework Preset을 **Next.js**로 설정합니다. Root Directory는 저장소 최상단을 사용합니다.
2. Production 환경 변수 `NEXT_PUBLIC_SITE_URL`에 `https://`를 포함한 공개 주소를 설정합니다. 이 주소는 대표 URL, `sitemap.xml`, `robots.txt`에 반영됩니다.
3. 배포 후 도메인을 연결하거나 환경 변수를 변경했다면 다시 배포합니다.

다운로드 버튼은 GitHub의 최신 공개 릴리스에서 `hanzanhae-mac-arm64.dmg`를 내려받습니다. 같은 이름으로 앱을 새로 릴리스하면 페이지를 재배포하지 않아도 새 파일을 받을 수 있습니다. [한잔해 릴리스](https://github.com/Heo-zip/hanzanhae-releases/releases)

## 검증

```sh
npm run build
npm run lint
npm run typecheck
```

`npm run build`는 정적 사이트를 `out/`에 생성합니다. 원본 시안과 Google Chrome이 있다면 빌드 후 `npm run verify:landing -- /시안/경로/landing.html`으로 화면 차이와 인터랙션을 검증할 수 있습니다. 결과는 `qa-output/`에 저장되며, 대표 URL을 지정해 빌드했다면 검증에도 같은 환경 변수를 사용합니다.
