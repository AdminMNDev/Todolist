import React from 'react'

export function Button({ children, type = 'primary', htmlType = null, onClick = null }) {
    return <button className={`btn btn-${type}`} type={htmlType} onClick={onClick}>{children}</button>
}