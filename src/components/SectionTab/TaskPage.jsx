import { useEffect, useState } from "react"
import tasksAPI from "../../api/taskAPI"
import React from 'react'

const TaskPage = (props) => {
    const { params } = props

    const taskId = params.id

    const[task, setTask] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((taskData) => {setTask(taskData)})
            .catch(() => setError(true))
            .finally(() => {setLoading(false)})
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Task not found</div>
    }

    return (
        <>
            <h3>Name: {task.id}</h3>
            <p>Title: {task.title}</p>
        </>
    )
}

export default TaskPage