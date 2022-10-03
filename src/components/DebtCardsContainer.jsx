import { useState } from 'react';
import { SimpleGrid, Text, Flex } from '@chakra-ui/react'
import DebtCard from './DebtCard';
import { UseAppContext } from '../context/Context';
import { useEffect } from 'react';

export function ActiveDebtCards() {
    const [activeDebts, setActiveDebts] = useState([]);
    const { allDebts } = UseAppContext();

    useEffect(() => {
        setActiveDebts(allDebts.active)
    }, [allDebts]);

    if (activeDebts?.length === 0) {
        return (
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Text fontSize={'2xl'} align={'center'} fontWeight={500} fontFamily={'body'}>
                    No hay deudas activas
                </Text>
            </Flex>
        )
    }

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={6}>
            {activeDebts?.map((debt, index) => (
                <DebtCard key={index} debt={debt} />
            ))}
        </SimpleGrid>
    );
}

export function CompletedDebtCards() {
    const [completedDebts, setCompletedDebts] = useState([]);
    const { allDebts } = UseAppContext();

    useEffect(() => {
        setCompletedDebts(allDebts.completed)
    }, [allDebts]);

    if (completedDebts?.length === 0) {
        return (
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Text fontSize={'2xl'} align={'center'} fontWeight={500} fontFamily={'body'}>
                    No hay deudas completadas
                </Text>
            </Flex>
        )
    }

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={6}>
            {completedDebts?.map((debt, index) => (
                <DebtCard key={index} debt={debt} />
            ))}
        </SimpleGrid>
    );
}