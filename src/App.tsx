import { useEffect, useState } from 'react'

type AdminMeResponse = {
  authenticated: boolean
  authMode: 'mock' | 'oidc'
  user: null | {
    id: string
    email: string
    roles: string[]
  }
}

const fallbackMe: AdminMeResponse = {
  authenticated: false,
  authMode: 'mock',
  user: null,
}

export default function App() {
  const [me, setMe] = useState<AdminMeResponse>(fallbackMe)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    async function loadMe() {
      try {
        setStatus('loading')

        const response = await fetch('/api/me', {
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`BFF returned ${response.status}`)
        }

        const data = (await response.json()) as AdminMeResponse
        setMe(data)
        setStatus('success')
      } catch {
        setMe(fallbackMe)
        setStatus('error')
      }
    }

    void loadMe()
  }, [])

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">blue admin</p>
        <h1>Admin Front Skeleton</h1>
        <p className="description">
          React, TypeScript, Vite 기반 관리자 프론트엔드 초기 스켈레톤입니다.
        </p>

        <div className="status-grid">
          <div>
            <span className="label">BFF 연결 상태</span>
            <strong>{status}</strong>
          </div>
          <div>
            <span className="label">인증 모드</span>
            <strong>{me.authMode}</strong>
          </div>
          <div>
            <span className="label">로그인 여부</span>
            <strong>{me.authenticated ? 'authenticated' : 'anonymous'}</strong>
          </div>
        </div>

        <p className="note">
          현재 인증은 mock 상태입니다. OAuth2/OIDC 연동은 이후 Step에서 Admin BFF와 Admin Auth를
          통해 연결합니다.
        </p>
      </section>
    </main>
  )
}
