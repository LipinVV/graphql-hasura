import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {setContext} from "@apollo/client/link/context";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, createHttpLink,
} from "@apollo/client";

import './index.css';

const httpLink = createHttpLink({
    uri: 'https://nearby-emu-27.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = 'WmynD3I1siSpHUpXAPQNyrp6Mb71ZHBJ3cydq6PqwAiS9Be3No5lLuiHe0NiYl9j';
    return {
        headers: {
            ...headers,
            "x-hasura-admin-secret": token
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>
  </React.StrictMode>
);