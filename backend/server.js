const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const cors = require('cors');  // <-- Import the cors package

const schema = buildSchema(`
    type Query {
        humans(page: Int!): String
    }
`);

const rootValue = {
    humans: async ({ page }) => {
        try {
            const response = await axios.post(`https://rickandmortyapi.com/graphql`, {
                query: `
                {
                    characters(page: ${page}, filter: {species: "Human"}) {
                      info {
                        count
                      }
                      results {
                        name
                        image
                        status
                        gender
                        origin {
                          name
                        }
                        location {
                          name
                        }
                        episode {
                          name
                        }
                      }
                    }
                  }
                `
            });
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }
};

const app = express();

app.use(cors()); // <-- Use the cors middleware

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
