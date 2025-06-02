'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const router = useRouter();
  const username = 'User'; // Replace with actual user info later

  return (
    <main style={styles.main}>
      {/* ✅ Faded background overlay */}
      <div style={styles.bgOverlay}></div>

      {/* ✅ Foreground content */}
      <div style={styles.container}>
        <h2 style={styles.welcome}>Welcome, {username} 👋</h2>
        <p style={styles.greeting}>What would you like to do today?</p>

        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.actionButton,
              ...styles.discoverButton,
              boxShadow: hoveredBtn === 'discover' ? '0 0 20px #7EC8E3' : 'none',
            }}
            onMouseEnter={() => setHoveredBtn('discover')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => router.push('/discover')}
          >
            DISCOVER
          </button>

          <button
            style={{
              ...styles.actionButton,
              ...styles.buildButton,
              boxShadow: hoveredBtn === 'build' ? '0 0 20px #7EC8E3' : 'none',
            }}
            onMouseEnter={() => setHoveredBtn('build')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => router.push('/build')}
          >
            BUILD
          </button>
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
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  bgOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: "url('/images/dashboard BG.webp')", // ✅ Your faded background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1, // ✅ Subtle fade
    zIndex: 0,
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    zIndex: 1, // ✅ Keep content above overlay
  },
  welcome: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  greeting: {
    fontSize: '1.5rem',
    marginBottom: '3rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap' as const,
  },
  actionButton: {
    width: '260px',
    height: '160px',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#7EC8E3',
    border: '2px solid #7EC8E3',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative' as const,
    cursor: 'pointer',
    fontFamily: `'Cinzel Decorative', serif`,
    transition: 'box-shadow 0.3s ease',
    textShadow: `
      -1px -1px 0 #000,
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  discoverButton: {
    backgroundImage: "url('/images/Discover.png')",
  },
  buildButton: {
    backgroundImage: "url('/images/Build.jpg')",
  },
};
