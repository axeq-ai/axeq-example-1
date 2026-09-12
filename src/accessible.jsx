import React, { useId, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './accessible.css';

const initialTasks = [
  { id: 1, title: 'Review homepage prototype', project: 'Website redesign', complete: false },
  { id: 2, title: 'Confirm welcome email copy', project: 'Mobile onboarding', complete: false },
];

function AccessibleApp() {
  const taskId = useId();
  const emailId = useId();
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const visibleTasks = filter === 'all' ? tasks : tasks.filter((task) => filter === 'complete' ? task.complete : !task.complete);
  function addTask(event) {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title) { setMessage('Enter a task name before adding it.'); return; }
    setTasks((current) => [{ id: Date.now(), title, project: 'General', complete: false }, ...current]);
    setTaskTitle('');
    setMessage(`Added task: ${title}.`);
  }
  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, complete: !task.complete } : task));
    const task = tasks.find((item) => item.id === id);
    setMessage(`${task.title} marked ${task.complete ? 'incomplete' : 'complete'}.`);
  }
  function sendInvite(event) { event.preventDefault(); setShowInvite(false); setMessage('Invitation sent.'); }

  return <div className="reference-app">
    <a className="skip-link" href="#reference-main">Skip to main content</a>
    <header className="reference-header"><a className="reference-brand" href="/accessible.html" aria-label="Northstar accessible reference home">Northstar <span>accessible reference</span></a><nav aria-label="Primary"><a href="#tasks">Tasks</a><a href="#team">Team</a><a href="#about">About</a></nav></header>
    <main id="reference-main" tabIndex="-1"><section className="reference-intro" aria-labelledby="reference-title"><div><p className="eyebrow">A clean control sample</p><h1 id="reference-title">A calm place to finish the work.</h1><p>Use this complete, accessible version as your checker’s expected pass case.</p><button type="button" onClick={() => setShowInvite(true)}>Invite a teammate</button></div><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" alt="A person working at a laptop by a bright window" /></section>
      <p className="status-message" role="status" aria-live="polite">{message}</p>
      <section className="reference-summary" aria-label="Task summary"><div><strong>{tasks.filter((task) => !task.complete).length}</strong><span>Open tasks</span></div><div><strong>{tasks.filter((task) => task.complete).length}</strong><span>Completed tasks</span></div><div><strong>3</strong><span>Active projects</span></div></section>
      <section className="reference-tasks" id="tasks" aria-labelledby="tasks-heading"><div className="section-title"><div><h2 id="tasks-heading">Tasks</h2><p>Capture tasks, then mark them complete as you go.</p></div><label>Show <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All tasks</option><option value="open">Open tasks</option><option value="complete">Completed tasks</option></select></label></div>
        <form className="task-form" onSubmit={addTask}><label htmlFor={taskId}>New task</label><div><input id={taskId} value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="For example, share the final prototype" /><button>Add task</button></div></form>
        <ul className="reference-task-list">{visibleTasks.length ? visibleTasks.map((task) => <li key={task.id}><label><input type="checkbox" checked={task.complete} onChange={() => toggleTask(task.id)} /><span><strong>{task.title}</strong><small>{task.project}</small></span></label></li>) : <li className="empty">No tasks match this filter.</li>}</ul>
      </section>
      <section id="team" className="reference-team" aria-labelledby="team-heading"><h2 id="team-heading">Team</h2><ul><li><span aria-hidden="true">MC</span><div><strong>Maya Chen</strong><small>Design lead</small></div></li><li><span aria-hidden="true">AB</span><div><strong>Andre Brooks</strong><small>Product manager</small></div></li></ul></section>
      <section id="about" className="reference-about" aria-labelledby="about-heading"><h2 id="about-heading">About this reference</h2><p>This page has useful labels, a logical heading order, native controls, descriptive alternatives, visible focus styling, and live feedback for completed actions.</p></section>
    </main>
    {showInvite && <div className="reference-backdrop" role="presentation"><section className="reference-dialog" role="dialog" aria-modal="true" aria-labelledby="invite-heading"><button className="close-button" type="button" aria-label="Close invitation dialog" onClick={() => setShowInvite(false)}>×</button><h2 id="invite-heading">Invite a teammate</h2><p>They will receive an email with a link to join the workspace.</p><form onSubmit={sendInvite}><label htmlFor={emailId}>Email address</label><input id={emailId} type="email" required autoFocus /><div className="dialog-actions"><button type="button" className="secondary" onClick={() => setShowInvite(false)}>Cancel</button><button>Send invitation</button></div></form></section></div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<AccessibleApp />);
