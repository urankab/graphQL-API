const { ApolloServer, gql, ApolloError } = require('apollo-server')
const SessionAPI = require('./datasource/sessions')
const SpeakerAPI = require('./datasource/speakers')

const typeDefs = require('./schema.js')
const resolvers = require('./resolvers.js')

const dataSources = () => ({
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI()
})

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources,
    debug: false,
    formatError: (err) => {
        if(err.extensions.code == 'GRAPHQL_VALIDATION_FAILED'){
            return new ApolloError('YOU GOOFED ON ADDING A NON EXISTENT VALUE', 'ERROR', { token: "uniq_token" })
            // the token is an idea for creating a ticket item
        }
        
        return err
    }
    
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`graphQL running at ${ url }`)
})