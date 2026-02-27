import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const skills = [
  { category: 'Lorem',       items: ['Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur'] },
  { category: 'Adipiscing',  items: ['Elit', 'Sed', 'Do', 'Eiusmod', 'Tempor'] },
  { category: 'Incididunt',  items: ['Ut', 'Labore', 'Dolore', 'Magna', 'Aliqua'] },
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
              <p className="label" style={{ marginBottom: '16px' }}>Lorem ipsum</p>
              <h1 style={styles.name}>Lorem ipsum dolor.</h1>
              <p style={styles.copy}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris.
              </p>
              <p style={styles.copy}>
                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p style={styles.copy}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </motion.div>

            {/* Right: photo placeholder */}
            <motion.div {...fadeUp(0.12)} style={{ minWidth: 0 }}>
              <div style={styles.photoPlaceholder} />
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
            <p className="label" style={{ marginBottom: '12px' }}>Lorem ipsum</p>
          </motion.div>

          <div style={styles.skillsGrid}>
            {skills.map(({ category, items }, gi) => (
              <motion.div
                key={category}
                style={styles.skillGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.4 }}
              >
                <h3 style={styles.skillCategory}>{category}</h3>
                <ul style={styles.skillList}>
                  {items.map((item) => (
                    <li key={item} style={styles.skillItem}>{item}</li>
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
    gap: 'var(--space-6)',
    marginBottom: 'var(--space-7)',
    alignItems: 'start',
  },
  bioText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  name: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    marginBottom: '8px',
  },
  copy: {
    color: 'var(--muted)',
    fontSize: '1rem',
    lineHeight: 1.75,
    maxWidth: '52ch',
  },
  photoPlaceholder: {
    width: '100%',
    aspectRatio: '3 / 4',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(145deg, #e0e7ff 0%, #ede9fe 50%, #ddd6fe 100%)',
    maxWidth: '420px',
  },
  skillsHeader: {
    marginBottom: 'var(--space-3)',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 'var(--space-4)',
  },
  skillGroup: {
    padding: '20px 22px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
  },
  skillCategory: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--accent)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  skillList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skillItem: {
    fontSize: '0.9rem',
    color: 'var(--muted)',
  },
};
