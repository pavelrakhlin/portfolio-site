import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <span style={styles.copy}>© {new Date().getFullYear()} Lorem ipsum dolor sit amet.</span>
        <nav style={styles.links}>
          <Link to="/work"    style={styles.link}>Lorem</Link>
          <Link to="/about"   style={styles.link}>Ipsum</Link>
          <Link to="/contact" style={styles.link}>Dolor</Link>
        </nav>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '24px 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  copy: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
    transition: 'color 0.18s',
  },
};
