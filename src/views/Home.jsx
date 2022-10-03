import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import DebtForm from '../components/DebtForm';
import Tabs from '../components/DebtTabs';
import { UseAppContext } from '../context/Context';

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { userSessionData, logout } = UseAppContext();

    const handleLogout = async () => await logout();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Dashboard</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <h4>Bienvenido</h4>
                                    </Center>
                                    <Center>
                                        <p>{userSessionData?.email}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Ajustes</MenuItem>
                                    <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <DebtForm />
            <Tabs />
        </>
    );
}