const login_container = document.querySelector('#login-container')
const sair = document.querySelector('#sair')
const main_container = document.querySelector('#main-container')
const login_button = document.querySelector('#login-button')
const login_email = document.querySelector('#login-email')
const login_password = document.querySelector('#login-password')
const toggle = document.querySelector('#toggle')
const write_task = document.querySelector('#write-task')
const add_task = document.querySelector('#add-task')
const task_container = document.querySelector('#task-container')

const database = firebase.database()
const dbRefUsers = database.ref('users')








function showLoginScreen() {
    login_container.classList.remove('display-none')
    login_container.classList.add('display-grid')
    main_container.classList.remove('display-grid')
    main_container.classList.add('display-none')
}

function showTodoScreen() {
    login_container.classList.remove('display-grid')
    login_container.classList.add('display-none')
    main_container.classList.remove('display-none')
    main_container.classList.add('display-grid')
}

function showUsertasks() {

    dbRefUsers.child(firebase.auth().currentUser.uid).on('value', (dataSnapShot) => {
        clearTasks()
        dataSnapShot.forEach((item) => {

            let value = item.val()

            let content = `<div class="task">
            <div class="task-item flex bg-white border-radius">
              <div class="task-content-container flex align-center">
                <p id="task-content">${value.name}</p>
              </div>
              <div id="${item.key}" class="task-delete flex justify-center align-center bg-pink">
                <img src="./assets/icons8-lixo-128.svg" alt="">
              </div>
            </div>
          </div>`

            task_container.insertAdjacentHTML("afterbegin", content)
        })

        const task_delete = document.querySelectorAll('.task-delete')
        const btnDelete = [...task_delete]
        btnDelete.forEach((btn)=>{
            btn.addEventListener('click',()=>{
                removeTask(btn.id)
            })
        })

    })
}

function createNewTask(data) {
    dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
    write_task.value = ''
}

function clearTasks() {
    task_container.innerHTML = ''
}

function toggleButton() {
    if (login_button.innerHTML == 'Login') {
        toggle.innerHTML = 'Fazer Login'
        login_button.innerHTML = 'Cadastrar'
    } else {
        toggle.innerHTML = 'Cadastre-se'
        login_button.innerHTML = 'Login'
    }
}

function loginOrsignUp() {
    if (login_button.innerHTML == 'Login') {
        if (login_password.value && login_email.value !== "") {
            firebase.auth().signInWithEmailAndPassword(login_email.value, login_password.value)
        } else {
            console.log('vazio')
        }
    } else {
        if (login_password.value && login_email.value !== "") {
            firebase.auth().createUserWithEmailAndPassword(login_email.value, login_password.value)
        }
    }
}

function removeTask(key){
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove()
}