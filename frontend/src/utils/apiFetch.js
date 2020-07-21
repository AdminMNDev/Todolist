export class ApiError{
    constructor(error) {
        this.error = error
    }
}

export async function apiFetch(endpoint, options) {
    console.log(options)
    const response = await fetch('http://192.168.0.13:1234' + endpoint, {
        //credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        ...options
    })
    if (response === 204) {
        return null
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData
    } else {
        console.log(responseData);
        throw new ApiError(responseData)
    }
}