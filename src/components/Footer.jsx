import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div style={styles.branding}>
          <span className="h4" style={{ margin: 0, lineHeight: 1 }}>PORTFOLIO</span>
        </div>
        
        <nav style={styles.links}>
          <Link to="/work"    className="link">Work</Link>
          <Link to="/about"   className="link">About</Link>
          <Link to="/contact" className="link">Contact</Link>
        </nav>
        
        <div style={styles.bottom}>
          <span className="mono" style={styles.copy}>© {new Date().getFullYear()} — All rights reserved.</span>
          <span className="badge badge-default">Status: Active</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: '2px solid var(--border)',
    backgroundColor: 'var(--bg-main)',
    padding: '3rem 0',
    marginTop: 'auto',
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'start',
  },
  branding: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'flex-end',
  },
  bottom: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '2rem',
    marginTop: '1rem',
    borderTop: '1px solid var(--border)',
  },
  copy: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
};
