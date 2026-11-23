import type { CSSProperties } from 'react'
import LandingInteractions from './landing-interactions'


function Navigation() {
  return (
    <nav className="nav">
      <div className="wrap">
        <a className="brand" href="#"><img src="/assets/icons/wordmark.webp" alt="한잔해" /></a>
        <ul>
          <li><a href="#features">기능 소개</a></li>
          <li><a href="#how">사용 방법</a></li>
          <li><a href="#faq">자주 묻는 질문</a></li>
        </ul>
        <a className="nav-cta" href="#download">무료 다운로드</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero-box">
      <h1>물 한 잔 마실 때마다,<br /><em>내 정원</em>이 자라요</h1>
      <p className="lead">바탕화면 위 작은 화분에 물을 주며 하루 물 마시기 목표를 채워 보세요.</p>
      <div className="cta-row">
        <a className="btn btn-main" href="#download">macOS용 다운로드</a>
        <a className="btn btn-ghost" href="#features">기능 살펴보기</a>
      </div>
      <p className="hero-note">무료 · 로그인 없이 바로 시작 · Apple Silicon Mac</p>

      <div className="hero-stage">
        <span className="cloud k1"></span><span className="cloud k2"></span><span className="cloud k3"></span>
        <svg className="hills" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 90 C 260 30, 520 40, 760 80 S 1220 40, 1440 70 L1440 150 L0 150 Z" fill="#c9ecb2"/>
          <path d="M0 120 C 300 80, 560 96, 800 112 S 1240 90, 1440 110 L1440 150 L0 150 Z" fill="#a9dd8c"/>
        </svg>
        <img className="hero-drop d1" src="/assets/icons/drop.webp" alt="" />
        <img className="hero-drop d2" src="/assets/icons/drop.webp" alt="" />
        <img className="hero-drop d3" src="/assets/icons/drop.webp" alt="" />
        <div className="float-card c1"><img src="/assets/icons/stat-cups.webp" alt="" /><div><b>오늘 5 / 8잔</b><span>목표까지 3잔 남았어요</span></div></div>
        <div className="float-card c2"><img src="/assets/icons/stat-vit.webp" alt="" /><div><b>생기 +1</b><span>카메라로 마신 걸 감지했어요</span></div></div>
        <div className="float-card c3"><img src="/assets/icons/stat-streak.webp" alt="" /><div><b>12일 연속</b><span>꽃이 피기 시작했어요</span></div></div>
        <img className="hero-plant" src="/assets/stage4.webp" alt="꽃이 핀 화분" />
      </div>
    </header>
  )
}

