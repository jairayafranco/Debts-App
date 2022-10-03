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
    useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UseAppContext } from '../context/Context';
import Spinner from '../components/Spinner';

export default function Login() {
    const { userSessionData, loading, login } = UseAppContext();

    if (loading) return <Spinner />;

    if (userSessionData) {
        return <Navigate to="/" />;
    }

    return <LoadLogin login={login} />;
}

function LoadLogin({ login }) {
    const [user, setUser] = useState({});

    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const camposLlenos = Object.values(user);
        if (camposLlenos.length < 2) {
            return toast({ title: 'Error', description: 'Todos los campos son obligatorios', status: 'error', position: 'top', duration: 3000, isClosable: true });
        }
        handleLogin();
    }

    const handleLogin = async () => {
        try {
            await login(user.email, user.password);
            navigate('/');
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error', position: 'top', duration: 3000, isClosable: true });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>DebtsApp</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            para poder gestionar todas tus <Link color={'blue.400'}>deudas</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Correo Electronico</FormLabel>
                                <Input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Contraseña</FormLabel>
                                <Input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </FormControl>
                            <Stack spacing={10}>
                                {/* <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack> */}
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Iniciar Sesion
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}