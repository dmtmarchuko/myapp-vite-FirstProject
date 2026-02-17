import {Button} from '../ButtonOne'
import { ReactJs } from './SectionTab/ReactJs'
import { useState } from 'react'
import React from 'react'

export function Buttons ({active, onChange}) {
    const [section, setSection] = useState(null)

    return(
            <>
                <section className="line_buttons">
                    <Button isActive={active === section} onClick={() => setSection('Reactjs')}>React js</Button>
                    <Button isActive={active === section} onClick={() => setSection('js')}>Section #2</Button>
                    <Button isActive={active === section} onClick={() => setSection('jsx')}>Section #3</Button>
                    <Button isActive={active === section} onClick={() => setSection('python')}>Section #4</Button>
                    <Button isActive={active === section} onClick={() => setSection('scss')}>Section #5</Button>
                </section>

                {section === null && <p>Hello user</p>}
                {section === 'Reactjs' && <ReactJs/>}
                {section === 'js' && <h1>js</h1>}
                {section === 'jsx' && <h1>jsx</h1>}
                {section === 'scss' && <h1>scss</h1>}
                {section === 'python' && <h1>python</h1>}
            </>
    )
}