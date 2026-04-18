export default function Seletor(data) {
  const options = data.options;

  return (
    <div className="d-flex flex-column">
      <label 
        htmlFor="opcoes-selecao" 
        className="align-self-start mx-2">
        {data.label}
      </label>

        <select
          id="opcoes-selecao"
          onChange={data.onChange}
          className="form-select px-3 p-1 cursor-pointer border rounded-pill fw-light"
         
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