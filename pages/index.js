import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <div className="inner">
        
        <div class="my5">
          <a href="smartsales://" className="btn">
            เปิดแอป
          </a>
        </div>

        <div class="my5">
          <a href="smartsales://auth-sso" className="btn">
             Login with SSO
          </a>
        </div>
      </div>
    </div>
  )
}
