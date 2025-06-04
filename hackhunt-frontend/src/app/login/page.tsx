'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
localStorage.setItem('hackhuntUserEmail', email);
alert('Login successful!');
router.push('/dashboard');
    } else {
      const data = await res.json();
      alert(`Login failed: ${data.message}`);
    }
  };
  return (
    <main style={styles.main}>
      <div style={styles.grid}>
        {/* LEFT SIDE: Login Form */}
        <div style={styles.left}>
          <h1 style={styles.header}>Log in to HackHunt</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              style={styles.input}
              placeholder="Enter your email"
              required
            />

            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              style={styles.input}
              placeholder="Enter your password"
              required
            />

            <div style={styles.toggleRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              style={{
                ...styles.loginButton,
                boxShadow: hover ? '0 0 12px #7EC8E3' : 'none',
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Log In
            </button>
          </form>

          <div style={styles.buttonRow}>
            <Link href="/forgot-password">
              <button
                style={{
                  ...styles.linkButton,
                  boxShadow: hoveredLink === 'forgot' ? '0 0 12px #7EC8E3' : 'none',
                }}
                onMouseEnter={() => setHoveredLink('forgot')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Forgot Password
              </button>
            </Link>

            <Link href="/signup">
              <button
                style={{
                  ...styles.linkButton,
                  boxShadow: hoveredLink === 'signup' ? '0 0 12px #7EC8E3' : 'none',
                }}
                onMouseEnter={() => setHoveredLink('signup')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div> {/* ✅ Properly closed styles.left */}

        {/* RIGHT SIDE: Logo */}
        <div style={styles.right}>
          <img src="/logo.png" alt="HackHunt Logo" style={styles.logoImage} />
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: '#0D1B2A',
    color: '#7EC8E3',
    minHeight: '100vh',
    fontFamily: `'Cinzel Decorative', serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '3rem',
    maxWidth: '1100px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  left: {
    flex: 1,
    minWidth: '320px',
    maxWidth: '500px',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  logoImage: {
    width: '300px',
    maxWidth: '90%',
    height: 'auto',
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginBottom: '2rem',
  },
  label: {
    fontSize: '1rem',
    textAlign: 'left' as const,
    marginBottom: '0.25rem',
  },
  input: {
    padding: '0.6rem 1rem',
    borderRadius: '4px',
    border: '1px solid #7EC8E3',
    backgroundColor: 'transparent',
    color: '#7EC8E3',
    fontFamily: `'Cinzel Decorative', serif`,
    fontSize: '0.95rem',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  checkboxLabel: {
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
  },
  loginButton: {
    marginTop: '1.5rem',
    backgroundColor: 'transparent',
    color: '#7EC8E3',
    border: '2px solid #7EC8E3',
    padding: '0.7rem',
    fontSize: '1rem',
    fontFamily: `'Cinzel Decorative', serif`,
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  linkButton: {
    backgroundColor: 'transparent',
    border: '1px solid #7EC8E3',
    color: '#7EC8E3',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontFamily: `'Cinzel Decorative', serif`,
    transition: 'box-shadow 0.3s ease',
  },
};
