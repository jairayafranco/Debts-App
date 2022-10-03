import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ActiveDebtCards, CompletedDebtCards } from './DebtCardsContainer';

export default function DebtTabs() {
    return (
        <Tabs isFitted variant='enclosed' m={2}>
            <TabList mb='1em'>
                <Tab>Activos</Tab>
                <Tab>Completados</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ActiveDebtCards />
                </TabPanel>
                <TabPanel>
                    <CompletedDebtCards />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}