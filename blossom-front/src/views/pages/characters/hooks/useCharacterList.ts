import { gql, useQuery } from "@apollo/client";

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

type CharactersQueryVariables = {
  name?: string;
  species?: string;
  is_starred?: boolean;
  order_by?: string;
  order_direction?: string;
};

const useCharacterList = (filters: FilterValues) => {
  const variables: CharactersQueryVariables = {};

  if (filters.character === "Starred") {
    variables.is_starred = true;
  } else if (filters.character === "Others") {
    variables.is_starred = false;
  }

  if (filters.specie !== "All") variables.species = filters.specie;
  if (filters.name.trim() !== "") variables.name = filters.name.trim();

  variables.order_by = "name";
  variables.order_direction = filters.sort;

  return useQuery(CHARACTERS_QUERY, { variables });
};

export default useCharacterList;
