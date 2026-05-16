import Button from '@/components/button';
import Input from '@/components/input';
import Seletor from '@/components/seletor';

export default function FiltroPedido({ filtro, setFiltro, onClose }) {

    const updateFiltro = (key) => (event) => {
        setFiltro({
            ...filtro,
            [key]: event.target.value,
        });
    };

    const content = (
        <>
            <div className="mb-4 ">
                <h4>Filtrar pedidos</h4>
            </div>

            <div className="mb-4">
                <label className="d-flex">Período:</label>

                <div className="d-flex flex-column gap-2">
                    <Input
                        type="date"
                        label="Data início"
                        className="form-control form-control-sm"
                        labelClassName="small"
                        value={filtro.periodoInicio}
                        onChange={updateFiltro('periodoInicio')}
                    />

                    <Input
                        type="date"
                        label="Data fim"
                        className="form-control form-control-sm"
                        labelClassName="small"
                        value={filtro.periodoFim}
                        onChange={updateFiltro('periodoFim')}
                    />
                </div>

                <div className="my-4">
                    <Input
                        label="Contendo"
                        name="busca"
                        value={filtro.busca || ''}
                        onChange={updateFiltro('busca')}
                        placeholder="Pedido"
                    />
                </div>

                <div className="mb-4">
                    <Seletor
                        label="Status do pedido"
                        options={["Pendente", "Entregue", "Cancelado"]}
                        orientation="vertical"
                        value={filtro.status}
                        onChange={updateFiltro('status')}
                    />
                </div>

                    <Button
                        className="azul-claro"
                        label="Filtrar"
                        onClick={() => { }}
                    />     

            </div>

        </>
    );

    return (
        <>
            <div className="sombra col-md-3 col-lg-2 px-3 py-4 position-relative d-none d-md-block m-0">
                <button
                    className="btn position-absolute top-0 end-0 mt-2 "
                    onClick={onClose}
                >
                    <i className="bi bi-chevron-left "></i>
                </button>

                {content}
            </div>

            <div
                className="d-md-none position-fixed top-0 start-0 w-100 h-100 cinza-background p-4 "
                style={{ zIndex: 776 }}
            >
                <div className="d-flex justify-content-end">
                    <button className="btn" onClick={onClose} aria-label="Fechar filtro">
                        <i className="bi bi-x-lg fs-3"></i>
                    </button>
                </div>

                {content}
            </div>
        </>
    );
}