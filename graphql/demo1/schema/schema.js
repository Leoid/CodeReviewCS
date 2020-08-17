const graphql = require('graphql');
const _ = require('lodash');
const {
            GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;

const User = require('../models/user.js');
const Course = require('../models/course.js');

// GraphQL Object Types [user, course]
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id:   { type: GraphQLID},
		name: { type: GraphQLString},
		role: { type: GraphQLString},
		course: {
			type: CourseType,
			resolve(parent, args){
			return Course.findById(parent.courseId)
			}
		}
	})
});

const CourseType = new GraphQLObjectType({
	name: 'Course',
	fields: () => ({
		id:   { type: GraphQLID},
		name: { type: GraphQLString},
		price: { type: GraphQLString},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args){
				return User.find({courseId: parent.id});
			}
		}
	})
});


/// Root Query to Call
const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLID }},
			resolve(parent,args){
                return User.findById(args.id);

			}
		},
		course: {
			type: CourseType,
			args: {id: {type: GraphQLID }},
			resolve(parent,args){
			//return _.find(courses, {id: args.id});
            return Course.findById(args.id);

			}
		},
		users:{
			type: GraphQLList(UserType),
			resolve(parent,args){
                return User.find({});
			}
		},
		courses:{
			type: GraphQLList(CourseType),
			resolve(parent,args){
                return Course.find({});
			}
		}
	}
});

/// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser:{
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                role: { type: new GraphQLNonNull(GraphQLString)},
                courseId: { type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                let user = new User({
                    name: args.name,
                    role: args.role,
                    courseId: args.courseId,
                });
            return user.save();
            }

        },
        addCourse:{
            type: CourseType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                price: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let course = new Course({
                    name: args.name,
                    price: args.price,
                });
            return course.save();
            }

        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});






























