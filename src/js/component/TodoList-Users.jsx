import React, {useEffect, useState} from "react";

export const TodoListUsers = () =>{
    const [ users, setUsers ] = useState();

    const baseUrl = 'https://playground.4geeks.com/apis/fake/todos';

    const getUsers = async () =>{
        const url = baseUrl + '/user'
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setUsers(data)
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }


    useEffect(() =>{
        getUsers()
    }, [])

    return(
        <div className="container">
            <h1 className="text-center m-2">Users List</h1>
            <button type="button" className="btn btn-success m-2">
                Create new ToDO
            </button>
            <ul className="list-group">
                { users ? users.map((item) =>{
                    return (<li className="list-group-item d-flex justify-content-between list-group-item-dark" key={item}> {item} 
                    <span><i className="far fa-trash-alt text-danger"></i></span>
                    </li>)
                }) : ""}
            </ul>
        </div>
    )
}