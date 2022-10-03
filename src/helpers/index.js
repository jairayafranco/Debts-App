export const fechaPagos = (i) => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + i);
    return fecha.toLocaleDateString();
}

export const validarCamposVacios = (debt) => {
    const camposVacios = Object.values(debt).filter((campo) => campo === '');
    if (camposVacios.length !== 0) {
        return { title: 'Error', description: 'Todos los campos son obligatorios', status: 'error', position: 'top', duration: 3000, isClosable: true };
    }
    return null;
}