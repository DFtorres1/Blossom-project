'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      {
        characters(page: 1) {
          results {
            name
            status
            species
            gender
            image
            origin {
              name
              dimension
            }
          }
        }
      }
    `;

    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(res => res.data.characters.results);

    console.log(response);

    const characterData = response.map(char => ({
      status: char.status,
      species: char.species,
      gender: char.gender,
      name: char.name,
      image_path: char.image,
      is_starred: false,
      origin: JSON.stringify({
        name: char.origin.name,
        dimension: char.origin.dimension,
      }),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('Characters', characterData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  },
};
