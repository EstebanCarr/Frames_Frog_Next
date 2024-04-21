// pages/farcater/farcaterchanel.tsx
'use client'
import { fetchData } from '@/app/farcater/farcaterchanel'; // Ajusta la ruta según la ubicación de tu función fetchData
import { useEffect, useState } from 'react';

const FarcaterChannelPage = () => {
  const [participants, setParticipants] = useState<any[]>([]); // Estado para almacenar los participantes

  useEffect(() => {
    const getParticipants = async () => {
      const data = await fetchData();
      setParticipants(data || []);
    };

    getParticipants();
  }, []);

  return (
    <div>
      <h1>Farcater Channel</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <h2>{participant.participant.profileName}</h2>
            <p>User ID: {participant.participant.fid}</p>
            <p>User Associated Addresses: {participant.participant.userAssociatedAddresses}</p>
            <p>Follower Count: {participant.participant.followerCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarcaterChannelPage;
