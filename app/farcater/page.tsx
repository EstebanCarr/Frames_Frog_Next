'use client'
import { useEffect, useState } from 'react';
import { getContractMetadata } from '@/utils/farcaterchanel';  // Ajusta la ruta según donde hayas colocado el archivo

export default function Home() {
    const [metadata, setMetadata] = useState<{ name: string | null; uris: string[] | null; owner: string | null; mintPrice: number | null }>({ name: null, uris: null, owner: null, mintPrice: null });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const contractMetadata = await getContractMetadata();
                setMetadata(contractMetadata);  
            } catch (err:any) {
                setError(err.message);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Contrato</h1>
            <h2>Nombre del Contrato</h2>
            <p>{metadata.name}</p>
            <h2>URIs de los Tokens</h2>
            <ul>
                {metadata.uris?.map((uri, index) => (
                    <li key={index}><a href={uri} target="_blank" rel="noopener noreferrer">{uri}</a></li>
                ))}
            </ul>
            <h2>Propietario del Contrato</h2>
            <p>{metadata.owner}</p>
            <h2>Precio de Acuñación</h2>
            <p>{metadata.mintPrice} ETH</p>
        </div>
    );
}
