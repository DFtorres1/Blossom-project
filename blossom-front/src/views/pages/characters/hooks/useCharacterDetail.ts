import { gql, useQuery } from "@apollo/client";

export const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
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
const useCharacterDetail = (id: number) => {
  return useQuery(CHARACTER_QUERY, {
    variables: { id },
  });
};

export default useCharacterDetail;
