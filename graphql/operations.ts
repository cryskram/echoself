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
  mutation ConsumeGeneration($regId: String!) {
    consumeGeneration(regId: $regId) {
      regId
      generations
    }
  }
`;

export const RESET_GENERATIONS = gql`
  mutation ResetGenerations($regId: String!) {
    resetGenerations(regId: $regId) {
      regId
      generations
    }
  }
`;
