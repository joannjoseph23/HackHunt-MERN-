'use client';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  id: string;
  name: string;
  date: string;
  image: string;
};

export default function HackathonCard({ id, name, date, image }: Props) {
  const [imgSrc, setImgSrc] = useState(image || '/images/defaulthackathonimg.jpg');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/hackathons/${id}`} style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative' }}
      >
        <div style={styles.imageContainer}>
          <img
            src={imgSrc}
            alt={`${name} banner`}
            style={styles.image}
            loading="lazy"
            onError={() => setImgSrc('/images/defaulthackathonimg.jpg')}
          />
        </div>

        {/* Hover Text */}
        {isHovered && (
          <div style={styles.hoverText}>
            Click for more details
          </div>
        )}
      </div>

      <div style={styles.details}>
        <h3 style={{ ...styles.name, ...(isHovered ? styles.textHover : {}) }}>{name}</h3>
        <p style={{ ...styles.date, ...(isHovered ? styles.textHover : {}) }}>{date}</p>
      </div>
    </Link>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#1B263B',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#7EC8E3',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    color: '#7EC8E3',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '300px',
    cursor: 'pointer',
    position: 'relative',
  },
  cardHover: {
    backgroundColor: '#ffffff',
    color: '#0D1B2A',
    borderColor: '#0D1B2A',
  },
  imageContainer: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: '#0D1B2A',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 600,
    transition: 'color 0.3s ease',
  },
  date: {
    fontSize: '0.95rem',
    opacity: 0.8,
    transition: 'color 0.3s ease',
  },
  textHover: {
    color: '#0D1B2A',
  },
  hoverText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    color: '#0D1B2A',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.9rem',
    pointerEvents: 'none',
  },
};
