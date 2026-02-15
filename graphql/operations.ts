import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      regId
      name
      generations
    }
  }
`;

export const CONSUME_GENERATION = gql`
  mutation ConsumeGeneration($regid: String!) {
    consumeGeneration(regid: $regid) {
      regid
      generations
    }
  }
`;
