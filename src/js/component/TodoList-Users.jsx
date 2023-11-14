import React, {useEffect, useState} from "react";

// 1º hay que crear el usuario
// 2º agregar tareas
// 3º mostrar tareas
// 4º eliminar usuario

export const TodoListUsers = () =>{
    const user = 'Merlina'
    const [ task, setTask] = useState("");
    const [ list, setList ] = useState([]);

    const baseUrl = 'https://playground.4geeks.com/apis/fake/todos';

    const createUser = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([])
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const getTodo = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "GET"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList(data)

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const updateTask = async (newTask) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([...list, newTask])
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const addTask = (event) =>{
        event.preventDefault();
        if (task.trim() === ""){
            return
        };
        const newTask = {label: task, done: false};
        setList([...list, newTask]);
        updateTask(newTask);
        setTask("")
    }

    const deleteUser = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "DELETE"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList([])

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const deleteTask= (item) => {
        const listWithoutDelete = list.filter((element, id) =>{
            return item != element;
        });
        console.log(listWithoutDelete);
        setList(listWithoutDelete);
        actualiceTaskwithDelete(listWithoutDelete)
    }

    const actualiceTaskwithDelete = async (listWithoutDelete) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listWithoutDelete)
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }


    useEffect(() =>{
        getTodo()
    }, [])

    return(
        <div className="container">
            <h1 className="text-center m-2">ToDo List</h1>
            <button type="button" className="btn btn-success m-2" onClick={createUser} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Crear nuevo usuario
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-header bg-light rounded">
                        <h4 className="modal-title fs-5">The user has been created successfully!</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-warning m-2" onClick={getTodo}> 
                Obtener ToDos
            </button>
            <button type="button" className="btn btn-danger m-2" onClick={deleteUser}>
                Eliminar usuario
            </button>
            <div className="mb-3">
                <form onSubmit={addTask}>
                    <input className="form-control" placeholder="What do you need to do?" type="tet" value={task} onChange={(e) =>{setTask(e.target.value);}}/>
                </form>
            </div>
            <div className="list">
                <ul className="list-group"> 
                    {list.map((item, index) => {
                        return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                            {item.label}: {item.done ? 'Terminado' : 'Pendiente'}
                            <span key={index} onClick={() => {deleteTask(item)}}><i className="far fa-trash-alt text-danger"></i></span>
                        </li>
                    })}
                    <span className="list-group-item bg-light text-end fw-lighter">
                        {list.length === 0 ? "No tasks, add one please" : list.length + " items left."}
                    </span>
                </ul>
            </div>
        </div>
    )
}