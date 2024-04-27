import { ethers, JsonRpcProvider } from 'ethers';

export async function getContractMetadata() {
    const provider: any = new JsonRpcProvider('https://base-mainnet.g.alchemy.com/v2/-lIoQJ5s9p_LCWjpV3wbboD4KVlqQ28Q');
    
    const contractAddress = '0x9362A5D1DB15b1A8FBBb7A3fe623e665FF87C9a3';
    const contractABI = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "tokenUri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "mintPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    try {
        console.log("Consultando el nombre del contrato...");
        const name = await contract.name();
        console.log("Nombre del contrato obtenido:", name);

        const totalTokens = await contract.totalSupply();
        console.log("Total de tokens:", totalTokens);

        const uris = [];
        for (let i = 0; i < totalTokens; i++) {
            const uri = await contract.tokenUri(i);
            uris.push(uri);
        }
        console.log("URIs de los tokens obtenidos:", uris);

        const owner = await contract.owner();
        console.log("Propietario del contrato:", owner);

        const mintPrice = await contract.mintPrice();
        console.log("Precio de acuñación:", mintPrice);

        return { name, uris, owner, mintPrice };
    } catch (error: any) {
        console.error("Error al obtener los metadatos del contrato:", error);
        throw new Error('Error al obtener los metadatos del contrato:', error);
    }
}
