import { gql } from '@apollo/client'

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

// export const DELETE_CLIENT = gql`
// query deleteClient {

// }
// `