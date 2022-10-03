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
    Stack,
    Heading
} from '@chakra-ui/react';

export default function DebtsHistorial({ historial }) {
    return (
        <>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'} mt={3}>
                Historial Abonos/Cuotas
            </Heading>
            <TableContainer maxH={150} style={{ overflow: 'auto' }}>
                <Table size='sm' variant='striped' colorScheme='telegram'>
                    <Thead>
                        <Tr>
                            <Th>Fecha</Th>
                            <Th>Descripcion</Th>
                            <Th>Valor</Th>
                            <Th>Total</Th>
                            <Th>Valor Cuota</Th>
                            <Th>N° Cuotas</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {historial.map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.fecha}</Td>
                                <Td>{item.descripcion}</Td>
                                <Td>{item.valor}</Td>
                                <Td>{item.total}</Td>
                                <Td>{item.valorCuota}</Td>
                                <Td>{item.numCuotas}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}