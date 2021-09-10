import {
    HelloBrightspotQuery, HelloBrightspotQueryVariables, useHelloBrightspotQuery as originalQuery
} from './graphql'
import * as Apollo from '@apollo/client'
import { ApolloQueryResult, QueryResult } from '@apollo/react-hooks'
import { generateUseQuery } from '../rest/query'

const useQuery = generateUseQuery('helloBrightspot', originalQuery)
export const useHelloBrightspotQuery = (baseOptions?: Apollo.QueryHookOptions<HelloBrightspotQuery, HelloBrightspotQueryVariables>):
    ApolloQueryResult<HelloBrightspotQuery> | QueryResult<HelloBrightspotQuery, HelloBrightspotQueryVariables> => {

    return useQuery(baseOptions)
}