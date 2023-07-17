export const APIMethods = {
    PUT: "PUT",
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PATCH: "PATCH"
}

export const makeFetchWithAuthToken = async(url,method,data= null) => {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.sessionStorage.getItem("access_token")}`
        },
        body: data && JSON.stringify(data),
        method: method
    })
    return res.json();
}


export const makeFetchWithoutAuth = async (url,method,data=null) => {
    await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        body:data && JSON.stringify(data),
        method: method
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        return { error: error }
    })

}