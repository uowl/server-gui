import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, ListTodo } from 'lucide-react';

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('gui-todos');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('gui-todos', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };

        setTasks([newTask, ...tasks]);
        setInputValue('');
    };

    const toggleTodo = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    return (
        <div className="glass-card" style={{ width: '100%', maxWidth: '500px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <ListTodo color="var(--primary)" size={32} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text)' }}>Tasks</h2>
            </div>

            <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                    style={{
                        flex: 1,
                        background: 'var(--glass)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: 'var(--primary)',
                        color: 'var(--on-primary)',
                        border: 'none',
                        borderRadius: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Plus size={24} />
                </button>
            </form>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                {tasks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        No tasks yet. Start being productive!
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: task.completed ? 'var(--background)' : 'var(--glass)',
                                borderRadius: '12px',
                                marginBottom: '10px',
                                transition: 'all 0.3s ease',
                                borderLeft: task.completed ? '4px solid var(--text-muted)' : '4px solid var(--primary)'
                            }}
                        >
                            <div
                                onClick={() => toggleTodo(task.id)}
                                style={{ cursor: 'pointer', color: task.completed ? 'var(--text-muted)' : 'var(--primary)' }}
                            >
                                {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                            </div>
                            <span style={{
                                flex: 1,
                                color: task.completed ? 'var(--text-muted)' : 'var(--text)',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                transition: 'all 0.3s'
                            }}>
                                {task.text}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {tasks.some(t => t.completed) && (
                <button
                    onClick={clearCompleted}
                    style={{
                        marginTop: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        alignSelf: 'flex-end',
                        fontWeight: '500'
                    }}
                >
                    Clear completed
                </button>
            )}
        </div>
    );
};

export default Todo;
