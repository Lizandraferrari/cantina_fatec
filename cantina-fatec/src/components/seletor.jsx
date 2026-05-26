
export default function Seletor({options = [], orientation, label, name, value, onChange}) {

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`d-flex w-100 ${
      isHorizontal
        ? 'flex-row align-items-center gap-2 w-md-25'
        : 'flex-column'
    }`}>

      <label
        htmlFor={name}
        className={
          isHorizontal
            ? 'mb-0 p-0 w-75'
            : 'align-self-start mx-2'
        }
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select px-3 p-1 cursor-pointer border rounded-pill fw-light"
      >
        <option value="">Selecione</option>

        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}