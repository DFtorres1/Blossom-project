import { gql, useMutation } from "@apollo/client";

// GraphQL mutation to delete a character by its ID
export const DELETE_CHARACTER_MUTATION = gql`
  mutation updatedCharacter($id: ID!) {
    deleteCharacter(id: $id) {
        result
    }
  }
`;

// Custom hook to execute the character deletion mutation
const useDeleteCharacter = () => {
  return useMutation(DELETE_CHARACTER_MUTATION);
};

export default useDeleteCharacter;
