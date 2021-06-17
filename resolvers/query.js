module.exports = {
    sessions: (parent, args, { dataSources }, info) => {
        return dataSources.sessionAPI.getSessions(args)
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
        try {
            return dataSources.sessionAPI.getSessionById(id)
        } catch (error) {
            return { code: 'ERROR', message: 'OH NO!', token: '123'}
        }
    },
    speakers: (parents, args, { dataSources }, info) => {
        return dataSources.speakerAPI.getSpeakers()
    },
    speakerById: (parents, args, { dataSources }, info) => {
        return dataSources.speakerAPI.getSpeakersById(id)
    }
}