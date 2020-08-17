const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const schema = require('./schema/schema');

const {
       GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;

const app = express();
const { buildSchema } = require('graphql');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
