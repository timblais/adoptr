const likeButton = document.querySelectorAll('.likeButton')

const notLiked = document.querySelectorAll('.notLiked')
const alreadyLiked = document.querySelectorAll('.liked')

Array.from(notLiked).forEach((el) => {
    el.innerText = 'Like'
})

Array.from(alreadyLiked).forEach((el) => {
    el.innerText = 'Liked!'
})

Array.from(likeButton).forEach((el) => {
    el.addEventListener('click', likePost)
})

async function likePost(){
    const postId = this.parentNode.dataset.id

    try{
        const response = await fetch('../like', {
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