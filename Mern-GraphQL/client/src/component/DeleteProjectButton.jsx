import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GET_PROJECTS } from '../query/projectQueries'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutation/projectMutation'
const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    const handleDelete = () => {
        deleteProject(projectId);
    }
    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className="btn btn-danger m-2" onClick={handleDelete}>
                <FaTrash className='icon' /> Delete Project
            </button>
        </div>
    )
}

export default DeleteProjectButton