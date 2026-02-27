import { motion } from 'framer-motion';

const gradients = [
  'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
  'linear-gradient(135deg, #fce7f3 0%, #ffe4e6 100%)',
  'linear-gradient(135deg, #d1fae5 0%, #e0f2fe 100%)',
  'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
  'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
];

export default function ProjectCard({ title, description, tags = [], index = 0 }) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.article
      style={styles.card}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div style={{ ...styles.imgPlaceholder, background: gradient }} />
      <div style={styles.body}>
        <h3 style={styles.title}>{title}</h3>
        {description && <p style={styles.desc}>{description}</p>}
        {tags.length > 0 && (
          <div style={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
  },
  imgPlaceholder: {
    aspectRatio: '4 / 3',
    width: '100%',
  },
  body: {
    padding: '20px 22px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  desc: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    lineHeight: 1.5,
    maxWidth: '100%',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '3px 10px',
    borderRadius: '99px',
    background: 'rgba(79,70,229,0.08)',
    color: 'var(--accent)',
  },
};
