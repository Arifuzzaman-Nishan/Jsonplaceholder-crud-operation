/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
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
    // const [filterData, setFilterData] = useState([]);

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

    // const filterData = [];

    // userData.forEach((element) => {
    //     filterData.push({
    //         name: element.name,
    //         username: element.username,
    //         email: element.email,
    //         phone: element.phone,
    //         website: element.website,
    //     });
    // });

    // console.log(filterData);

    return (
        <div>
            <h1>This is home component</h1>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    title="User Information"
                    columns={columnData}
                    data={userData}
                    editable={{
                        onRowAdd: (newData) =>
                            axios
                                .post('https://jsonplaceholder.typicode.com/users', newData)
                                .then((res) => setUserData([...userData, newData])),

                        onRowUpdate: (newData, oldData) =>
                            axios
                                .patch(
                                    `https://jsonplaceholder.typicode.com/users/${
                                        oldData.tableData.id + 1
                                    }`,
                                    newData
                                )
                                .then((res) => {
                                    console.log(res.data);
                                    const dataUpdate = [...userData];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = res.data;
                                    setUserData(dataUpdate);
                                }),

                        onRowDelete: (oldData) =>
                            axios
                                .delete(
                                    `https://jsonplaceholder.typicode.com/users/${
                                        oldData.tableData.id + 1
                                    }`
                                )
                                .then((res) => {
                                    const dataDelete = [...userData];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setUserData([...dataDelete]);
                                }),
                    }}
                />
            </div>
        </div>
    );
}
