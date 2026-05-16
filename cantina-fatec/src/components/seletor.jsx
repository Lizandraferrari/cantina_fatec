export default function Seletor(data) {
  const options = data.options;
  const isHorizontal = data.orientation === 'horizontal';

  return (
    <div className={`d-flex ${isHorizontal ? 'flex-row align-items-center gap-2 w-md-25 ' : 'flex-column'}`}>
      
      <label 
        htmlFor="opcoes-selecao" 
        className={isHorizontal ? 'mb-0 p-0 w-75' : 'align-self-start mx-2'}
      >
        {data.label}
      </label>

      <select
        id="opcoes-selecao"
        value={data.value}
        onChange={data.onChange}
        className="form-select px-3 p-1 cursor-pointer border rounded-pill fw-light "
      >
        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>

    </div>
  );
}