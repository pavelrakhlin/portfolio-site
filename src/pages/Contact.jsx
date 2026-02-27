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
              <p className="label" style={{ marginBottom: '16px' }}>03 — Contact</p>
              <h1 className="h1" style={styles.heading}>Get in Touch</h1>
              <p className="body" style={styles.copy}>
                Interested in building something intentional together? Reach out to discuss design systems, platform experiences, or simply to say hello.
              </p>

              <div style={styles.directContact} className="card">
                <p className="card-eyebrow">Direct Email</p>
                <a href="mailto:hello@portfolio.dev" style={styles.email} className="h4">
                  hello@portfolio.dev
                </a>
                <div className="card-footer" style={{ borderTop: 'none', marginTop: '0', paddingTop: '1rem' }}>
                  <span className="badge badge-success badge-dot">Available for new opportunities</span>
                </div>
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
                  <div className="alert alert-success" style={{ borderLeft: '3px solid #333333', backgroundColor: '#f0f0f0', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div className="alert-content" style={{ textAlign: 'center' }}>
                      <p className="h3" style={{ color: '#000000', marginBottom: '1rem' }}>Message Sent</p>
                      <p className="body" style={{ color: '#000000' }}>
                        Thank you for reaching out. I'll get back to you shortly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form style={styles.form} onSubmit={handleSubmit} className="form">
                  <div style={styles.row}>
                    <div className="form-group">
                      <label className="label label-required" htmlFor="name">Full Name</label>
                      <input className="input" id="name" type="text" placeholder="e.g. Alex Chen" required />
                    </div>
                    <div className="form-group">
                      <label className="label label-required" htmlFor="email">Email Address</label>
                      <input className="input" id="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="subject">Subject</label>
                    <input className="input" id="subject" type="text" placeholder="What's this about?" />
                  </div>
                  <div className="form-group">
                    <label className="label label-required" htmlFor="message">Message</label>
                    <textarea className="textarea" id="message" rows={6} placeholder="Write something intentional…" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                    Send Message
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
    gap: '4rem',
    alignItems: 'start',
  },
  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  heading: {
    marginBottom: '0.5rem',
  },
  copy: {
    color: 'var(--text-muted)',
    maxWidth: '40ch',
    marginBottom: '1.5rem',
  },
  directContact: {
    marginTop: '1rem',
    backgroundColor: 'var(--bg-main)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
  },
  email: {
    color: 'var(--primary)',
    textDecoration: 'none',
    wordBreak: 'break-word',
  },
  formWrap: {
    backgroundColor: 'var(--bg-main)',
    border: '1px solid var(--border)',
    padding: '3rem',
    boxShadow: '12px 12px 0px var(--primary)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
};
