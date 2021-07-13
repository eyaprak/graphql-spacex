import React from 'react'
import { useParams } from 'react-router';
import classNames from 'classnames'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom';





export default function Launch() {
    const { flight_number } = useParams();
    const LAUNCH_QUERY = gql`
    query LaunchQuery{
    launch(flight_number: ${flight_number}){
        flight_number
        mission_name
        launch_date_local
        launch_year
        launch_success
        rocket{
            rocket_id
            rocket_name
            rocket_type
        }
    }
}`;

    const { loading, error, data } = useQuery(LAUNCH_QUERY)
    const launch = data?.launch
    const rocket = data?.launch.rocket
    return (
        <div>
            <h1>Launch</h1>
            {loading ? <h4>Data is coming...</h4> :
                typeof error === "undefined" ?
                    <div>
                        <h1 className="display-4 my-3">
                            <span className="text-dark">Mission: </span> {launch.mission_name}
                        </h1>
                        <h4 className="mb-3">Launch Details</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Flight Number: {launch.flight_number}
                            </li>
                            <li className="list-group-item">
                                Launch Year: {launch.launch_year}
                            </li>
                            <li className="list-group-item">
                                Launch Successful: <span className={classNames({
                                    'text-success': launch.launch_success,
                                    'text-danger': !launch.launch_success
                                })}>{launch.launch_success ? 'Yes' : 'No'}</span>
                            </li>
                        </ul>
                        <h4 className="my-3">Rocket Details</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Rocket ID: {rocket.rocket_id}</li>
                            <li className="list-group-item">Rocket Name: {rocket.rocket_name}</li>
                            <li className="list-group-item">Rocket Type: {rocket.rocket_type}</li>
                        </ul>
                        <hr />
                        <Link to="/" className="btn btn-secondary">Back</Link>
                    </div>

                    : <h4>{error}</h4>
            }

        </div>
    )
}
