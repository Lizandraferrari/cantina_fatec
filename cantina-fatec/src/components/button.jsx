
export default function Button({ label, onClick, color }) {
    
    return (
        <button
            onClick={onClick}
            className={`text-white border-0 rounded-pill px-5 py-1 fw-normal ${color}`}
        >
            {label}
        </button>
    );
}