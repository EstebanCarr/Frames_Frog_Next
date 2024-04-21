import axios from 'axios';

const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
const AIRSTACK_API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;

interface Participant {
  profileName: string;
  fid: string;
  userAssociatedAddresses: string;
  followerCount: number;
}

interface ParticipantsResponse {
  FarcasterChannels?: {
    FarcasterChannel?: {
      participants?: {
        participant: Participant[];
      };
    };
  }[];
}

export async function fetchData(): Promise<Participant[] | null> {
  const query = `
    query MyQuery {
      FarcasterChannels(
        input: {blockchain: ALL, filter: {channelId: {_eq: "onchainloteria"}}}
      ) {
        FarcasterChannel {
          participants {
            participant {
              profileName
              fid: userId
              userAssociatedAddresses
              followerCount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      AIRSTACK_API_URL,
      { query },
      {
        headers: {
          'x-api-key': AIRSTACK_API_KEY,
        },
      }
    );

    const participants = response.data.data.FarcasterChannels[0]?.FarcasterChannel.participants;

    if (participants && participants.length > 0) {
      return participants.map((participant: any) => participant.participant);
    } else {
      console.log('No participants found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
