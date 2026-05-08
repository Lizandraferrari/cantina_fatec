import { useState, useEffect } from "react";

export default function CardPedido({ pedido }) {
  const [expandido, setExpandido] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setExpandido(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => {
    if (isMobile) {
      setExpandido(!expandido);
    }
  };

  const status = pedido.status.toLowerCase();

  return (
    <div className={`${'borda-' + status} border border-1 p-3 mb-3 shadow-sm bg-light rounded-3 `}>
      <div
        className="d-flex flex-column flex-md-row align-items-md-center position-relative"
        onClick={toggle}
        role="button"
        style={{ cursor: isMobile ? "pointer" : "default" }}
      >
        <div className="d-flex flex-column gap-2 col-md-4 ">
          <div className="d-flex align-items-start mx-2">
            <h5 className={`fw-bold p-0 m-0 ${status}`}>
                #{pedido.id} -
            </h5>          
            <h5 className='fw-regular p-0 m-0 mx-1'>
                {pedido.nome}
            </h5>
          </div>
          <small className="text-muted d-block">
            Feito às {pedido.data}
          </small>

          <small className={`fw-semibold ${status}`}>
            Status: {pedido.status}
          </small>
        </div>

        <div className="position-absolute top-0 end-0 p-2">
          {isMobile && (
            <i
              className={`bi ${expandido ? "bi-chevron-up" : "bi-chevron-down"
                }`}
            ></i>
          )}
        </div>

        <div
          className={`${
            isMobile && !expandido ? "d-none" : ""
          } ${!isMobile ? "col-md-8 flex-column d-flex" : ""}`}
        >
            <div className="d-flex flex-row justify-content-between ">
              <label className="fw-normal mx-3">Itens:</label>
              {!isMobile ? (
                <p className="fw-bold p-0 m-0">
                  Total: {pedido.total}
                </p>
              ) : null}
            </div>

            <ul className="text-start m-0 ">
              {pedido.itens.map((item, index) => (
                <li key={index} >
                  <small className="m-0 p-0 ">
                    {item}
                  </small>
                </li>
              ))}
            </ul>

                {isMobile && expandido? (
<p className="fw-bold m-0 mt-2 p-0 text-center">
                    Total: {pedido.total}
                </p>
              ) : null}

        </div>
      </div>
    </div>
  );
}