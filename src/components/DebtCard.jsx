import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import DebtDetailsModal from './DebtDetailsModal';

export default function DebtCard({ debt }) {
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Box
                maxW={'280px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.600')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                id={debt.id}
            >
                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} align={'center'} fontWeight={500} fontFamily={'body'}>
                            {debt?.motivo.charAt(0).toUpperCase() + debt?.motivo.slice(1)}
                        </Heading>
                        {/* <Text color={'gray.500'}>Frontend Developer</Text> */}
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{debt?.cuotas}</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Cuotas
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{debt?.valor}</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Total
                            </Text>
                        </Stack>
                    </Stack>
                    <DebtDetailsModal debt={debt} />
                </Box>
            </Box>
        </Flex>
    );
}