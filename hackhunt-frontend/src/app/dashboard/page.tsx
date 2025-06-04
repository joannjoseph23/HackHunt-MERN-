'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('hackhuntUserEmail');
    setEmail(storedEmail);
    setIsAdmin(storedEmail === 'admin@hackhunt.com');
  }, []);

  const username = email?.split('@')[0] || 'User';

  return (
    <main style={styles.main}>
      <div style={styles.bgOverlay}></div>

      <div style={styles.container}>
        <h2 style={styles.welcome}>Welcome, {username} 👋</h2>
        <p style={styles.greeting}>What would you like to do today?</p>

        <div style={styles.buttonGroup}>
          {/* DISCOVER is for everyone */}
          <button
            style={{
              ...styles.actionButton,
              ...styles.discoverButton,
              boxShadow: hoveredBtn === 'discover' ? '0 0 20px #7EC8E3' : 'none',
            }}
            onMouseEnter={() => setHoveredBtn('discover')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => router.push('/dashboard/discover')}
          >
            DISCOVER
          </button>

          {/* BUILD is for normal users only */}
          {!isAdmin && (
            <button
              style={{
                ...styles.actionButton,
                ...styles.buildButton,
                boxShadow: hoveredBtn === 'build' ? '0 0 20px #7EC8E3' : 'none',
              }}
              onMouseEnter={() => setHoveredBtn('build')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => router.push('/dashboard/build/intro')}
            >
              BUILD
            </button>
          )}

          {/* MANAGE & NOTIFICATIONS only for admin */}
          {isAdmin && (
            <>
              <button
                style={{
                  ...styles.actionButton,
                  backgroundImage: "url('/images/manage.png')",
                  boxShadow: hoveredBtn === 'manage' ? '0 0 20px #7EC8E3' : 'none',
                }}
                onMouseEnter={() => setHoveredBtn('manage')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => router.push('/admin/manage')}
              >
                MANAGE
              </button>

              <button
                style={{
                  ...styles.actionButton,
                  backgroundImage: "url('/images/notify.png')",
                  boxShadow: hoveredBtn === 'notify' ? '0 0 20px #7EC8E3' : 'none',
                }}
                onMouseEnter={() => setHoveredBtn('notify')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => router.push('/admin/notifications')}
              >
                NOTIFICATIONS
              </button>
            </>
          )}
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
    backgroundImage: "url('/images/dashboard BG.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 0,
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    zIndex: 1,
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
