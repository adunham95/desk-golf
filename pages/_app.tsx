import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: '/api/graphql',
  });

  return (
    // @ts-ignore
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
