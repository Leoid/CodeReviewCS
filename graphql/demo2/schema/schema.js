var jwt = require('jsonwebtoken');
const lodash = require('lodash');
const graphql = require('graphql');
const _ = require('lodash');
const {
            GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;

const User = require('../models/user.js');

// GraphQL Object Types [user]
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id:   { type: GraphQLID},
		username: { type: GraphQLString},
		email: { type: GraphQLString},
		password: { type: GraphQLString},
	})
});

/// Root Query to Call
const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		me: {
			type: UserType,
			async resolve(parent,args,user){
                const authuser = await User.findById(user.user.id);
                if(authuser){
                    return authuser;
                }
                return null;

			}
		},
                /*
		users:{
			type: GraphQLList(UserType),
			resolve(parent,args){
                return User.find({});
			}
		},
        */
	}
});

/// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        register:{
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password,
                });
            return user.save();
            }

        },
     login: {
            type: GraphQLString,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            async resolve(parent,args,SECRET){
                const user = await User.findOne({username: args.username});
                if(!user){
                    throw new Error("Incorrect username!");
                }
                const ispass = await User.findOne({password: args.password});
                if(!ispass){
                    throw new Error("Incorrect password!");
                }

                const jwttoken = jwt.sign(
                    {
                    user: lodash.pick(user, ['id','username']),

                },
                'SECRET',
                    {
                        expiresIn: '1d',
                    }
                );
                //return user
                return jwttoken;
            }

        },


    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


