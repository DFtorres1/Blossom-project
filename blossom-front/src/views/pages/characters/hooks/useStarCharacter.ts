import { gql, useMutation } from "@apollo/client";

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

const useStarCharacter = () => {
  return useMutation(STAR_CHARACTER_QUERY);
};

export default useStarCharacter;
