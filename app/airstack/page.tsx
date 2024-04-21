'use client'
import React, { useEffect, useState } from 'react';
import { getUserByIdentity } from '@/utils/airstack';


interface Social {
  id: string;
  fnames: string[];
}

// Define SocialsResponse directly in UserProfilePage.tsx
type SocialsResponse = {
  Socials?: {
    Social: Social[];
  };
};

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<SocialsResponse | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserByIdentity();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const getUserName = () => {
    return user?.Socials?.Social[0]?.fnames[0] || 'Unknown';
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <h2>User Name: {getUserName()}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfilePage;