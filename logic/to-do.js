add_task.addEventListener('click', ()=>{
    if(write_task.value !== ''){
        let data = {
            name: write_task.value
        }
        createNewTask(data)
    }
})

