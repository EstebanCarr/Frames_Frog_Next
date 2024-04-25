import { useEffect, useState } from 'react';
import { getContractMetadata } from '../utils/contractUtils'; // Ajusta la ruta según donde hayas colocado el archivo

export default function Home() {
    const [metadata, setMetadata] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const contractMetadata = await getContractMetadata();
                setMetadata(JSON.stringify(contractMetadata, null, 2));
            } catch (err) {
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
            <h1>Metadata del Contrato</h1>
            <pre>{metadata}</pre>
        </div>
    );
}
