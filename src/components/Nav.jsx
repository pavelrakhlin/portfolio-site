import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { to: '/',        label: 'Home'    },
  { to: '/work',    label: 'Work'    },
  { to: '/about',   label: 'About'   },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoDot} />
          Portfolio
        </Link>

        <nav style={styles.nav}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} style={{ ...styles.link, ...(active ? styles.linkActive : {}) }}>
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    style={styles.underline}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: 'var(--nav-height)',
    background: 'rgba(250,250,250,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '-0.02em',
  },
  logoDot: {
    width: 24,
    height: 24,
    borderRadius: 6,
    background: 'var(--accent)',
    display: 'inline-block',
    flexShrink: 0,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
  },
  link: {
    position: 'relative',
    padding: '6px 12px',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--muted)',
    borderRadius: 'var(--radius-sm)',
    transition: 'color 0.18s',
  },
  linkActive: {
    color: 'var(--text)',
    fontWeight: 500,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: '12px',
    right: '12px',
    height: '2px',
    borderRadius: '99px',
    background: 'var(--accent)',
  },
};
