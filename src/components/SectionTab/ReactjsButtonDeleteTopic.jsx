import React from 'react'

export  function ReactjsButtonDeleteTopic(props) {
    const {
        topic,
        handelCLick,
    }= props

    return (
        <>
            {topic && <button onClick={handelCLick} className="button_element">delete topic: {topic} </button>}
        </>
    )
}