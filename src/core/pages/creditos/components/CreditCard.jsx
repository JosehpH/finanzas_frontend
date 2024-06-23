// eslint-disable-next-line react/prop-types
export  function CreditCard({credito}){
    return (
        <div>
            creditoId: {credito.creditoId}
            tipoCredito: {credito.tipoCredito}
            saldo: {credito.saldo}
            dni-cliente:{credito.cliente.dni}
            fecha desembolso: {credito.fechaDesembolso}
            estadoCredito: {credito.estadoCredito}
        </div>
    );
}