import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../component/Spinner'
import { GET_PROJECT } from '../query/projectQueries'
import { Link } from 'react-router-dom'
import ClientInfo from '../component/ClientInfo'
import DeleteProjectButton from '../component/DeleteProjectButton'
import EditProjectForm from '../component/EditProjectForm'
const ProjectDetail = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    })
    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
    return (
        <React.Fragment>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to='/' className='btn btn-primary btn-sm w-25 d-inline ms-auto'>Back</Link>

                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead fs-6">{data.project.status}</p>
                    <ClientInfo client={data.project.client} />
                    <EditProjectForm project={data.project} />
                    <DeleteProjectButton projectId={data.project.id} />
                </div>
            )}
        </React.Fragment>
    )
}

export default ProjectDetail