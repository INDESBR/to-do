firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const usuario = document.querySelector('#user')
        usuario.innerHTML = user.email
        showTodoScreen()
        clearTasks()
        showUsertasks()
    } else {
        showLoginScreen()
    }
})

toggle.addEventListener('click', () => {
   toggleButton()
})

login_button.addEventListener('click', () => {
    loginOrsignUp()
})

sair.addEventListener('click', () => {
    firebase.auth().signOut()
})

