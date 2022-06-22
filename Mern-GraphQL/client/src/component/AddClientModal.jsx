import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from '../mutation/clientMutation'
import { GET_CLIENTS } from '../query/clientQueries'

const AddClientModal = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name: formData.name, email: formData.email, phone: formData.phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            })

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addClient(formData.name, formData.email, formData.phone);
        setFormData({
            name: '',
            email: '',
            phone: ''
        })
    }
    return (
        <>
            <button
                type='button'
                className='btn btn-secondary m-3'
                data-bs-toggle='modal'
                data-bs-target='#addClientModal'
            >
                <div className='d-flex align-items-center'>
                    <FaUser className='icon' />
                    <div>Add Client</div>
                </div>
            </button>

            <div
                className='modal fade'
                id='addClientModal'
                aria-labelledby='addClientModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addClientModalLabel'>
                                Add Client
                            </h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={onSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Phone</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='phone'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type='submit'
                                    data-bs-dismiss='modal'
                                    className='btn btn-secondary'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientModal