import React from 'react'
import { BASE_URL } from '../constans/index'

const RouterLink = (provs) => {
    const {
        to,
        children,
        ...rest
    } = provs

    const handelClick = (event) => {
        event.preventDefault()
        window.history.pushState({}, '', to)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a className="RouterLink" href={`${BASE_URL}${to}`} onClick={handelClick} {...rest}>
            {children}
        </a>
    )
}

export default RouterLink