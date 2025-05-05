import { gql, useMutation } from "@apollo/client";

// GraphQL mutation to update a character's 'is_starred' status
export const STAR_CHARACTER_QUERY = gql`
  mutation updatedCharacter($id: ID!, $is_starred: Boolean!) {
    updateIsStarred(id: $id, is_starred: $is_starred) {
      name
      image_path
      is_starred
      species
      status
      origin {
        name
      }
    }
  }
`;

// Custom hook to execute the star/unstar mutation for a character
const useStarCharacter = () => {
  return useMutation(STAR_CHARACTER_QUERY);
};

export default useStarCharacter;
