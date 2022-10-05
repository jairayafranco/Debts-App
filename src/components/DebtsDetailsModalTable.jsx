import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { UseAppContext } from '../context/Context';
import DebtsHistorial from './DebtsHistorial';
import { useState } from 'react';
import { fechaPagos } from '../helpers';

export default function DebtsDetailsModalTable({ debt }) {
    const { updateCuotasList } = UseAppContext();
    const toast = useToast();

    const [abono, setAbono] = useState('');
    const [cuota, setCuota] = useState('');

    const handleCheckBox = (debtId, index, cuotaCompletada) => {
        updateCuotasList(debtId, index, !cuotaCompletada, debt.cuotasList);
    };

    // const handleDisable = (index) => {
    //     const fechaActual = new Date().toLocaleDateString();
    //     const fechaCuotaDebtList = debt.cuotasList[index][index + 1];

    //     if (fechaActual !== fechaCuotaDebtList) {
    //         return true;
    //     }
    //     if (fechaActual > fechaCuotaDebtList && !debt.cuotasList[index].completado) {
    //         return false;
    //     }
    //     if (fechaActual > fechaCuotaDebtList && debt.cuotasList[index].completado) {
    //         return true;
    //     }
    // };
    // isDisabled={handleDisable(index)}

    const handleAbono = () => {
        const { valor, cuotas, cuotasList } = debt;
        if (!abono || Number(abono) === 0) return toast({ title: 'Ingrese un valor', status: 'warning', position: 'top', duration: 3000, isClosable: true });
        if (Number(abono) > Number(valor)) return toast({ title: 'El valor del abono no puede ser mayor al valor de la deuda', status: 'warning', position: 'top', duration: 3000, isClosable: true });

        const cuotasChecked = cuotasList.filter((cuota) => cuota.completado);
        const cuotasUnChecked = cuotasList.filter((cuota) => !cuota.completado);
        const cuotasCompletadas = cuotasChecked.reduce((acc, cuota) => acc + cuota.valorCuota, 0);
        const cuotasRestantes = cuotas - cuotasChecked.length;
        const valorTotalConAbono = valor - abono - cuotasCompletadas;
        const newCuotasList = [];
        for (let i = 1; i <= cuotasRestantes; i++) {
            newCuotasList.push({ [cuotasChecked.length + i]: cuotasUnChecked[i - 1][cuotasChecked.length + i], valorCuota: valorTotalConAbono / cuotasRestantes, completado: false });
        }
        newCuotasList.push(...cuotasChecked);
        newCuotasList.sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0])
        const nuevoHistorial = [...debt?.historial, {
            fecha: new Date().toLocaleDateString(),
            descripcion: 'Abono',
            valor: parseInt(abono),
            total: parseInt(valor - abono),
            valorCuota: parseInt(valorTotalConAbono / cuotasRestantes),
            numCuotas: debt.cuotas,
        }];
        updateCuotasList(debt.id, null, null, newCuotasList, nuevoHistorial, parseInt(valor - abono));
        setAbono('');
    };

    const handleCuotas = () => {
        const { valor, cuotasList } = debt;
        if (!cuota) return toast({ title: 'Ingrese un valor', status: 'warning', position: 'top', duration: 3000, isClosable: true });

        const cuotasChecked = cuotasList.filter((cuota) => cuota.completado);
        const cuotasCompletadas = cuotasChecked.reduce((acc, cuota) => acc + cuota.valorCuota, 0);
        const cuotasRestantes = cuota - cuotasChecked.length;
        const valorFinal = valor - cuotasCompletadas;
        const newCuotasList = [];

        for (let i = 1; i <= cuotasRestantes; i++) {
            newCuotasList.push({ [cuotasChecked.length + i]: fechaPagos((i - 1) + cuotasChecked.length), valorCuota: valorFinal / cuotasRestantes, completado: false });
        }
        newCuotasList.push(...cuotasChecked);
        newCuotasList.sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0]);
        const nuevoHistorial = [...debt?.historial, {
            fecha: new Date().toLocaleDateString(),
            descripcion: 'Cuotas',
            valor: '',
            total: valor,
            valorCuota: parseInt(valorFinal / cuotasRestantes),
            numCuotas: cuota,
        }];
        updateCuotasList(debt.id, null, null, newCuotasList, nuevoHistorial, valor);
        setCuota('');
    }

    return (
        <>
            <TableContainer maxH={300} style={{ overflow: 'auto' }}>
                <Table size='sm' variant='striped' colorScheme='telegram'>
                    <Thead>
                        <Tr>
                            <Th>Cuotas</Th>
                            <Th>Valor</Th>
                            <Th>Fecha</Th>
                            {debt.activo && <Th>Estado</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {debt?.cuotasList?.map((cuota, index) => (
                            <Tr key={index}>
                                <Td>{Object.keys(cuota)[0]}</Td>
                                <Td>{parseInt(cuota.valorCuota)}</Td>
                                <Td>{Object.values(cuota)[0]}</Td>
                                {debt.activo && <Td> <Checkbox isChecked={cuota.completado} onChange={() => handleCheckBox(debt.id, index, cuota.completado)} /></Td>}
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        {debt.activo && <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th>Restante</Th>
                            <Th>
                                {parseInt(debt?.cuotasList.reduce((acc, cuota) => acc + cuota.valorCuota, 0)
                                    - debt?.cuotasList?.filter((cuota) => cuota.completado).reduce((acc, cuota) => acc + cuota.valorCuota, 0))}
                            </Th>
                        </Tr>}
                    </Tfoot>
                </Table>
            </TableContainer>
            {
                debt?.historial?.length > 0 && <DebtsHistorial historial={debt.historial} />
            }
            {debt.activo && <Flex
                mt={4}
                gap={1}
                direction={{ base: 'column', md: 'row' }}
            >
                <FormControl id="saldo" mt={2}>
                    <FormLabel>Abonar a saldo</FormLabel>
                    <Input type="number" name="motivo" value={abono} onChange={(e) => setAbono(e.target.value)} autoComplete='off' />
                    <Button bg={'blue.300'} mt={1} onClick={handleAbono}>Abonar</Button>
                </FormControl>
                <FormControl id="cuotas" mt={2}>
                    <FormLabel>Cambiar N° de Cuotas</FormLabel>
                    <Input type="number" name="cuotas" value={cuota} onChange={(e) => setCuota(e.target.value)} autoComplete='off' />
                    <Button bg={'blue.300'} mt={1} onClick={handleCuotas}>Cambiar</Button>
                </FormControl>
            </Flex>}
        </>
    )
}