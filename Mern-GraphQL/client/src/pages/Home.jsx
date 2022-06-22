import React from 'react'
import AddClientModal from '../component/AddClientModal'
import AddProjectModal from '../component/AddProjectModal'
import Client from '../component/Client'
import Projects from '../component/Projects'

const Home = () => {
    return (
        <React.Fragment>
            <AddClientModal />
            <AddProjectModal />
            <Projects />
            <Client />
        </React.Fragment>
    )
}

export default Home