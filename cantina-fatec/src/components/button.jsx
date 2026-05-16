export default function Button({ 
  label, 
  children, 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}) {
    
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white border-0 rounded-pill px-5 py-1 fw-semibold ${className}`}
    >
      {children ? children : label}
    </button>
  );
}