const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');

const {
       GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;

mongoose.connect("mongodb://127.0.0.1:27017/graphdb");
mongoose.connection.once('open',()=>{
    console.log('[+] Connected to Database: Successful');
});

const app = express();
const { buildSchema } = require('graphql');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
