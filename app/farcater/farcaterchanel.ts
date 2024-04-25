import { ethers } from 'ethers';

export async function getContractMetadata() {
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/0x9362A5D1DB15b1A8FBBb7A3fe623e665FF87C9a3');
    
    const contractAddress = '0xContractAddress';
    const contractABI = [...]; // Aquí debes proporcionar el ABI del contrato
    
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    try {
        const metadata = await contract.contractMetadata();
        return metadata;
    } catch (error) {
        throw new Error('Error al obtener la metadata del contrato:', error);
    }
}
