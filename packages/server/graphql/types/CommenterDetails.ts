import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'
import {GQLContext} from '../graphql'

const CommenterDetails = new GraphQLObjectType<any, GQLContext>({
  name: 'CommenterDetails',
  description: 'The user that is commenting',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The userId of the person commenting'
    },
    preferredName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The preferred name of the user commenting'
    }
  })
})

export default CommenterDetails
