import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AnimatedPage>
      <section className="section">
        <div className="container">
          <div style={styles.layout}>

            {/* Left: intro */}
            <motion.div
              style={styles.intro}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              <p className="label" style={{ marginBottom: '16px' }}>Lorem ipsum</p>
              <h1 style={styles.heading}>Lorem ipsum<br />dolor sit amet</h1>
              <p style={styles.copy}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>

              <div style={styles.directContact}>
                <p style={styles.directLabel}>Lorem ipsum dolor</p>
                <a href="mailto:hello@portfolio.dev" style={styles.email}>
                  lorem@ipsum.dev
                </a>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              style={styles.formWrap}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4 }}
            >
              {sent ? (
                <motion.div
                  style={styles.success}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={styles.successIcon}>✓</span>
                  <h3>Lorem ipsum!</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                  </p>
                </motion.div>
              ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                  <div style={styles.row}>
                    <div className="form-group">
                      <label htmlFor="name">Lorem</label>
                      <input id="name" type="text" placeholder="Lorem ipsum dolor" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Ipsum</label>
                      <input id="email" type="email" placeholder="lorem@ipsum.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Dolor</label>
                    <input id="subject" type="text" placeholder="Lorem ipsum" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Sit amet</label>
                    <textarea id="message" rows={6} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit…" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Lorem ipsum
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: 'var(--space-6)',
    alignItems: 'start',
  },
  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  heading: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    marginBottom: '4px',
  },
  copy: {
    color: 'var(--muted)',
    fontSize: '1rem',
    lineHeight: 1.75,
    maxWidth: '40ch',
  },
  directContact: {
    marginTop: '8px',
    padding: '20px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
  },
  directLabel: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
    marginBottom: '8px',
    maxWidth: '100%',
  },
  email: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--accent)',
    wordBreak: 'break-word',
  },
  formWrap: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    boxShadow: 'var(--shadow)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: 'var(--space-5) 0',
    textAlign: 'center',
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'rgba(79,70,229,0.1)',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1,
  },
};
