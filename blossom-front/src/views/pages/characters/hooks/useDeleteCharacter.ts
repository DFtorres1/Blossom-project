import { gql, useMutation } from "@apollo/client";

export const DELETE_CHARACTER_MUTATION = gql`
  mutation updatedCharacter($id: ID!) {
    deleteCharacter(id: $id) {
        result
    }
  }
`;

const useDeleteCharacter = () => {
  return useMutation(DELETE_CHARACTER_MUTATION);
};

export default useDeleteCharacter;
