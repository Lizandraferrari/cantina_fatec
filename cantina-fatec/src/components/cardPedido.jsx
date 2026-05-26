import { useState, useEffect } from "react";
import Button from "./button";

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
    <div className={`${'borda-' + status} border border-1 p-3 mb-3 sombra rounded-3 `}>
      <div
        className="d-flex flex-column flex-md-row align-items-md-center position-relative"
        onClick={toggle}
        role="button"
        style={{ cursor: isMobile ? "pointer" : "default" }}
      >
        <div className="d-flex flex-column gap-2 col-md-5 align-self-start my-md-2">
          <div className={`${status === "cancelado" ? "text-decoration-line-through cancelado" : ""} d-flex align-items-start mx-2`}>
            <h5 className={`p-0 m-0 ${status}`}>
              #{pedido.id} -
            </h5>
            <h5 className='text-black fw-medium p-0 m-0 mx-1'>
              {pedido.nome}
            </h5>
          </div>
          <div className="d-flex align-items-start mx-2">
            <small className="text-muted d-block">
              Feito às {pedido.data}
            </small>
          </div>
          <div className="d-flex align-items-start mx-2">
            <small className={`fw-semibold ${status}`}>
              Status: 
            </small>
            <small className={`fw-semibold mx-1 text-decoration-underline ${status}`}>
              {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)} 
            </small>
            <small className={`fw-semibold text-decoration-underline ${status}`}>
              {pedido.horastatus}
            </small>
          </div>

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
          className={`${isMobile && !expandido ? "d-none" : ""
            } ${!isMobile ? "col-md-7 flex-md-column d-flex align-items-md-center" : ""}`}
        >
          <div className="d-flex flex-row justify-content-between w-100">
            <label className="fw-normal mx-3">Itens:</label>
            {!isMobile ? (
              <p className={`${status === "cancelado" ? "text-decoration-line-through" : ""} fw-bold p-0 m-0`}>
                Total: {pedido.total.toFixed(2).replace(".", ",")}
              </p>
            ) : null}
          </div>

          <ul className="text-start mx-2 my-0 align-self-start">
            {pedido.itens.map((item, index) => (
              <li key={index} >
                <small className={`${status === "cancelado" ? "text-decoration-line-through" : ""} m-0 p-0 `}>
                  {item}
                </small>
              </li>
            ))}
          </ul>

          {isMobile && expandido ? (
            <p className={`${status === "cancelado" ? "text-decoration-line-through" : ""} fw-bold m-0 mt-2 p-0 text-center`}>
              Total: {pedido.total}
            </p>
          ) : null}

          {status === "pendente" ? (
             <Button 
              className="mt-2"
              label="Confirmar Entrega"
            ></Button>) : null
          }

        </div>
      </div>
    </div>
  );
}