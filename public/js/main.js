

async function likePost(){
    const postId = this.parentNode.dataset.id

    try{
        const response = await fetch('/like', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}