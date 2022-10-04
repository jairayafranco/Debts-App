import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
    Toast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DebtsTable from '../components/DebtsTable';
import { UseAppContext } from '../context/Context';
import { fechaPagos, validarCamposVacios } from '../helpers';

export default function DebtForm() {
    const { addDebt } = UseAppContext();
    const [showTable, setShowTable] = useState(false);
    const [debt, setDebt] = useState({
        motivo: '',
        valor: '',
        cuotas: '',
    });
    const toast = useToast();

    const checkEmptyFields = () => {
        const toastData = validarCamposVacios(debt);
        if (toastData) {
            toast(toastData);
            return false;
        }
        return true;
    }

    const handleShowTable = () => {
        const result = checkEmptyFields();
        if (result) {
            setShowTable(!showTable);
        }
    }

    const handleChange = (e) => setDebt({ ...debt, [e.target.name]: e.target.value });

    const addNewDebt = () => {
        const result = checkEmptyFields();
        if (!result) return;

        const deuda = { ...debt };
        const cuotasList = [];
        for (let i = 1; i <= deuda.cuotas; i++) {
            cuotasList.push({ [i]: fechaPagos(i), valorCuota: deuda.valor / deuda.cuotas, completado: false });
        }
        deuda.cuotasList = cuotasList;
        deuda.activo = true;
        deuda.historial = [];
        addDebt(deuda);
        toast({ title: 'Agredado!', description: 'La nueva deuda se ha agredado correctamente', status: 'success', position: 'top', duration: 3000, isClosable: true })
        setDebt({ motivo: '', valor: '', cuotas: '' });
        setShowTable(false);
    }

    return (
        <Box
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            rounded={'lg'}
            m={2}
        >
            <Stack spacing={4}>
                <FormControl id="nombre">
                    <FormLabel>Nombre de la deuda</FormLabel>
                    <Input type="text" name="motivo" value={debt.motivo} onChange={handleChange} />
                </FormControl>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                    gap={2}
                >
                    <FormControl id="deuda">
                        <FormLabel>Valor Debido</FormLabel>
                        <Input type="number" name="valor" value={debt.valor} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="cuotas">
                        <FormLabel>Cantidad de cuotas</FormLabel>
                        <Input type="number" name="cuotas" value={debt.cuotas} onChange={handleChange} />
                    </FormControl>
                </Flex>
                <Flex
                    direction={{ base: 'column', sm: 'row', sx: 'row' }}
                    align={'start'}
                    gap={1}
                >
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={addNewDebt}
                    >
                        Agregar
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={handleShowTable}
                    >
                        Calcular
                    </Button>
                </Flex>
                <DebtsTable data={debt} showTable={showTable} />
            </Stack>
        </Box>
    )
}