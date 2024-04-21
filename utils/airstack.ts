import { gql, GraphQLClient } from 'graphql-request';

const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
const NEXT_PUBLIC_AIRSTACK_API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;

interface Social {
  id: string;
  fnames: string[];
}

interface SocialsResponse {
  Socials?: {
    Social: Social[];
  };
}

const userQuery: any = gql`
  query MyQuery {
    Socials(
      input: {
        filter: { dappName: { _eq: "farcaster" }, identity: { _eq: "fc_fid:325850" } }
        blockchain: ethereum
      }
    ) {
      Social {
        id
        fnames
      }
    }
  }
`;

export async function getUserByIdentity(): Promise<SocialsResponse | null> {
  const graphQLClient = new GraphQLClient(AIRSTACK_API_URL, {
    headers: {
      Authorization: `Bearer ${AIRSTACK_API_KEY}`,
    },
  });

  try {
    const responseData = await graphQLClient.request<SocialsResponse>(userQuery);
    return responseData;
  } catch (error) {
    console.error('Error fetching user information by identity:', error);
    return null;
  }
}
