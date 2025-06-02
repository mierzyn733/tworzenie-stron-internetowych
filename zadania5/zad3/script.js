document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Dodawanie zadania
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Usuń';

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        taskInput.focus();

        // Zdarzenia
        checkbox.addEventListener('change', () => {
            taskSpan.classList.toggle('done', checkbox.checked);
        });

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });
    };

    // Dodawanie przez przycisk
    addBtn.addEventListener('click', addTask);

    // Dodawanie przez Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});