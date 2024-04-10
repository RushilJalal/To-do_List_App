import { addTask } from './addTask'

export const screenController = () => {
    document.addEventListener('DOMContentLoaded', () => {
        

        const modal = document.querySelector('dialog'); 
        const addNew = document.getElementById('addNew');
        addNew.addEventListener('click', () => {
            modal.showModal();
            modal.classList.add('active');
            addTask();
            let test = localStorage.getItem('test');
            console.log(test);
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                console.log(`${key}: ${value}`);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                modal.close();
                
            }
        });
    });
}

