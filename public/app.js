// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const todoInput = document.getElementById('todo-input');
const imageInput = document.getElementById('image-input');
const imageBtn = document.getElementById('image-btn');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let selectedFile = null;

// Fetch and render todos on load
document.addEventListener('DOMContentLoaded', fetchTodos);

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

imageBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        imageBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        imageBtn.style.background = '';
    }
});

async function fetchTodos() {
    try {
        const { data, error } = await supabaseClient
            .from('todos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        todoList.innerHTML = '';
        data.forEach(todo => renderTodo(todo));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    try {
        let imageUrl = null;

        // Upload image if selected
        if (selectedFile) {
            const fileName = `${Date.now()}-${selectedFile.name}`;
            const { data: uploadData, error: uploadError } = await supabaseClient
                .storage
                .from('images')
                .upload(fileName, selectedFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
            } else {
                // Get public URL
                const { data: { publicUrl } } = supabaseClient
                    .storage
                    .from('images')
                    .getPublicUrl(fileName);
                imageUrl = publicUrl;
            }
        }

        // Insert todo
        const { data, error } = await supabaseClient
            .from('todos')
            .insert([{ text, image_url: imageUrl }])
            .select();

        if (error) throw error;

        renderTodo(data[0]);
        todoInput.value = '';
        selectedFile = null;
        imageInput.value = '';
        imageBtn.style.background = '';
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

function renderTodo(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add('completed');
    }

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(textSpan);

    // Add image if present
    if (todo.image_url) {
        const img = document.createElement('img');
        img.src = todo.image_url;
        img.className = 'task-image';
        taskContent.appendChild(img);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);

    // Toggle completion
    taskContent.addEventListener('click', () => toggleTodo(todo.id, !li.classList.contains('completed'), li));

    // Delete task
    deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await deleteTodo(todo.id, todo.image_url, li);
    });

    // Prepend to list (newest first)
    todoList.insertBefore(li, todoList.firstChild);
}

async function toggleTodo(id, completed, li) {
    try {
        const { error } = await supabaseClient
            .from('todos')
            .update({ completed })
            .eq('id', id);

        if (error) throw error;

        li.classList.toggle('completed');
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

async function deleteTodo(id, imageUrl, li) {
    try {
        // Delete image from storage if present
        if (imageUrl) {
            const fileName = imageUrl.split('/').pop();
            await supabaseClient.storage.from('images').remove([fileName]);
        }

        // Delete todo
        const { error } = await supabaseClient
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        li.classList.add('slide-out');
        li.addEventListener('animationend', () => {
            li.remove();
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}
