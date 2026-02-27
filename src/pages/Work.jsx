import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';

const projects = [
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
  {
    title: 'Ut labore dolore',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['Ut', 'Labore'],
  },
  {
    title: 'Magna aliqua',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    tags: ['Magna', 'Aliqua'],
  },
  {
    title: 'Minim veniam',
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.',
    tags: ['Minim', 'Veniam'],
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
            <p className="label">Lorem ipsum</p>
            <h1 style={styles.heading}>Lorem ipsum dolor</h1>
            <p style={styles.sub}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
    marginBottom: 'var(--space-5)',
    maxWidth: '52ch',
  },
  heading: {
    marginTop: '12px',
    marginBottom: '16px',
  },
  sub: {
    color: 'var(--muted)',
    fontSize: '1.05rem',
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 'var(--space-3)',
  },
};
