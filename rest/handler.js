import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import fs from 'fs-extra'

export default class Handler {

    constructor(queryFile, variableNames) {
        this.query = gql `${fs.readFileSync(queryFile, 'utf8')}`
        this.variableNames = variableNames

        this.client = new ApolloClient({
            link: createHttpLink({
                    fetch,
                    uri: process.env.GRAPHQL_URL,
                    headers: {
                        'X-API-Key': process.env.API_KEY
                    }
                }
            ),
            cache: new InMemoryCache()
        })
    }

    async handle(req, res) {

        const { previewId } = req.query;
        const variables = previewId != null ? { id: previewId } : {}

        this.variableNames.forEach(v => variables[v] = req.query[v])

        const data = await this.client.query({
            query: this.query,
            variables
        })

        res.status(200).json(data)
    }
}
