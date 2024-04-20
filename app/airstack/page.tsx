'use client'
import { gql, GraphQLClient } from 'graphql-request';
import { useState, useEffect } from 'react';
const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
const AIRSTACK_API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;

const query = gql`
  query MyQuery {
    Wallet(input: { identity: "vitalik.eth", blockchain: ethereum }) {
      socials {
        dappName
        profileName
      }
      addresses
    }
  }
`;


interface WalletData {
  addresses: string[];
}

export default function AirstackPage() {
  const [data, setData] = useState<WalletData | null>(null);
  useEffect(() => {
  async function fetchData() {
    if (!AIRSTACK_API_KEY) {
      console.error('AIRSTACK_API_KEY is not set');
      return;
    }

    const graphQLClient = new GraphQLClient(AIRSTACK_API_URL, {
      headers: {
        Authorization: AIRSTACK_API_KEY ? `Bearer ${AIRSTACK_API_KEY}` : '',
      },
    });

    try {
      const data = await graphQLClient.request<{ Wallet: WalletData }>(query);
      setData(data.Wallet);
        console.log(data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
}, []);
  return (
    <div>
    <h1>Integración de Airstack API en Next.js</h1>
    {data ? (
      <h1>{data.addresses[0]}</h1>
    ) : (
      <p>Cargando...</p>
    )}
  </div>
  );
}
