import { useEffect, useState, useCallback, useRef } from "react"
import { ReactjsButtonDeleteTopic } from './ReactjsButtonDeleteTopic'
import tasksAPI from "../../api/taskAPI"
import RouterLink from "../../api/RouterLink"
import { highlightCaseInsensitive } from "../../api/hightlight"
import React from 'react'

export const ReactJs = () => {
    const [topic, setTopic] = useState(null)
    const [addTopic, setAddTopic] = useState({id:'', title:''})
    const [server, setServer] = useState([])
    const [search, setSearch] = useState('')
    const [error, setErorr] = useState('')
    const [open, setOpen] = useState(false)
    const [appearing, setAppearing] = useState(null)

    const animationRef = useRef({})

    const onSubmitAddTopic = (event) => {
        const IsAddTopic = addTopic.id.length > 0 && addTopic.title.length > 0
        event.preventDefault()
        console.log(addTopic)

        if(IsAddTopic){
            tasksAPI.add(addTopic)
            setAppearing(addTopic.id)
            setTimeout(() => {
                setAppearing(null)
            },400)
        }
        else{setErorr('data error')}

        event.target.children[0].value = ''
        event.target.children[1].value = ''
        setAddTopic({id:'', title:''})
    }

    const onInputId = (event) => {
        const {value} = event.target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0 

        {hasOnlySpaces ? setErorr('You have to fill out id for new Topic') : setErorr('')}
        setAddTopic({...addTopic, id: value.trim()})
    }

    const onInputTitle = useCallback((event) => {
        const {value} = event.target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0 

        setErorr(hasOnlySpaces ? 'You have to fill out title for new Topic': '')
        setAddTopic({...addTopic, title: value.trim()})
    },[addTopic])

    const handelCLick = () => {
        animationRef.current[topic]?.classList.add('isDisappering')

        setTimeout(() => {
            deleteTopic()
        }, 400)
    }

    const deleteTopic = () => {
        tasksAPI.delete(topic).then((response) => {if (!response.ok){if(response.status === 404){console.log('404 error')}
                throw new Error (`HTTP error: ${response.status}`);}})

                setAddTopic({id:'', title:''})
                setTopic('')
    }

    const deleteAll = () => {
        const YouSure =  window.confirm(`You sure that you want to delete All Topics`)

        if(YouSure){
            tasksAPI.deleteAll(server)
            setTimeout(() => {
                setTopic('')
                setAddTopic({id:'', title:''})
            }, 200);
        }
    }

    const onChangeSearch = (event) => {
        const {value} = event.target
        setSearch(value)

        setAddTopic({id:'', title:''})
        setTopic('')
    }

    const item = server.find(el => el.id === topic)
    const AllTopics = server.map((el) => ({name:el.id, id:crypto.randomUUID()}))
    const FiltredTopics = AllTopics.filter(({name}) => name.trim().toLowerCase().includes(search.trim().toLowerCase()))

    
    const OptionsLiList = FiltredTopics.map((el) => 
        <li className={`LiOption_element ${appearing === el.name ? 'isAppearing' : ''}`} 
                ref={item => (animationRef.current[el.name] = item)} 
                onClick={() => setTopic(el.name)} key={el.id} >
            <RouterLink to={`Topic/${el.name}`}>
                <span dangerouslySetInnerHTML={
                    {__html:highlightCaseInsensitive(el.name, search)}
                    }>
                </span>
            </RouterLink>
        </li>)

    useEffect(() => {
        tasksAPI.getAll().then(setServer)
    },[addTopic])

    const TestOk = () => {
        const ListTest = []
        for(let i = 0; i < 8; i++){
            ListTest.push({id:`test${i}`, title:`test${i}`})
        }

        console.log(ListTest)

        ListTest.map((el) => tasksAPI.add(el))

        setTopic('')
        setAddTopic({id:'', title:''})
    }

    return (
        <>
            <h2>This section is intended for taking notes on topics on ReactJs and making notes on them.</h2>
            <div className="div_forms">
                <form name="formOfTopics" className="form_section" onSubmit={(event) => event.preventDefault()}>
                    <input id="1" className="input_class" placeholder="Search..." type="search" 
                        onChange={onChangeSearch}/>
                    <ul className="ul_class">
                        <li className="LiOption_element" onClick={() => setOpen((value) => !value)}>
                            Choose the topic...
                        </li>
                        {open && OptionsLiList}
                    </ul>
                    <ReactjsButtonDeleteTopic topic={topic} handelCLick={handelCLick}/>
                    <button className="button_element" onClick={deleteAll}>Delete All</button>
                    {item ? <div className="Span_Section" dangerouslySetInnerHTML={{__html: item.title}}></div> : <p>Topic is not defined...</p>}
                </form>

                <form name="formOfAddTopics" className="form_section" onSubmit={onSubmitAddTopic}>
                    <input id="3" className="input_class" type="text" placeholder="Add id..." onInput={onInputId}/>
                    <textarea id="4" className="input_class textarea_section" type="text" placeholder="Add title..." onInput={onInputTitle}/>
                    {error? <span className="error_addTopic">{error}</span>: ''}
                    <button className="button_element" type="submit">Add new Topic</button>
                </form>
            </div>
            <button onClick={TestOk}>Test__Ok</button>
        </>
    )
}