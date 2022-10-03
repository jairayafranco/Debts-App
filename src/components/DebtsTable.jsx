import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { fechaPagos } from '../helpers';

export default function DebtsTable({ data, showTable }) {
    const handleData = () => {
        const { valor, cuotas } = data;
        const valorCuota = valor / cuotas;
        const cuotasArray = [];

        for (let i = 1; i <= cuotas; i++) {
            cuotasArray.push(
                <Tr key={i}>
                    <Td>{i}</Td>
                    <Td>{parseInt(valorCuota)}</Td>
                    <Td>{fechaPagos(i)}</Td>
                </Tr>
            )
        }

        return cuotasArray;
    }

    return (
        showTable && <TableContainer>
            <Table size='sm' variant='striped' colorScheme='telegram'>
                <Thead>
                    <Tr>
                        <Th>Cuotas</Th>
                        <Th>Valor</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {handleData()}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Total</Th>
                        <Th>{data?.valor}</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}
