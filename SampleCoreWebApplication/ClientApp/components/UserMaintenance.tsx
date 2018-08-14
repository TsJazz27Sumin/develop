import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface UserMaintenanceState {
    users: User[];
    loading: boolean;
}

export class UserMaintenance extends React.Component<RouteComponentProps<{}>, UserMaintenanceState> {
    constructor() {
        super();
        this.state = { users: [], loading: true };

        fetch('api/SampleData/Users')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : UserMaintenance.renderForecastsTable(this.state.users);

        return <div>
            <h1>UserMaintenance</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>;
    }

    private static renderForecastsTable(user: User[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Occupation</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {user.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.occupation}</td>
                        <td>{user.age}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface User {
    id: string;
    name: string;
    occupation: string;
    age: string;
}
