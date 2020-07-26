export class ApiError{
    constructor(error) {
        this.error = error
    }
}

export async function apiFetch(endpoint, options) {
    const response = await fetch('http://192.168.0.13:1234' + endpoint, {
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
        throw new ApiError(responseData)
    }
}