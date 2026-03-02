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
          <Link to="/work" className="link" style={{ marginBottom: '3rem', display: 'block' }}>See all projects →</Link>
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
    height: 'fit-content',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
};
