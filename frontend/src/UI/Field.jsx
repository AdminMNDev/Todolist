import React from 'react'

export function Field({ children, type, name}) {
    return <div className='form-group '>
        <label>{children}</label>
        <input type={type} name={name} className='form-control'/>
    </div>   
}