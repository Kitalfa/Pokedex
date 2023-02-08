const database = require('./database');

const dataMapper = {

    getAllPokemon: (callback) => {

        const query = {
            text: `SELECT "pokemon".* 
            FROM "pokemon"
            `
        };

        database.query(query, (error, result) => {
            console.debug('dataMapper getAllPokemon', query, error, result.rowCount);
            callback(error, result);
        });

    },

    getOnePokemonById: (id, callback) => {

        const query = {
            text: `
                SELECT 
                "pokemon".*,
                "type"."id" AS "type_id",
                "type"."name",
                "type"."color"
                FROM "pokemon"
                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"
                JOIN "type" ON "type"."id" = "pokemon_type"."type_id"
                WHERE "pokemon"."id" = $1
            `,
            values: [id]
        };

        database.query(query, (error, result) => {
            console.debug('dataMapper getOnePokemonById', query, error, result.rowCount);
            callback(error, result);
        });


    },

    getAllType: (callback) => {

        const query = {
            text: `SELECT * FROM "type"`
        };

        database.query(query, (error, result) => {
            console.debug('dataMapper getAllType', query, error, result.rowCount);
            callback(error, result);
        });

    },

    getPokemonByTypeId: (id, callback) => {

        const query = {
            text: `
                SELECT "pokemon".* 
                FROM "pokemon"
                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"
                WHERE "type_id" = $1
            `,
            values: [id]
        };

        database.query(query, (error, result) => {
            console.debug('dataMapper getPokemonByTypeId', query, error, result.rowCount);
            callback(error, result);
        });

    },

};

module.exports = dataMapper;