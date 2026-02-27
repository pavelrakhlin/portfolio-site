import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Figma Design System',
    description: 'This design system is built on the principles of editorial brutalism — structured, intentional, and high-contrast.',
    tags: ['Design', 'Systems', 'Figma'],
  },
  {
    title: 'Component Library v2',
    description: 'All components follow a zero-radius, border-heavy aesthetic. They are compositional and purpose-driven.',
    tags: ['React', 'Library'],
  },
  {
    title: 'Brand Guidelines',
    description: 'Design guidelines emphasize legibility, hierarchy, and restraint. No element is decorative without purpose.',
    tags: ['Brand', 'Identity'],
  },
  {
    title: 'Icon Set 3.0',
    description: 'A comprehensive collection of intentionally crafted icons following editorial geometry.',
    tags: ['Iconography', 'Vector'],
  },
  {
    title: 'Motion Principles',
    description: 'Animation guidelines for state transitions, component reveals, and interactive elements.',
    tags: ['Motion', 'UX'],
  },
  {
    title: 'Accessibility Audit',
    description: 'Ensuring color contrast, semantic HTML, and keyboard navigation across all components.',
    tags: ['A11y', 'Audit'],
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.4 } },
};

export default function Work() {
  return (
    <AnimatedPage>
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={styles.header}
          >
            <p className="label">01 — Archive</p>
            <h1 className="h1" style={styles.heading}>Selected Work</h1>
            <p className="body-lg" style={styles.sub}>
              A collection of projects focused on design systems, component libraries, and intentional user experiences.
            </p>
          </motion.div>

          <motion.div
            style={styles.grid}
            variants={container}
            initial="initial"
            animate="animate"
          >
            {projects.map((project, i) => (
              <motion.div key={project.title} variants={item}>
                <ProjectCard {...project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}

const styles = {
  header: {
    marginBottom: '4rem',
    maxWidth: '52ch',
    paddingBottom: '2rem',
    borderBottom: '1px solid var(--border)',
  },
  heading: {
    marginTop: '12px',
    marginBottom: '16px',
  },
  sub: {
    color: 'var(--text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
};
