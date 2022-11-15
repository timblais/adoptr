// import Cropper from '../cropper.js';

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

// Image preview/cropping:

//Grabs elements for the uploaded image and container
const selectedFile = document.getElementById('imageUpload')
const imageContainer = document.getElementById('imagePreview')
let cropper

// on change(selecting an image to upload), run displayImage()
selectedFile.addEventListener('change', displayImage, false)

function displayImage(){
    const file = this.files[0]; // grabs file
    
    const img = document.createElement('img') 
    img.classList.add('preview')
    img.setAttribute('id', 'cropperPreview')
    img.file = file
    imageContainer.appendChild(img)
    const image = document.getElementById('cropperPreview')


    const reader = new FileReader();
    reader.onload = (e) => { 
        img.src = e.target.result; 
        cropper = new Cropper(image, {
              aspectRatio: 4 / 5,
              crop(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
              },
            });

    };
    reader.readAsDataURL(file);
}


// New create post function with fetch:

const newPostSubmit = document.getElementById('newPostSubmit')

newPostSubmit.addEventListener('click', createPost)

async function createPost(){
    const postTitle = document.getElementById('title').value
    const postCaption = document.getElementById('caption').value
    const postImage = cropper.getCroppedCanvas().toDataURL('image/jpeg')

    try{
        const response = await fetch('/newPost', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postTitle': postTitle,
                'postCaption': postCaption,
                'postImage': postImage,
            })
        })
        const data = await response.json()
        console.log(data)
        window.location.replace('/feed')
    }catch(err){
        console.log(err)
    }
}
