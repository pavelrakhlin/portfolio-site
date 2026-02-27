import { motion } from 'framer-motion';

const backgrounds = [
  '#000000', // primary
  '#666666', // secondary
  '#F5F5F5', // sidebar
  '#F0F0F0', // warm
  '#999999', // muted
];

export default function ProjectCard({ title, description, tags = [], index = 0 }) {
  const bg = backgrounds[index % backgrounds.length];

  return (
    <motion.article
      className="card"
      whileHover={{ y: -4, boxShadow: '8px 8px 0 var(--primary)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="card-image" style={{ backgroundColor: bg }} />
      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 className="card-title">{title}</h3>
        <p className="card-body">{description}</p>
        
        {tags.length > 0 && (
          <div className="card-footer">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <span key={tag} className="badge badge-secondary">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
