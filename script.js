// Function to save tasks to local storage
function saveTasks() {
    document.querySelectorAll('.task-card').forEach((card, index) => {
        const name = card.querySelector('.name-input').value;
        const tasks = Array.from(card.querySelectorAll('.task-list li')).map(task => {
            // Extracting task description from list item text
            return task.textContent.split(' - ')[0].trim();
        });
        localStorage.setItem(`card-${index}-name`, name);
        localStorage.setItem(`card-${index}-tasks`, JSON.stringify(tasks));
    });
}

// Function to load tasks from local storage
function loadTasks() {
    document.querySelectorAll('.task-card').forEach((card, index) => {
        const name = localStorage.getItem(`card-${index}-name`);
        const tasks = JSON.parse(localStorage.getItem(`card-${index}-tasks`)) || [];
        if (name) card.querySelector('.name-input').value = name;
        const taskList = card.querySelector('.task-list');
        taskList.innerHTML = ''; // Clear existing tasks to prevent duplicates
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = `${task} - ${name}`;
            listItem.innerHTML += '<button class="remove-btn">Remove</button>';
            taskList.appendChild(listItem);

            // Add event listener for the remove button in each loaded task
            listItem.querySelector('.remove-btn').addEventListener('click', function() {
                taskList.removeChild(listItem);
                saveTasks(); // Update local storage after removal
            });
        });
    });
}

// Initialize
loadTasks();

// Event listener for form submissions
document.querySelectorAll('.task-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const card = this.closest('.task-card');
        const description = card.querySelector('.task-input').value.trim();
        const name = card.querySelector('.name-input').value.trim();

        if (description === '' || name === '') {
            alert('Please enter a valid name and task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = `${description} - ${name}`;
        listItem.innerHTML += '<button class="remove-btn">Remove</button>';

        // Add event listener for the remove button in newly added task
        listItem.querySelector('.remove-btn').addEventListener('click', function() {
            card.querySelector('.task-list').removeChild(listItem);
            saveTasks(); // Update local storage after removal
        });

        card.querySelector('.task-list').appendChild(listItem);
        saveTasks(); // Update local storage after adding a new task

        this.querySelector('.task-input').value = '';
    });
});
