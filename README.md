```
npm install
npm run dev
```
a
Head to http://localhost:3000/api



///////////////
query de los monos 
query MyQuery {
  Ethereum: TokenBalances(
    input: {filter: {tokenAddress: {_eq: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      token {
        name
        symbol
        totalSupply
        contractMetaData {
          name
          description
          image
          externalLink
        }
      }
      owner {
        identity
      }
      amount
      tokenAddress
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            small
          }
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}