import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // ✅ Make sure this is correct
  cache: new InMemoryCache(),
});

export default client;
