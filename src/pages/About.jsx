import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const skills = [
  { category: 'Design Systems', items: ['Architecture', 'Tokens', 'Components', 'Documentation', 'Governance'] },
  { category: 'Engineering',    items: ['React', 'TypeScript', 'CSS', 'Framer Motion', 'Vite'] },
  { category: 'Process',        items: ['Agile', 'Code Review', 'Accessibility', 'Testing', 'CI/CD'] },
];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { delay, duration: 0.4 },
});

export default function About() {
  return (
    <AnimatedPage>
      <section className="section">
        <div className="container">

          {/* Two-column bio */}
          <div style={styles.bio}>

            {/* Left: text */}
            <motion.div style={styles.bioText} {...fadeUp(0.05)}>
              <p className="label" style={{ marginBottom: '16px' }}>02 — Philosophy</p>
              <h1 className="h1" style={styles.name}>Design at Scale.</h1>
              <p className="body-lg" style={styles.copy}>
                I focus on real problems, not just new ideas. Understanding people comes first, technology follows.
              </p>
              <p className="body" style={styles.copy}>
                The goal isn't to build more, but to build what makes a difference. Every decision should be intentional, purposeful, and human-centered at its core.
              </p>
              <p className="body" style={styles.copy}>
                Good design begins with understanding. We invest time upfront to understand the problem space before proposing any solution. Every element on screen has a reason to exist. We remove everything that doesn't serve the user's goal.
              </p>
            </motion.div>

            {/* Right: photo placeholder */}
            <motion.div {...fadeUp(0.12)} style={{ minWidth: 0 }}>
              <div style={styles.photoPlaceholder}>
                <div className="avatar avatar-xl avatar-dark" style={{ width: '120px', height: '120px', fontSize: '2.5rem' }}>ME</div>
              </div>
            </motion.div>

          </div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={styles.skillsHeader}
          >
            <p className="label" style={{ marginBottom: '12px' }}>Core Competencies</p>
          </motion.div>

          <div style={styles.skillsGrid}>
            {skills.map(({ category, items }, gi) => (
              <motion.div
                key={category}
                style={styles.skillGroup}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.4 }}
              >
                <p className="card-eyebrow">Expertise</p>
                <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>{category}</h3>
                <ul style={styles.skillList}>
                  {items.map((item) => (
                    <li key={item} className="body" style={styles.skillItem}>
                      <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </AnimatedPage>
  );
}

const styles = {
  bio: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    marginBottom: '6rem',
    alignItems: 'start',
  },
  bioText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  name: {
    marginBottom: '0.5rem',
  },
  copy: {
    color: 'var(--text-muted)',
    maxWidth: '52ch',
  },
  photoPlaceholder: {
    width: '100%',
    aspectRatio: '3 / 4',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-main)',
    maxWidth: '420px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillsHeader: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  skillGroup: {
    padding: '2rem',
    backgroundColor: 'var(--bg-page)',
  },
  skillList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: 'auto',
  },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
  },
};
