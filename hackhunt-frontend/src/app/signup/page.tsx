'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const email = (e.currentTarget.email as HTMLInputElement).value;
  const password = (e.currentTarget.password as HTMLInputElement).value;

  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    alert('Signup successful!');
    router.push('/dashboard');
  } else {
    const { message } = await res.json();
    alert(`Signup failed: ${message}`);
  }
};


  return (
    <main style={styles.main}>
      <div style={styles.grid}>
        {/* LEFT: Sign-up Form */}
        <div style={styles.left}>
          <h1 style={styles.header}>Create your HackHunt account</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" style={styles.input} required />

            <label style={styles.label} htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" style={styles.input} required />

            <label style={styles.label} htmlFor="confirm">Confirm Password</label>
            <input type="password" id="confirm" placeholder="Repeat your password" style={styles.input} required />

            <button
              type="submit"
              style={{
                ...styles.signupButton,
                boxShadow: hover ? '0 0 12px #7EC8E3' : 'none',
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Sign Up
            </button>
          </form>

          <Link href="/login">
            <button style={styles.linkButton}>Already have an account? Log in</button>
          </Link>
        </div>

        {/* RIGHT: Logo + Tagline */}
        <div style={styles.right}>
          <img src="/logo.png" alt="HackHunt Logo" style={styles.logoImage} />
          <p style={styles.tagline}>
            Never miss a hackathon again. <br />
            HackHunt is your one-stop platform to discover and track hackathons from across the web.
            Whether you're a student, developer, or innovation enthusiast, HackHunt helps you find upcoming events,
            filter by location or theme, and stay informed — all in one clean, intuitive interface. From online global
            competitions to campus events, HackHunt ensures you never miss an opportunity to learn, build, and compete.
          </p>
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
    alignItems: 'flex-start',
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
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
    textAlign: 'center' as const,
  },
  logoImage: {
    width: '300px',
    maxWidth: '90%',
    height: 'auto',
  },
  tagline: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    maxWidth: '90%',
    fontFamily: `'Georgia', 'Cinzel Decorative', serif`, // ✅ normal sentence case
    textTransform: 'none' as const,
    textAlign: 'center' as const,
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
  signupButton: {
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
