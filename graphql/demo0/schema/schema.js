const graphql = require('graphql');
const _ = require('lodash');
const {
            GraphQLObjectType, GraphQLString,
            GraphQLID, GraphQLInt,GraphQLSchema,
            GraphQLList,GraphQLNonNull
} = graphql;


//Our Cute Database
//============================================
const users = [
    { id: "0", name: "b1twis3", role: "admin", courseId: "50"},
    { id: "1", name: "user1", role: "user",    courseId: "30"},
    { id: "2", name: "user2", role: "user",    courseId: "30"},
    { id: "3", name: "user3", role: "user",	   courseId: "20"},
    { id: "4", name: "user4", role: "user",    courseId: "10"},
];

const courses = [
    { id: "10", name: "c++", 		price: "$100"},
    { id: "20", name: "javascript",  price: "$5"},
    { id: "30", name: "rust", 		price: "$1000"},
    { id: "40", name: "java", 		price: "$100"},
    { id: "50", name: "python", 		price: "$3"},
];
//===========================================

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
			return _.find(courses, {id: parent.courseId});
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
				return _.filter(users, {courseId: parent.id})
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
			return _.find(users, {id: args.id});

			}
		},
		course: {
			type: CourseType,
			args: {id: {type: GraphQLID }},
			resolve(parent,args){
			return _.find(courses, {id: args.id});

			}
		},
		users:{
			type: GraphQLList(UserType),
			resolve(parent,args){
			return users
			}
		},
		courses:{
			type: GraphQLList(CourseType),
			resolve(parent,args){
			return courses
			}
		}
	}
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});





