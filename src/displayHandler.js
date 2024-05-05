// import { parseISO, format } from 'date-fns';
const newModal = document.getElementById('taskModal');
const editModal = document.getElementById('editModal');
const detailModal = document.getElementById('detailModal');
const content = document.getElementById('content');
const title = document.querySelectorAll('.title');
const details = document.querySelectorAll('.details');
const date = document.querySelectorAll('.date');
const radioButtons = document.querySelectorAll("input[name='priority']");

export const fetchTasks = () => {
    const activeProject = document.querySelector('.activeProject');         //fetchTasks used to take as a parameter the projectId of the selected project button and, comparing
    let selectedProjectId = undefined;                                      //it to the parsedTask.project, silter the right tasks when the function is called. 
    if (activeProject !== null) {
        selectedProjectId = activeProject.id;
    }
    content.textContent = '';
    const sortingArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        const currentKey = localStorage.key(i);
        const value = localStorage.getItem(currentKey);
        const parsedTask = JSON.parse(value);
        if (currentKey === 'firstSetup') {
            sortingArray.push({key: 'firstSetup', deadline: '1999-01-01'});
        } else if (selectedProjectId === undefined){
            sortingArray.push(Object.assign(parsedTask, {key: currentKey}));
        } else if (parsedTask.project === selectedProjectId){
            sortingArray.push(Object.assign(parsedTask, {key: currentKey}));
        }
    }
    sortingArray.sort(function(a, b) {
        let dateA = new Date(a.deadline);
        let dateB = new Date(b.deadline);
        return (dateA - dateB);
    }); 
    displayTasks(sortingArray);
    console.log(sortingArray);

}

const displayTasks = (sortingArray) => {
    sortingArray.forEach(object => {
        if (object.key !== 'firstSetup' && object.key !== 'projectArray') {
                const container = document.createElement('div');
                container.classList.add('task', `${object.priority}`);
                container.setAttribute('id', object.key);
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.classList.add('completion');
                if (object.completion === true) {
                    checkbox.checked = true;
                }
                const title = document.createElement('p');
                title.textContent = object.title;
                const details = document.createElement('button');
                details.classList.add('taskDetails');
                details.textContent = 'Details';
                const date = document.createElement('p');
                date.textContent = object.deadline;
                const edit = document.createElement('button');
                edit.classList.add('edit');
                edit.textContent = 'Edit';
                const erase = document.createElement('button');
                erase.classList.add('erase');
                erase.textContent = 'Erase';
                container.append(checkbox, title, details, date, edit, erase);
                content.append(container);
        }
    });
}

export const resetDisplay = () => {
    localStorage.clear();
}

export const openTaskModal = () => {
    newModal.showModal();
    newModal.classList.add('active');
    openTaskForm();

}

export const openTaskForm = () => {
    const taskForm = document.getElementById('newTaskForm');
    const projectForm = document.getElementById('newProjectForm');
    const taskButton = document.getElementById('taskButton');
    const projectButton = document.getElementById('projectButton');
    projectButton.classList.remove('selected');
    taskButton.classList.add('selected');
    projectForm.style.display = 'none';
    taskForm.style.display = 'block';
    console.log('task form selected');
}

export const openProjectForm = () => {
    const taskForm = document.getElementById('newTaskForm');
    const projectForm = document.getElementById('newProjectForm');
    const taskButton = document.getElementById('taskButton');
    const projectButton = document.getElementById('projectButton');
    taskButton.classList.remove('selected');
    projectButton.classList.add('selected');
    taskForm.style.display = 'none';
    projectForm.style.display = 'block';
    console.log('project form selected');
}

export const openEditModal = (editKey) => {
    const editTitle = document.getElementById('editTitle');
    const editDetails = document.getElementById('editDetails');
    const editDate = document.getElementById('editDate');
    const taskToEdit = JSON.parse(localStorage.getItem(editKey));
    const oldPriority = document.getElementById(`${taskToEdit.priority}Edit`);
    editModal.showModal();
    editTitle.value = taskToEdit.title;
    editDetails.value = taskToEdit.details;
    editDate.value = taskToEdit.deadline;
    oldPriority.checked = true;
}

export const viewDetails = (key) => {
    const detailModal = document.getElementById('detailModal');
    const viewTitle = document.getElementById('viewTitle');
    const viewDetails = document.getElementById('viewDetails');
    const viewDeadline = document.getElementById('viewDeadline');
    const viewPriority = document.getElementById('viewPriority');
    detailModal.showModal();
    const parsedTask = JSON.parse(localStorage.getItem(key));
    viewTitle.textContent = parsedTask.title;
    viewDetails.textContent = parsedTask.details;
    viewDeadline.textContent = `Deadline:  ${parsedTask.deadline}`;
    viewPriority.textContent = `Priority:  ${parsedTask.priority}`;
}

export const closeModal = () => {
    title.forEach(title => {
        let style = window.getComputedStyle(title);
        if (style.display !== 'none') {
            title.value = '';
        }
    });
    details.forEach(details => {
        let style = window.getComputedStyle(details);
        if (style.display !== 'none') {
            details.value = '';
        }
        
    });
    date.forEach(date => {
        let style = window.getComputedStyle(date);
        if (style.display !== 'none') {
            date.value = '';
        }
        
    });
    
    radioButtons.forEach(radio => {
        let style = window.getComputedStyle(radio);
        if (style.display !== 'none') {
            radio.checked = false;
        }
        
    });
    newModal.close();
    editModal.close();
    detailModal.close();
    newModal.classList.remove('active');

}

export const displayProjects = (newProject) => {
    const wrapper = document.getElementById('projectWrapper');
    const projectArray = JSON.parse(localStorage.getItem('projectArray'));
    wrapper.textContent = "";
    projectArray.forEach(project => {
        const projectName = document.createElement('button');
        projectName.setAttribute('id', `${project.name}`);
        projectName.textContent = project.name;
        projectName.classList.add('projectButton');
        if (project.name === newProject) {
            projectName.classList.add('activeProject');
        }
        wrapper.appendChild(projectName);
    });
}