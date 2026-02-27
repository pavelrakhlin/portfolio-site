import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { to: '/',        label: 'Home',    num: '01' },
  { to: '/work',    label: 'Work',    num: '02' },
  { to: '/about',   label: 'About',   num: '03' },
  { to: '/contact', label: 'Contact', num: '04' },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoBox} />
          <span style={styles.logoText}>Portfolio</span>
        </Link>

        <nav style={styles.nav}>
          {links.map(({ to, label, num }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} style={{ ...styles.link, ...(active ? styles.linkActive : {}) }}>
                <span style={styles.linkText}>{label}</span>
                <span style={styles.linkNum}>{num}</span>
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
    background: 'var(--bg-main)',
    borderBottom: '2px solid var(--border)',
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
    color: 'var(--primary)',
  },
  logoBox: {
    width: 24,
    height: 24,
    background: 'var(--primary)',
    border: '1px solid var(--border)',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 1.5rem',
    borderLeft: '1px solid var(--border)',
    color: 'var(--text-dark)',
    transition: 'background-color var(--transition), color var(--transition)',
    height: '100%',
  },
  linkActive: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text-inverse)',
  },
  linkText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  linkNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    opacity: 0.6,
  },
};
