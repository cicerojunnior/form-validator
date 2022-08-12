let validator = {
    handleSubmit:(event) => {
        event.preventDefault()
        let send = true
        let inputs = form.querySelectorAll('input')

        validator.clearErrors()

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i]
            let check = validator.checkInput(input)
            if(check !== true) {
                send = false
                validator.showError(input, check)
            }
        }
        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')

        if(rules !== null) {
            rules = rules.split('|')
            for(let k in rules) {
                let rDatails = rules[k].split('=')
                switch(rDatails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.'
                        }
                    break
                    case 'min':
                        if(input.value.length < rDatails[1]) {
                            return 'Campo tem que ter pelo menos '+rDatails[1]+' caracteres'
                        }
                    break
                    case 'email':
                        if(input.value != '') {
                            let regex = /[\w\-.]+@[\w\-]+\.\w+\.?\w*/

                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Formato de e-mail inválido'
                            }
                        }
                }
            }
        }
        return true
    }, 
    showError: (input, error) => {
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.elementSibling)
    }, 
    clearErrors: () => {
        let inputs = form.querySelectorAll('input')
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = ''
        }

        let errorElement = document.querySelectorAll('.error')
        for(let i=0;i<errorElement.length;i++) {
            errorElement[i].remove()
        }
    }
}

let form = document.querySelector('.validator')
form.addEventListener('submit', validator.handleSubmit)