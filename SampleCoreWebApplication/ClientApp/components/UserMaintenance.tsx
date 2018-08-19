import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface UserMaintenanceState {
    users: User[];
    loading: boolean;
    textValue: string;
}

export class UserMaintenance extends React.Component<RouteComponentProps<{}>, UserMaintenanceState> {
    constructor() {
        super();
        this.state = { users: [], loading: true, textValue: "A" };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        fetch('api/UserMaintenance/Users')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    handleInputChange(event: { target: any; }) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: { preventDefault: () => void; }) {

        event.preventDefault();
        
        fetch('api/UserMaintenance/Search?name=' + this.state.textValue)
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loading: false, textValue: this.state.textValue });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : UserMaintenance.renderForecastsTable(this.state.users);

        return <div>
            <h1>UserMaintenance</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="textValue" value={this.state.textValue} onChange={this.handleInputChange} />
                </label>
                <button>Search</button>
            </form>
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
