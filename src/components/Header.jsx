import {Buttons} from './Buttons'
import Router from '../Router'
import TaskPage from '../components/SectionTab/TaskPage'
import React from 'react'

const Header = () =>  {

    const routes = {
        '/':() =>  <Buttons/>,
        '/Topic/:id': TaskPage,
        '*' : () => <div>404 error...</div>
    }

    return (
        <>
            <Router routes={routes}/>
        </>
    )
}

export default Header