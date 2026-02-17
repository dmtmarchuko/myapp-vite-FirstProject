import React from 'react'

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
        <a className="RouterLink" href={to} onClick={handelClick} {...rest}>
            {children}
        </a>
    )
}

export default RouterLink