/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';

export default function Home() {
    // table columnlist
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

    // state for storing api data
    const [userData, setUserData] = useState([]);

    // state for tracking the selected row
    const [selectedRow, setSelectedRow] = useState(null);

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

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                title="User Information"
                columns={columnData}
                data={userData}
                // to select the specific row
                onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
                options={{
                    // after selecting the row then it change the bg color
                    rowStyle: (rowData) => ({
                        backgroundColor: selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
                    }),
                    paging: false,
                    exportAllData: true,
                    exportButton: true,
                }}
                editable={{
                    // Add new row
                    onRowAdd: (newData) =>
                        axios
                            .post('https://jsonplaceholder.typicode.com/users', newData)
                            .then((res) => setUserData([...userData, newData])),

                    // update row
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
                            })
                            .catch((err) => {
                                console.log(err);
                                console.log('nishan');
                            }),

                    // delete row
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
                            })
                            .catch((err) => console.log(err)),
                }}
            />
        </div>
    );
}
