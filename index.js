function cardFunction(data){
    let todoList = document.getElementById('todolist')
    let todocardEl = document.createElement('todocard')
    todocardEl.innerHTML = `
                            <div class="todocardinfo"><b>id:</b> ${data.id}</div>
                            <div class="todocardinfo"><b>userId:</b> ${data.userId}</div>
                            <div class="todocardinfo"><b>title:</b> ${data.title}</div>
                            <div class="todocardinfo"><b>completed:</b> ${data.completed}</div>
                            `
    todocardEl.className = 'todocard'
    todoList.appendChild(todocardEl)
}

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

fetch(apiUrl)
    .then((answer)=>{return answer.json()})
    .then((data)=>{
        const tenTodoEl = document.getElementById('tenTodo')
        const checkboxEl = document.getElementById('checkbox')
        const userIdEl = document.getElementById('userId')
        const idEl = document.getElementById('id')

        tenTodoEl.addEventListener('input', ()=>{
            userIdEl.value = ''
            idEl.value = ''
            checkboxEl.checked = false
            let todoList = document.getElementById('todolist')
            todoList.innerHTML = ''
            /* filtering 10 elements from an array */
            let tenEls = data.filter((currentEl, index)=>{
                return index < tenTodoEl.value*10 && index >= (tenTodoEl.value*10)-10
            })
            tenEls.forEach(element => {
                cardFunction(element)
            });
            /* filtering 10 elements from an array */
        })
        
        /* check if task is completed or not */
        checkboxEl.addEventListener('change', ()=>{
            tenTodoEl.value = ''
            userIdEl.value = ''
            idEl.value = ''
            let todoList = document.getElementById('todolist')
            todoList.innerHTML = ''
            if (checkboxEl.checked) {
                data.forEach((element)=>{
                    if(element.completed){
                        cardFunction(element)
                    }
                })
            }
            else {
                data.forEach((element)=>{
                    if(element.completed == false){
                        cardFunction(element)
                    }
                })
            }
        })

        /* filter by userId */
        userIdEl.addEventListener('input', ()=>{
            tenTodoEl.value = ''
            idEl.value = ''
            checkboxEl.checked = false
            let todoList = document.getElementById('todolist')
            todoList.innerHTML = ''
            data.forEach(element => {
                // cardFunction(element)
                if (element.userId == userIdEl.value) {
                    cardFunction(element)
                }
            });
        })

        /* filter by Id */
        idEl.addEventListener('input', ()=>{
            tenTodoEl.value = ''
            userIdEl.value = ''
            checkboxEl.checked = false
            let todoList = document.getElementById('todolist')
            todoList.innerHTML = ''
            data.forEach(element => {
                // cardFunction(element)
                if (element.id == idEl.value) {
                    cardFunction(element)
                }
            });
        })
})
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
        console.log('It is always works');
    })