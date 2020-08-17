const typeDefs = [`
      scalar JSON
      scalar JSONObject
      type RootQuery {
              courses(search: JSONObject): [Course]
            }
      type Course{
              id: String
              name: String
              price: String
            }
    `
// DANGER!!!
const resolvers = {
    RootQuery: {
        courses: async(parent,args) => {
            const getArgs = JSON.parse(args.search)
            const courses = await Course.find(getArgs).toArray()).map(prepare)
            return courses
        }
    }
}
