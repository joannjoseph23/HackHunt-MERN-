'use client';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useState } from 'react';

export default function GetStartedPage() {
  const [hover, setHover] = useState(false);

  return (
    <main style={styles.main}>
      <div style={styles.logoOnly}>
        <img
          src="/logo.png"
          alt="HackHunt Logo"
          style={styles.logoImage}
        />
      </div>

      <div style={styles.contentContainer}>
        <h1 style={styles.title}>HACKHUNT: INNOVATE AND EXPLORE</h1>
        <hr style={styles.divider} />
        <p style={styles.tagline}>HUNT. HACK. WIN.</p>
        <Link href="/login">
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              ...styles.button,
              boxShadow: hover ? '0 0 20px #7EC8E3' : 'none',
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}

const styles: { [key: string]: CSSProperties } = {
  main: {
    backgroundColor: '#0D1B2A',
    color: '#7EC8E3',
    minHeight: '100vh',
    fontFamily: `'Cinzel', serif`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '4rem',
    paddingBottom: '2rem',
  },
  logoOnly: {
    marginBottom: '2.5rem',
  },
  logoImage: {
    width: '280px',
    maxWidth: '90vw',
    display: 'block',
    margin: '0 auto',
  },
  contentContainer: {
    maxWidth: '700px',
    marginTop: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  divider: {
    border: 'none',
    borderTop: '2px solid #7EC8E3',
    width: '60%',
    margin: '1rem auto',
  },
  tagline: {
    fontSize: '1rem',
    letterSpacing: '3px',
    marginBottom: '2.5rem',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#7EC8E3',
    border: '2px solid #7EC8E3',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontFamily: `'Cinzel', serif`,
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
  },
};