function Features() {
  return (
    <section className="block" id="features">
        <div className="wrap">
          <div className="sec-head">
            <h2>잊기 쉬운 물 한 잔,<br />한잔해가 <em>챙겨 드려요</em></h2>
          </div>

          <div className="feature">
            <div className="f-text">
              <span className="f-eyebrow"><b>01</b>바탕화면 정원</span>
              <h3>화면 한쪽에<br />늘 보이는 화분</h3>
              <ul className="points">
                <li><img src="/assets/icons/watering-can.webp" alt="" /><div><b>물뿌리개로 기록</b><span>텀블러를 비우면 화분을 눌러 물을 줘요</span></div></li>
                <li><img src="/assets/icons/nav-today.webp" alt="" /><div><b>원하는 자리에</b><span>끌어서 옮기고, 다른 창 위에 띄워요</span></div></li>
                <li><img src="/assets/icons/nav-settings.webp" alt="" /><div><b>빠르게 숨기기</b><span>⌘ ⌥ ⇧ H 로 보이기·숨기기</span></div></li>
              </ul>
            </div>
            <div className="visual sky">
              <div className="desk">
                <div className="bubble">텀블러 500ml 기록했어요</div>
                <img className="can" src="/assets/icons/watering-can.webp" alt="" />
                <img className="pot" src="/assets/stage3.webp" alt="화분" />
              </div>
            </div>
          </div>
          <div className="feature rev">
            <div className="f-text">
              <span className="f-eyebrow"><b>02</b>카메라 자동 감지</span>
              <h3>마시기만 하면<br />자동으로 기록</h3>
              <ul className="points">
                <li><img src="/assets/icons/stat-cups.webp" alt="" /><div><b>마시는 동작 인식</b><span>컵을 들고 마시면 한 잔으로 기록해요</span></div></li>
                <li><img src="/assets/icons/drop.webp" alt="" /><div><b>바로 되돌리기</b><span>잘못 잡히면 8초 안에 취소해요</span></div></li>
                <li><img src="/assets/icons/logo.webp" alt="" /><div><b>내 Mac에서만</b><span>영상은 저장하거나 보내지 않아요</span></div></li>
              </ul>
            </div>
            <div className="visual">
              <div className="steps-card">
                <h5>마시는 동작 인식 <span>영상은 이 Mac에서만 처리</span></h5>
                <ol>
                  <li className="on"><i>1</i><div>컵이나 병을 들어요<small>손에 든 걸 찾았어요</small></div></li>
                  <li className="on"><i>2</i><div>입으로 가져가요<small>입에 댄 걸 찾았어요</small></div></li>
                  <li className="on"><i>3</i><div>고개를 젖히거나 빨대로 마셔요<small>마시는 걸 봤어요</small></div></li>
                </ol>
              </div>
              <div className="toast"><img src="/assets/icons/drop.webp" alt="" /><div><b>물 마신 걸 기록했어요</b><span>오늘 5회 · 목표 8회</span></div><span className="undo">되돌리기</span></div>
            </div>
          </div>
          <div className="feature">
            <div className="f-text">
              <span className="f-eyebrow"><b>03</b>생기와 성장</span>
              <h3>마실수록 싱싱하게,<br />꽃이 필 때까지</h3>
              <ul className="points">
                <li><img src="/assets/icons/stat-vit.webp" alt="" /><div><b>생기</b><span>마시면 오르고, 오래 쉬면 시들어요</span></div></li>
                <li><img src="/assets/icons/stat-streak.webp" alt="" /><div><b>성장</b><span>쌓일수록 새싹에서 꽃으로 자라요</span></div></li>
                <li><img src="/assets/icons/nav-history.webp" alt="" /><div><b>진행률</b><span>다음 단계까지 남은 정도를 보여 줘요</span></div></li>
              </ul>
            </div>
            <div className="visual sky">
              <div className="stage-row">
                <div><img src="/assets/stage1.webp" alt="" /><span>새싹</span></div>
                <div><img src="/assets/stage2.webp" alt="" /><span>어린 잎</span></div>
                <div><img src="/assets/stage3.webp" alt="" /><span>무성한 잎</span></div>
                <div><img src="/assets/stage4.webp" alt="" /><span>꽃</span></div>
              </div>
              <div className="vital">
                <div><img src="/assets/stage3.webp" alt="" /><div><b>생기 가득</b><i style={{ '--v': '90%' } as CSSProperties}></i><small>방금 한 잔 마셨어요</small></div></div>
                <div className="dry"><img src="/assets/stage3_wilted.webp" alt="" /><div><b>목말라요</b><i style={{ '--v': '35%' } as CSSProperties}></i><small>한참 못 마셨어요</small></div></div>
              </div>
            </div>
          </div>
          <div className="feature rev">
            <div className="f-text">
              <span className="f-eyebrow"><b>04</b>기록과 알림</span>
              <h3>한눈에 보는 기록,<br />잊지 않게 알림</h3>
              <ul className="points">
                <li><img src="/assets/icons/nav-today.webp" alt="" /><div><b>오늘 기록</b><span>버튼 한 번으로 기록하고 취소해요</span></div></li>
                <li><img src="/assets/icons/nav-history.webp" alt="" /><div><b>최근 7일</b><span>달성과 연속 기록을 확인해요</span></div></li>
                <li><img src="/assets/icons/nav-settings.webp" alt="" /><div><b>알림</b><span>정한 간격과 시간대에만 알려요</span></div></li>
              </ul>
            </div>
            <div className="visual sky">
              <div className="noti"><img src="/assets/icons/logo.webp" alt="" /><div><b>한잔해</b><p>물 마신 지 꽤 지났어요. 저도 조금 목이 말라요.</p></div><small>지금</small></div>
              <div className="chart">
                <h5>최근 7일 마신 횟수 <span>4일 연속 달성</span></h5>
                <div className="bars">
                  <span className="goal"></span>
                  <div style={{ height: '55%' }}><small>월</small></div>
                  <div className="on" style={{ height: '80%' }}><small>화</small></div>
                  <div style={{ height: '40%' }}><small>수</small></div>
                  <div className="on" style={{ height: '95%' }}><small>목</small></div>
                  <div className="on" style={{ height: '78%' }}><small>금</small></div>
                  <div className="on" style={{ height: '84%' }}><small>토</small></div>
                  <div className="on" style={{ height: '76%' }}><small>오늘</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

function HowTo() {
  return (
    <section className="block" id="how">
        <div className="wrap">
          <div className="sec-head">
            <h2><em>네 단계</em>면 시작할 수 있어요</h2>
            <p>계정 없이, 기록은 내 Mac에만 저장돼요.</p>
          </div>
          <div className="steps">
            <div className="step"><img src="/assets/icons/logo.webp" alt="" /><small>STEP 01</small><h3>설치</h3><p>DMG를 열어 응용 프로그램으로 옮겨요</p></div>
            <div className="step"><img src="/assets/icons/stat-cups.webp" alt="" /><small>STEP 02</small><h3>목표 정하기</h3><p>하루 잔 수와 텀블러 용량을 입력해요</p></div>
            <div className="step"><img src="/assets/icons/watering-can.webp" alt="" /><small>STEP 03</small><h3>기록하기</h3><p>한 잔은 버튼·카메라, 텀블러는 물뿌리개</p></div>
            <div className="step"><img className="pot" src="/assets/stage2.webp" alt="" /><small>STEP 04</small><h3>화분 가꾸기</h3><p>틈틈이 마시며 꽃을 피워요</p></div>
          </div>
        </div>
      </section>
  )
}

function Faq() {
  return (
    <section className="block" id="faq">
        <div className="wrap faq">
          <div className="faq-head">
            <h2>자주 묻는<br /><em>질문</em></h2>
            <p>찾는 답이 없다면 편하게 물어봐 주세요.</p>
            <button type="button" className="btn btn-ghost" data-open="contact">문의하기</button>
          </div>
          <div className="faq-list">
              <details><summary>무료인가요?</summary><p>네, 모든 기능을 무료로 쓸 수 있어요. 계정이나 로그인도 필요 없어요.</p></details>
              <details><summary>어떤 Mac에서 쓸 수 있나요?</summary><p>Apple Silicon(M1 이상) Mac에서 쓸 수 있어요. Intel Mac은 아직 지원하지 않아요.</p></details>
              <details><summary>카메라가 계속 저를 보고 있나요?</summary><p>설정에서 카메라 감지를 켰을 때만 동작해요. 영상은 이 Mac 안에서 바로 분석하고, 저장하거나 밖으로 보내지 않아요.</p></details>
            <details><summary>&apos;한 잔&apos;과 &apos;텀블러&apos;는 뭐가 달라요?</summary><p>한 잔은 마신 횟수예요. 버튼이나 카메라로 기록해요. 텀블러는 마신 양이에요. 텀블러를 다 비우면 물뿌리개로 기록해요.</p></details>
              <details><summary>화분이 시들면 다시 살아나나요?</summary><p>네. 생기는 물을 마시면 다시 올라요. 지금까지 자란 성장은 줄지 않아요.</p></details>
              <details><summary>바탕화면 화분을 잠깐 숨기고 싶어요.</summary><p>화분을 우클릭하거나 ⌘ ⌥ ⇧ H를 누르면 숨겨져요. 메뉴 막대에서 다시 꺼낼 수 있어요.</p></details>
              <details><summary>기록을 옮기거나 지울 수 있나요?</summary><p>설정 › 기록 관리에서 CSV로 내보내거나 모든 기록을 지울 수 있어요. 지우기 전에 사본을 남겨 둬요.</p></details>
          </div>
        </div>
      </section>
  )
}

function Download() {
  return (
    <section className="download" id="download">
        <div className="wrap">
          <div className="dl-card">
            <div>
              <h2>오늘부터 한 잔씩,<br />내 정원을 키워 보세요</h2>
              <p>설치하면 바로 바탕화면에 화분이 생겨요.</p>
              <div className="dl-actions">
                <a className="btn btn-main" href="https://github.com/Heo-zip/hanzanhae-releases/releases/latest/download/hanzanhae-mac-arm64.dmg">macOS용 다운로드</a>
              </div>
              <p className="meta">무료 · 로그인 없음 · Apple Silicon Mac</p>
            </div>
            <div className="dl-visual" aria-hidden="true">
              <span className="cloud k1"></span><span className="cloud k2"></span>
              <svg className="hills" viewBox="0 0 600 110" preserveAspectRatio="none">
                <path d="M0 60 C 120 20, 260 30, 360 56 S 520 30, 600 46 L600 110 L0 110 Z" fill="#c9ecb2"/>
                <path d="M0 86 C 140 60, 280 72, 400 82 S 540 68, 600 78 L600 110 L0 110 Z" fill="#a9dd8c"/>
              </svg>
              <img className="can" src="/assets/icons/watering-can.webp" alt="" />
              <img className="drop a" src="/assets/icons/drop.webp" alt="" /><img className="drop b" src="/assets/icons/drop.webp" alt="" />
              <img className="pot" src="/assets/stage4.webp" alt="" />
            </div>
          </div>
        </div>
      </section>
  )
}

function Footer() {
  return (
    <footer>
      <svg className="hill-top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 C 240 10, 480 0, 720 24 S 1200 50, 1440 8 L1440 60 Z" fill="#f5f9f6"/></svg>
      <img className="pot-peek" src="/assets/stage2.webp" alt="" />
      <div className="wrap">
        <div className="foot-main">
          <div>
            <a className="brand" href="#"><img src="/assets/icons/wordmark.webp" alt="한잔해" /></a>
            <p className="tagline">물 한 잔이 정원이 되는 습관.<br />오늘도 내 화분에 물 한 잔 주세요.</p>
            <a className="mini-cta" href="#download"><img src="/assets/icons/drop.webp" alt="" />무료로 시작하기</a>
          </div>
          <div>
            <h4>서비스</h4>
            <ul><li><a href="#features">기능 소개</a></li><li><a href="#how">사용 방법</a></li><li><a href="#download">다운로드</a></li></ul>
          </div>
          <div>
            <h4>도움말</h4>
            <ul><li><a href="#how">설치 안내</a></li><li><a href="#faq">자주 묻는 질문</a></li></ul>
          </div>
          <div>
            <h4>정보</h4>
            <ul><li><button type="button" data-open="privacy">개인정보 처리 안내</button></li><li><button type="button" data-open="contact">문의하기</button></li><li><a href="https://github.com/Heo-zip">GitHub</a></li></ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Heo-zip. All rights reserved.</span>
          <span className="local"><img src="/assets/icons/logo.webp" alt="" />모든 기록은 내 Mac에만 저장돼요</span>
        </div>
      </div>
    </footer>
  )
}

function PrivacyDialog() {
  return (
    <dialog className="privacy" id="privacy" aria-labelledby="privacy-title">
      <div className="p-head">
        <div><h3 id="privacy-title">개인정보 처리 안내</h3><small>시행일 2026년 11월 20일</small></div>
        <button type="button" className="x" data-close="" aria-label="닫기">×</button>
      </div>
      <div className="p-body">
        <div className="p-sum">
          <div><img src="/assets/icons/logo.webp" alt="" /><b>계정·서버 없이<br />동작해요</b></div>
          <div><img src="/assets/icons/nav-history.webp" alt="" /><b>기록은 내 Mac에만<br />저장돼요</b></div>
          <div><img src="/assets/icons/stat-cups.webp" alt="" /><b>카메라 영상은<br />저장하지 않아요</b></div>
        </div>

        <h4>1. 앱이 저장하는 정보</h4>
        <p>하루 목표 횟수와 텀블러 용량, 마신 횟수와 텀블러 기록, 화분의 생기·성장, 알림·위치 등 설정을 내 Mac의 앱 데이터 폴더에만 저장해요. 개발자를 포함해 누구에게도 전송되지 않아요.</p>

        <h4>2. 카메라</h4>
        <ul>
          <li>설정에서 카메라 감지를 켰을 때만 동작해요.</li>
          <li>영상은 이 Mac에서 바로 분석하고, 사진이나 영상을 저장·전송하지 않아요.</li>
          <li>권한은 시스템 설정 › 개인정보 보호 및 보안 › 카메라에서 끌 수 있어요.</li>
        </ul>

        <h4>3. 외부와 주고받는 정보</h4>
        <ul>
          <li><b>앱 업데이트</b> 새 버전 확인을 위해 GitHub에 접속해요. 이때 IP 주소 같은 접속 정보가 GitHub에 전달될 수 있어요. 물 기록과 설정은 보내지 않아요.</li>
          <li><b>이 웹사이트</b> 호스팅 업체가 운영을 위해 접속 기록을 처리할 수 있어요. 분석 도구나 광고 쿠키는 쓰지 않아요.</li>
          <li><b>문의 메일</b> 보내 주신 이메일 주소와 내용은 답변에만 사용해요.</li>
        </ul>

        <h4>4. 내보내기와 삭제</h4>
        <p>설정 › 기록 관리에서 CSV로 내보내거나 모든 기록을 지울 수 있어요. 앱과 앱 데이터 폴더를 지우면 모든 기록이 사라져요.</p>

        <h4>5. 문의</h4>
        <p>개인정보 관련 문의는 <a href="mailto:ja2x0n09@gmail.com">ja2x0n09@gmail.com</a>으로 보내 주세요. 내용이 바뀌면 이 안내에 시행일과 함께 알려 드려요.</p>
      </div>
    </dialog>
  )
}

function ContactDialog() {
  return (
    <dialog className="contact" id="contact" aria-labelledby="contact-title">
      <img src="/assets/icons/logo.webp" alt="" />
      <h3 id="contact-title">문의하기</h3>
      <p>버그 제보, 기능 제안, 궁금한 점 모두 메일로 보내 주세요.</p>
      <div className="mail-row"><span>ja2x0n09@gmail.com</span><button type="button" data-copy="">복사</button></div>
      <div className="actions">
        <button type="button" className="btn btn-ghost" data-close="">닫기</button>
        <a className="btn btn-main" href="mailto:ja2x0n09@gmail.com?subject=%5B%ED%95%9C%EC%9E%94%ED%95%B4%5D%20%EB%AC%B8%EC%9D%98">메일 쓰기</a>
      </div>
    </dialog>
  )
}

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <main>
        <Features />
        <HowTo />
        <Faq />
        <Download />
      </main>
      <Footer />
      <PrivacyDialog />
      <ContactDialog />
      <LandingInteractions />
    </>
  )
}
