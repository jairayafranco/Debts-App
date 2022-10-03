import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import DebtsDetailsModalTable from './DebtsDetailsModalTable';

export default function DebtDetailsModal({ debt }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'blue.400')}
                color={'white'}
                rounded={'md'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
                onClick={onOpen}>
                Ver detalles
            </Button>

            <Modal closeOnOverlayClick={false} scrollBehavior={'inside'} size={'2xl'} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {debt?.motivo.charAt(0).toUpperCase() + debt?.motivo.slice(1)} | {debt?.valor}$ - {debt?.cuotas} cuotas
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DebtsDetailsModalTable debt={debt} />
                    </ModalBody>
                    <ModalFooter>
                        <Button bg={'green.400'} mr={1} onClick={onClose}>Finalizar Deuda</Button>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}