export default function Input({ label, name, value, onChange, type , className , placeholder }) {
    return (
        <div className="d-flex flex-column">
            {label ? (
                <label htmlFor={name} className="mt-0 mx-2 align-self-start">
                    {label}
                </label>
            ) : null}
            
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`m-0 py-1 px-3 rounded-pill border border-1 font-light ${className || ''}`}
                placeholder={placeholder}
            />
        </div>
    );
}