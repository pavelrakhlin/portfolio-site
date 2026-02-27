import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';

const featured = [
  {
    title: 'Lorem ipsum dolor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['Lorem', 'Ipsum', 'Dolor'],
  },
  {
    title: 'Consectetur adipiscing',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['Sit', 'Amet'],
  },
  {
    title: 'Sed do eiusmod',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['Elit', 'Tempor'],
  },
];

const fadeUp = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0  },
};

export default function Home() {
  return (
    <AnimatedPage>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">
          <motion.p
            className="label"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.05 }}
            style={{ marginBottom: '20px' }}
          >
            Lorem ipsum dolor
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            style={styles.heroHeading}
          >
            Lorem ipsum dolor sit amet<br />
            consectetur adipiscing elit
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.15 }}
            style={styles.heroCopy}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            style={styles.heroCta}
          >
            <Link to="/work"    className="btn btn-primary">Lorem ipsum</Link>
            <Link to="/contact" className="btn btn-outline">Lorem ipsum</Link>
          </motion.div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <motion.div
            style={styles.sectionHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <p className="label">Lorem ipsum</p>
            <Link to="/work" style={styles.seeAll}>Lorem ipsum →</Link>
          </motion.div>

          <div style={styles.grid}>
            {featured.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <ProjectCard {...project} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blurb / CTA strip */}
      <section className="section">
        <div className="container">
          <motion.div
            style={styles.blurb}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ maxWidth: '18ch' }}>Lorem ipsum dolor sit amet?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '42ch', fontSize: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              Lorem ipsum
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}

const styles = {
  hero: {
    paddingTop: 'var(--space-8)',
    paddingBottom: 'var(--space-7)',
  },
  heroHeading: {
    marginBottom: '24px',
    color: 'var(--text)',
  },
  heroCopy: {
    fontSize: '1.1rem',
    color: 'var(--muted)',
    lineHeight: 1.7,
    marginBottom: '36px',
    maxWidth: '50ch',
  },
  heroCta: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-4)',
    flexWrap: 'wrap',
    gap: '12px',
  },
  seeAll: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--accent)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--space-3)',
  },
  blurb: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '540px',
  },
};
