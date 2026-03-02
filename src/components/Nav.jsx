import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/',        label: 'Home' },
  { to: '/work',    label: 'Work' },
  { to: '/about',   label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>Pavel Rakhlin</span>
        </Link>

        <nav style={styles.nav}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  ...styles.link,
                  ...(active ? styles.linkActive : {}),
                }}
              >
                <span style={styles.linkText}>{label}</span>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '40px',
    marginRight: '40px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'var(--primary)',
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
    width: 'fit-content',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 1.5rem',
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
};
