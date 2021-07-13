import React from 'react'
import { useQuery, gql } from '@apollo/client'
import LaunchItem from './LaunchItem.js'
import MissionKey from './MissionKey'

const LAUNCHES_QUERY = gql`
query LaunchesQuery{
    launches{
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
}`;



export default function Launches() {
    const { loading, data } = useQuery(LAUNCHES_QUERY)

    return (
        <>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey />
            {
                loading ? <h4>Loading...</h4> :
                    data.launches.map(launch => (
                        <LaunchItem key={launch.flight_number} launch={launch} />
                    ))}
        </>
    )
}
