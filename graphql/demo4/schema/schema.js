var jwt = require('jsonwebtoken');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const lodash = require('lodash');
const graphql = require('graphql');
const _ = require('lodash');
const {
            GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull,GraphQLDirective,GraphQLEnumType
} = graphql;

const User = require('../models/user.js');


const RolesEnum = new GraphQLEnumType({
    name: 'UserRoles',
    values: {
        ADMIN: {
            value: 0,
        },
        USER: {
            value: 1,
        },
    },
});

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

		user:{
			type: GraphQLList(UserType),
            args:{
                search: {type: GraphQLJSONObject},
            },
			resolve(parent,args){
                console.log(args);
                return User.find(args.search);

			}
		},

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
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                role: {type: RolesEnum},
            },
            async resolve(parent,args,SECRET){
                const user = await User.findOne({email: args.email});
                if(!user){
                    throw new Error("Incorrect username!");
                }
                const ispass = await User.findOne({password: args.password});
                if(!ispass){
                    throw new Error("Incorrect password!");
                }

                const jwttoken = jwt.sign(
                    {
                    user: lodash.pick(user, ['id','email']),
                    role: args.role,

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


