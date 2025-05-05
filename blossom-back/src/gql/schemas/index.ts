import { buildSchema } from 'graphql';

// Build GraphQL schema using SDL syntax
const schema = buildSchema(`
    type DeleteResult {
      result: String
    }

    type Origin {
      name: String
      url: String
    }

    type Character {
      id: ID!
      name: String
      status: String
      species: String
      gender: String
      image_path: String
      is_starred: Boolean
      origin: Origin
    }

    type Query {
      character(id: ID!): Character

      characters(
      id: ID
      name: String
      status: String
      species: String
      gender: String
      is_starred: Boolean
      order_by: String
      order_direction: String
      ): [Character]
    }
    
    type Mutation {
      updateIsStarred(id: ID!, is_starred: Boolean!): Character
      deleteCharacter(id: ID!): DeleteResult
    }
`);

export default schema;
