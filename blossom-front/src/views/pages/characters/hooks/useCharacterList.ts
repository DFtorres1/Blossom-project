import { gql, useQuery } from "@apollo/client";

// GraphQL query to fetch a list of characters based on optional filters
export const CHARACTERS_QUERY = gql`
  query Characters(
    $name: String
    $species: String
    $is_starred: Boolean
    $order_by: String
    $order_direction: String
  ) {
    characters(
      name: $name
      species: $species
      is_starred: $is_starred
      order_by: $order_by
      order_direction: $order_direction
    ) {
      id
      name
      image_path
      is_starred
      species
    }
  }
`;

// Type definition for query variables
type CharactersQueryVariables = {
  name?: string;
  species?: string;
  is_starred?: boolean;
  order_by?: string;
  order_direction?: string;
};

// Custom hook to fetch the list of characters based on filters
const useCharacterList = (filters: FilterValues) => {
  const variables: CharactersQueryVariables = {};

  // Apply character filter based on starred status
  if (filters.character === "Starred") {
    variables.is_starred = true;
  } else if (filters.character === "Others") {
    variables.is_starred = false;
  }

  // Apply species filter if it's not 'All'
  if (filters.specie !== "All") variables.species = filters.specie;

  // Apply name filter if it's not empty
  if (filters.name.trim() !== "") variables.name = filters.name.trim();

  // Always order by name and set sort direction
  variables.order_by = "name";
  variables.order_direction = filters.sort;

  // Execute the query with the constructed variables
  return useQuery(CHARACTERS_QUERY, { variables });
};

export default useCharacterList;
