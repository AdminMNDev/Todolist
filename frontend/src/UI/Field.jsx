import React, { useEffect } from 'react'
import { createRef } from 'react'

export function Field({ children, type, name, focus = null, value = undefined, onChange = undefined, autoComplete}) {
    const inputElement = createRef()
    useEffect(() => {
        if (focus) {
            inputElement.current.focus()
        }
    }, [])
    return <div className='form-group '>
        <label>{children}</label>
        <input type={type} name={name} className='form-control' ref={inputElement} value={value} onChange={onChange} autoComplete={autoComplete}/>
    </div>   
}