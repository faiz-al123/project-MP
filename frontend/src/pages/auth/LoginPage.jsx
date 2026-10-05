import { useState } from 'react'
import loginImage from '../../assets/login1.png'

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="10" rx="1" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1" />
    </svg>
  )
}

function EyeIcon({ hidden }) {
  if (hidden) {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4 9.5 7-.4 1.2-1.2 2.5-2.3 3.6" />
        <path d="M6.2 6.2C4.4 7.4 3.2 9.2 2.5 12c1 3 4.5 7 9.5 7 1 0 1.9-.2 2.8-.5" />
      </svg>
    )
  }

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Data login:', {
      email: formData.email,
      password: formData.password,
      rememberMe,
    })

    // Backend belum dihubungkan.
    // Nanti akan menggunakan auth.api.js.
  }

  return (
    <main className="login-page">
      {/* =========================
          BAGIAN KIRI
      ========================== */}
      <section className="login-left">
        <img
          src={loginImage}
          alt="FiNote - Kelola Keuangan, Raih Masa Depan"
        />
      </section>

      {/* =========================
          BAGIAN KANAN
      ========================== */}
      <section className="login-right">
        <div className="login-container">
          <h1>Selamat Datang</h1>

          <p className="login-subtitle">
            masuk ke akun FiNote kamu
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="login-input">
              <span className="input-icon">
                <MailIcon />
              </span>

              <input
                type="text"
                name="email"
                placeholder="Email atau nomor HP"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            {/* PASSWORD */}
            <div className="login-input">
              <span className="input-icon">
                <LockIcon />
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? 'Sembunyikan password'
                    : 'Tampilkan password'
                }
              >
                <EyeIcon hidden={!showPassword} />
              </button>
            </div>

            {/* REMEMBER + FORGOT PASSWORD */}
            <div className="login-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span className="custom-checkbox"></span>

                <span>ingat saya</span>
              </label>

              <a
                href="#"
                className="forgot-password"
                onClick={(event) => event.preventDefault()}
              >
                Lupa password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
            >
              Masuk
            </button>
          </form>

          {/* REGISTER */}
          <p className="register-text">
            belum punya akun?{' '}
            <a
              href="#"
              className="register-link"
              onClick={(event) => event.preventDefault()}
            >
              Daftar disini
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage