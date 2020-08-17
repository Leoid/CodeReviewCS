const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const schema = require('./schema/schema');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

// JWT secret
const SECRET = "SECRET";

//authentication middleware
const auth = async (req) => {
    const token = req.headers.authorization;
    try{
        const {user} = await jwt.verify(token,SECRET);
        req.user = user;
    }
    catch(err){
        console.log(err);
    }
    req.next();

};

const {
       GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;

mongoose.connect("mongodb://127.0.0.1:27017/graphdb3");
mongoose.connection.once('open',()=>{
    console.log('[+] Connected to Database: Successful');
});

const app = express();
const { buildSchema } = require('graphql');

//app.use(auth);
app.use('/graphql', graphqlHTTP(req => ({
    schema,
    graphiql:true,
    //context: {
     //   SECRET,
      //  user: req.user,
    //},

    }))
);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
