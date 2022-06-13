import React from 'react'
import Header from './component/Header'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Client from './component/Client'
import AddClientModal from './component/AddClientModal'
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache
})
const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <AddClientModal />
          <Client />
        </div>
      </ApolloProvider>
    </>

  )
}

export default App