import React from 'react'

export const Button = ({isActive, children, ...props}) => {
    return (
        <button {...props} className={isActive? 'button_element active': 'button_element'}>{children}</button>
    )
}