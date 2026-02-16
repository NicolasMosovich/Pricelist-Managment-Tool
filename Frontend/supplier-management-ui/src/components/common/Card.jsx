import PropTypes from 'prop-types';
import './Card.css';

/**
 * Reusable Card Component
 */
const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  hoverable = false,
  onClick,
}) => {
  const cardClass = `card ${hoverable ? 'card-hoverable' : ''} ${className}`;

  return (
    <div className={cardClass} onClick={onClick}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
