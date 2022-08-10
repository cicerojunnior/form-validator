let validator = {
    handleSubmit:(event)=>{
        event.preventDefaut()
    }
}

let form = document.querySelector('.validator')
form.addEventListener('submit', validator.handleSubmit)