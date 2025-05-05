import { gql, useQuery } from "@apollo/client";

// GraphQL query to fetch a character's detail by its ID
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

// Custom hook to execute the character detail query
const useCharacterDetail = (id: number) => {
  return useQuery(CHARACTER_QUERY, {
    variables: { id },
  });
};

export default useCharacterDetail;
