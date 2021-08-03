import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const columnData = [
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'UserName',
            field: 'username',
        },
        {
            title: 'Email',
            field: 'email',
        },
        {
            title: 'Phone',
            field: 'phone',
        },
        {
            title: 'Website',
            field: 'website',
        },
    ];

    const [userData, setUserData] = useState([]);

    // user api fetch

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(userData);

    return (
        <div>
            <h1>This is home component</h1>
            <div style={{ maxWidth: '90%' }}>
                <MaterialTable title="User Information" columns={columnData} data={userData} />
            </div>
        </div>
    );
}
