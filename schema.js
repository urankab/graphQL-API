
const { gql } = require('apollo-server')

module.exports = gql`
type Query {
    sessions (
        id: ID
        title: String
        description: String
        startsAt: String
        endsAt: String
        room: Room
        day: String
        format: String
        track: String
        level: String
    ): [Session],
    sessionById(id: ID): SessionOrError,
    speakers: [Speaker],
    speakerById(id: ID): Speaker
}

union SessionOrError = Session | Error

type Error {
    code: String
    message: String
    token: String
}

enum Room {
    EUROPA
    SOL
    SATURN
}

type Mutation {
    toggleFavoriteSession(id: ID): Session
    addNewSession(session: SessionInput): Session
}

type Speaker {
    id: ID!
    bio: String
    name: String
    sessions: [Session]
}

input SessionInput {
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "Too many sessions do not fit into a single track.")
    level: String
    favorite: Boolean
}

type Session {
    id: ID!,
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "Too many sessions do not fit into a single track.")
    level: String
    favorite: Boolean
    speakers: [Speaker]
}`