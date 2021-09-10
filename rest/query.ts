import * as Apollo from '@apollo/client'
import { NetworkStatus } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ApolloQueryResult, QueryResult } from '@apollo/react-hooks'
import { OperationVariables } from '@apollo/client/core'

export const generateUseQuery = <TData = any, TVariables = OperationVariables>(restApiPath: string, originalQuery: (baseOptions?: Apollo.QueryHookOptions<TData, TVariables>)
    => QueryResult<TData, TVariables>) => (baseOptions?: Apollo.QueryHookOptions<TData, TVariables>):
    ApolloQueryResult<TData> | QueryResult<TData, TVariables> => {

    const [response, setResponse] = useState<ApolloQueryResult<TData>>(typeof window === 'undefined'
        ? originalQuery(baseOptions)
        : {
            data: undefined,
            loading: true,
            networkStatus: NetworkStatus.loading
        }
    )

    const searchParams = new URLSearchParams()

    Object.entries(baseOptions.variables).forEach(([key, value]) => {
        searchParams.append(key, value)
    })

    useEffect(() => {
        if (!response.data) {
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${restApiPath}?${searchParams.toString()}`)
            .then(response => response.json())
            .then(d => setResponse(d))
        }
    }, [])

    return response
}