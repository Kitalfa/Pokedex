const dataMapper = require('../dataMapper');

const mainController = {

    homePage: (request, response) => {

        console.debug('mainController homePage');

        dataMapper.getAllPokemon((error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }
                  
            
           

            response.render('list', { pokemonList: result.rows });
        });

    },

    pokemonPage: (request, response, next) => {

        console.debug('mainController pokemonPage', request.params.id);

        const id = parseInt(request.params.id, 10);

        dataMapper.getOnePokemonById(id, (error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            if (!result.rows[0]) {
                next();
                return;
            }

            const pokemon = result.rows[0];
            pokemon.typeList = [];

            for(const type of result.rows){
                pokemon.typeList.push({
                    id: type.type_id,
                    name: type.name,
                    color: type.color,
                })
            }

            delete pokemon.type_id;
            delete pokemon.name, pokemon.color;
            delete pokemon.color;

            

            response.render('detail', pokemon);
        });

    },

    typePage: (request, response) => {

        console.debug('mainController typePage');

        dataMapper.getAllType((error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            response.render('type', { typeList: result.rows });
        });

    },

    pokemonTypePage: (request, response, next) => {

        console.debug('controller pokemonTypePage', request.params.id);

        const id = parseInt(request.params.id, 10);

        dataMapper.getPokemonByTypeId(id, (error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            if (!result.rows) {
                next();
                return;
            }

            response.render('list', { pokemonList: result.rows });
        });

    },

    notFound: (request, response) => {
        
        console.debug('mainController notFound');

        response.status(404).render('error', { error: 404, message: 'Page introuvable' });
    }

};

module.exports = mainController;