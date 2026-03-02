export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <span className="mono" style={styles.copy}>© {new Date().getFullYear()} — All rights reserved.</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: 'none',
    backgroundColor: 'var(--bg-main)',
    padding: '3rem 0',
    marginTop: 'auto',
  },
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
  },
  copy: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
};
