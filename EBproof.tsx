import { Button, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";


const SnapshotEB: NextPage = () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const uniquePurchasersSet = new Set();
    const [snapshot, setSnapshot] = useState<any[]>([]);
    // Function to process and extract unique purchasers from the data
    // Function to process and extract unique purchasers from the data
    function processSalesData(data: { listings: any[]; }) {
        if (data && data.listings && Array.isArray(data.listings)) {
            data.listings.forEach((sale: { purchaser: any; }) => {
                const purchaser = sale.purchaser;
                uniquePurchasersSet.add(purchaser);
            });
        }
    }


    // Function to fetch and process data from the API
    async function fetchData() {
        try {
            const response = await fetch(
                'https://api.ebisusbay.com/listings?collection=0xdbFDf81D1fDD2e79e8ffaDE50c219452587e9488&state=1&pageSize=4000&minSaleTime=1693551600&maxSaleTime=1696143600',
                options
            );

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            processSalesData(data);

            // You can convert the Set to an array if needed
            const uniquePurchasers = Array.from(uniquePurchasersSet);
            setSnapshot(uniquePurchasers);
        } catch (error) {
            console.log(error)
            console.error('Error fetching data:', error);
        }
    }

    return (
        <VStack textAlign={"center"} p={4}>
            <Button onClick={() => fetchData()}>
                Get snapshot September - October
            </Button>
            {snapshot.map((address) => (<Text key={address} textColor={"white"}>{(`-${address}`)}</Text>))}
            <Text textColor={"white"}>Unique buyers = {snapshot?.length}</Text>
        </VStack>
    );
}
export default SnapshotEB;
