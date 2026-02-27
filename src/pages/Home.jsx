import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';

const featured = [
  {
    title: 'Design System',
    description: 'A component reference built on structure, contrast, and typographic intent.',
    tags: ['Design', 'Systems', 'Figma'],
  },
  {
    title: 'Component Library v2',
    description: 'Every element is purposeful — nothing is decorative without reason.',
    tags: ['React', 'Library'],
  },
  {
    title: 'Brand Guidelines',
    description: 'Clarity drives decisions. Good design begins with understanding.',
    tags: ['Brand', 'Identity'],
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
      <section style={styles.hero} className="hero">
        <div className="container">
          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.15 }}
            className="hero-body"
          >
            I focus on real problems, not just new ideas. Understanding people comes first, technology follows. The goal isn't to build more, but to build what makes a difference.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            style={styles.heroCta}
          >
            <Link to="/work" className="btn btn-primary">View Work</Link>
            <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
          </motion.div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="container">
          <motion.div
            style={styles.sectionHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <p className="label">01 — Featured Work</p>
            <Link to="/work" className="link">See all projects →</Link>
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
      <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <motion.div
            style={styles.blurb}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="hero-eyebrow">02 — Collaboration</p>
            <h2 className="h2" style={{ color: 'var(--primary)' }}>Let's build something intentional.</h2>
            <p className="body" style={{ color: 'var(--primary)', opacity: 0.85, maxWidth: '42ch', margin: '1rem 0 2rem' }}>
              Every decision should be intentional, purposeful, and human-centered at its core.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Start a conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}

const styles = {
  hero: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
  },
  heroCta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)',
    flexWrap: 'wrap',
    gap: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  blurb: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '540px',
  },
};
