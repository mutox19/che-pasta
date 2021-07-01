export const fetchWrapper = {
    get,
    post,
    put,
    delete:_delete
};

function get(url) {
    const requestOptions = {
        method:'GET'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url) {
    const requestOptions = {
        method:'DELETE'
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }

        return data;
    })
}