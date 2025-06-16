interface GeneratedTool {
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

interface HuggingFaceResponse {
  generated_text: string;
}

class AIService {
  private readonly baseUrl = 'https://api-inference.huggingface.co/models';
  private readonly model = 'microsoft/DialoGPT-medium';
  
  async generateProductivityTool(description: string): Promise<GeneratedTool> {
    try {
      // For now, we'll use a template-based approach with some AI-like randomization
      // This can be enhanced with actual AI API calls when available
      
      const toolTemplates = this.getToolTemplates();
      const selectedTemplate = this.selectBestTemplate(description, toolTemplates);
      
      return this.customizeTemplate(selectedTemplate, description);
    } catch (error) {
      console.error('Error generating tool:', error);
      throw new Error('Failed to generate productivity tool');
    }
  }

  private getToolTemplates(): GeneratedTool[] {
    return [
      {
        name: "Task Manager Pro",
        description: "A comprehensive task management system with drag-and-drop functionality",
        features: ["Drag & Drop Tasks", "Priority Levels", "Due Dates", "Progress Tracking"],
        techStack: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager Pro</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Task Manager Pro</h1>
            <button id="addTaskBtn" class="btn-primary">Add New Task</button>
        </header>
        
        <div class="board">
            <div class="column" data-status="todo">
                <h2>To Do</h2>
                <div class="task-list" id="todoList"></div>
            </div>
            <div class="column" data-status="progress">
                <h2>In Progress</h2>
                <div class="task-list" id="progressList"></div>
            </div>
            <div class="column" data-status="done">
                <h2>Done</h2>
                <div class="task-list" id="doneList"></div>
            </div>
        </div>
    </div>
    
    <div id="taskModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add New Task</h2>
            <form id="taskForm">
                <input type="text" id="taskTitle" placeholder="Task title" required>
                <textarea id="taskDescription" placeholder="Task description"></textarea>
                <select id="taskPriority">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <input type="date" id="taskDueDate">
                <button type="submit" class="btn-primary">Add Task</button>
            </form>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        cssCode: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

.btn-primary {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 30px;
    min-height: 600px;
}

.column {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 2px dashed #e2e8f0;
    transition: all 0.3s ease;
}

.column:hover {
    border-color: #4f46e5;
    background: #f1f5f9;
}

.column h2 {
    color: #334155;
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
}

.task-list {
    min-height: 400px;
}

.task-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: move;
    transition: all 0.3s ease;
    border-left: 4px solid #e2e8f0;
}

.task-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.task-card.priority-high {
    border-left-color: #ef4444;
}

.task-card.priority-medium {
    border-left-color: #f59e0b;
}

.task-card.priority-low {
    border-left-color: #10b981;
}

.task-title {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
}

.task-description {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.task-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #94a3b8;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #000;
}

#taskForm {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

#taskForm input,
#taskForm textarea,
#taskForm select {
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

#taskForm input:focus,
#taskForm textarea:focus,
#taskForm select:focus {
    outline: none;
    border-color: #4f46e5;
}

#taskForm textarea {
    resize: vertical;
    min-height: 80px;
}

@media (max-width: 768px) {
    .board {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    
    header h1 {
        font-size: 2rem;
    }
}`,
        jsCode: `class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.setupDragAndDrop();
    }

    bindEvents() {
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            document.getElementById('taskModal').style.display = 'block';
        });

        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('taskModal').style.display = 'none';
        });

        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('taskModal')) {
                document.getElementById('taskModal').style.display = 'none';
            }
        });
    }

    addTask() {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const task = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            status: 'todo',
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        
        document.getElementById('taskForm').reset();
        document.getElementById('taskModal').style.display = 'none';
    }

    renderTasks() {
        const todoList = document.getElementById('todoList');
        const progressList = document.getElementById('progressList');
        const doneList = document.getElementById('doneList');

        todoList.innerHTML = '';
        progressList.innerHTML = '';
        doneList.innerHTML = '';

        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            
            switch(task.status) {
                case 'todo':
                    todoList.appendChild(taskElement);
                    break;
                case 'progress':
                    progressList.appendChild(taskElement);
                    break;
                case 'done':
                    doneList.appendChild(taskElement);
                    break;
            }
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = \`task-card priority-\${task.priority}\`;
        taskDiv.draggable = true;
        taskDiv.dataset.taskId = task.id;

        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
        
        taskDiv.innerHTML = \`
            <div class="task-title">\${task.title}</div>
            <div class="task-description">\${task.description}</div>
            <div class="task-meta">
                <span class="priority">\${task.priority.toUpperCase()}</span>
                <span class="due-date">\${dueDate}</span>
            </div>
        \`;

        return taskDiv;
    }

    setupDragAndDrop() {
        const columns = document.querySelectorAll('.column');
        
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');
                
                const taskId = e.dataTransfer.getData('text/plain');
                const newStatus = column.dataset.status;
                
                this.updateTaskStatus(parseInt(taskId), newStatus);
            });
        });

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
            }
        });
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});`
      },
      {
        name: "Habit Tracker",
        description: "A beautiful habit tracking application with streak counters and progress visualization",
        features: ["Daily Check-ins", "Streak Tracking", "Progress Charts", "Habit Categories"],
        techStack: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Local Storage"],
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habit Tracker</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎯 Habit Tracker</h1>
            <button id="addHabitBtn" class="btn-primary">Add New Habit</button>
        </header>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Habits</h3>
                <span id="totalHabits">0</span>
            </div>
            <div class="stat-card">
                <h3>Longest Streak</h3>
                <span id="longestStreak">0 days</span>
            </div>
            <div class="stat-card">
                <h3>Completed Today</h3>
                <span id="completedToday">0</span>
            </div>
        </div>
        
        <div class="habits-container">
            <div class="habits-grid" id="habitsGrid"></div>
        </div>
        
        <div class="chart-container">
            <h2>Weekly Progress</h2>
            <canvas id="progressChart"></canvas>
        </div>
    </div>
    
    <div id="habitModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add New Habit</h2>
            <form id="habitForm">
                <input type="text" id="habitName" placeholder="Habit name (e.g., Drink 8 glasses of water)" required>
                <select id="habitCategory">
                    <option value="health">🏃 Health & Fitness</option>
                    <option value="productivity">💼 Productivity</option>
                    <option value="learning">📚 Learning</option>
                    <option value="mindfulness">🧘 Mindfulness</option>
                    <option value="social">👥 Social</option>
                    <option value="creative">🎨 Creative</option>
                </select>
                <input type="color" id="habitColor" value="#4f46e5">
                <button type="submit" class="btn-primary">Create Habit</button>
            </form>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        cssCode: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    font-size: 3rem;
    font-weight: 800;
}

.btn-primary {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
    padding: 15px 30px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 30px;
    background: #f8fafc;
}

.stat-card {
    background: white;
    padding: 25px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-card h3 {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-card span {
    color: #1e293b;
    font-size: 2rem;
    font-weight: 700;
}

.habits-container {
    padding: 30px;
}

.habits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.habit-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    border-left: 5px solid #4f46e5;
}

.habit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.habit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.habit-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
}

.habit-category {
    background: #f1f5f9;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #64748b;
}

.habit-streak {
    text-align: center;
    margin: 20px 0;
}

.streak-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #4f46e5;
    display: block;
}

.streak-label {
    color: #64748b;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.habit-actions {
    display: flex;
    gap: 10px;
}

.check-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.check-btn.completed {
    background: #10b981;
    color: white;
}

.check-btn:not(.completed) {
    background: #f1f5f9;
    color: #64748b;
}

.check-btn:hover {
    transform: translateY(-2px);
}

.chart-container {
    padding: 30px;
    background: #f8fafc;
}

.chart-container h2 {
    color: #1e293b;
    margin-bottom: 20px;
    text-align: center;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 40px;
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #000;
}

#habitForm {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

#habitForm input,
#habitForm select {
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

#habitForm input:focus,
#habitForm select:focus {
    outline: none;
    border-color: #4f46e5;
}

@media (max-width: 768px) {
    header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    
    header h1 {
        font-size: 2.5rem;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .habits-grid {
        grid-template-columns: 1fr;
    }
}`,
        jsCode: `class HabitTracker {
    constructor() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.completions = JSON.parse(localStorage.getItem('completions')) || {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderHabits();
        this.updateStats();
        this.renderChart();
    }

    bindEvents() {
        document.getElementById('addHabitBtn').addEventListener('click', () => {
            document.getElementById('habitModal').style.display = 'block';
        });

        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('habitModal').style.display = 'none';
        });

        document.getElementById('habitForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHabit();
        });

        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('habitModal')) {
                document.getElementById('habitModal').style.display = 'none';
            }
        });
    }

    addHabit() {
        const name = document.getElementById('habitName').value;
        const category = document.getElementById('habitCategory').value;
        const color = document.getElementById('habitColor').value;

        const habit = {
            id: Date.now(),
            name,
            category,
            color,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.habits.push(habit);
        this.saveData();
        this.renderHabits();
        this.updateStats();
        
        document.getElementById('habitForm').reset();
        document.getElementById('habitModal').style.display = 'none';
    }

    renderHabits() {
        const grid = document.getElementById('habitsGrid');
        grid.innerHTML = '';

        this.habits.forEach(habit => {
            const habitElement = this.createHabitElement(habit);
            grid.appendChild(habitElement);
        });
    }

    createHabitElement(habit) {
        const today = new Date().toISOString().split('T')[0];
        const streak = this.calculateStreak(habit.id);
        const isCompletedToday = this.isCompletedToday(habit.id);
        
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-card';
        habitDiv.style.borderLeftColor = habit.color;

        const categoryEmojis = {
            health: '🏃',
            productivity: '💼',
            learning: '📚',
            mindfulness: '🧘',
            social: '👥',
            creative: '🎨'
        };

        habitDiv.innerHTML = \`
            <div class="habit-header">
                <div class="habit-name">\${habit.name}</div>
                <div class="habit-category">\${categoryEmojis[habit.category]} \${habit.category}</div>
            </div>
            <div class="habit-streak">
                <span class="streak-number">\${streak}</span>
                <span class="streak-label">Day Streak</span>
            </div>
            <div class="habit-actions">
                <button class="check-btn \${isCompletedToday ? 'completed' : ''}" 
                        onclick="habitTracker.toggleCompletion(\${habit.id})">
                    \${isCompletedToday ? '✅ Completed' : '⭕ Mark Complete'}
                </button>
            </div>
        \`;

        return habitDiv;
    }

    toggleCompletion(habitId) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.completions[habitId]) {
            this.completions[habitId] = [];
        }

        const completionIndex = this.completions[habitId].indexOf(today);
        
        if (completionIndex > -1) {
            this.completions[habitId].splice(completionIndex, 1);
        } else {
            this.completions[habitId].push(today);
        }

        this.saveData();
        this.renderHabits();
        this.updateStats();
        this.renderChart();
    }

    isCompletedToday(habitId) {
        const today = new Date().toISOString().split('T')[0];
        return this.completions[habitId] && this.completions[habitId].includes(today);
    }

    calculateStreak(habitId) {
        if (!this.completions[habitId]) return 0;

        const completions = this.completions[habitId].sort().reverse();
        let streak = 0;
        let currentDate = new Date();

        for (let i = 0; i < completions.length; i++) {
            const completionDate = new Date(completions[i]);
            const daysDiff = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === streak) {
                streak++;
                currentDate = completionDate;
            } else {
                break;
            }
        }

        return streak;
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const longestStreak = Math.max(...this.habits.map(h => this.calculateStreak(h.id)), 0);
        const completedToday = this.habits.filter(h => this.isCompletedToday(h.id)).length;

        document.getElementById('totalHabits').textContent = totalHabits;
        document.getElementById('longestStreak').textContent = \`\${longestStreak} days\`;
        document.getElementById('completedToday').textContent = completedToday;
    }

    renderChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        // Get last 7 days
        const last7Days = [];
        const completionData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            const completedCount = this.habits.filter(habit => 
                this.completions[habit.id] && this.completions[habit.id].includes(dateStr)
            ).length;
            
            completionData.push(completedCount);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Habits Completed',
                    data: completionData,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    saveData() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
        localStorage.setItem('completions', JSON.stringify(this.completions));
    }
}

// Initialize the app
let habitTracker;
document.addEventListener('DOMContentLoaded', () => {
    habitTracker = new HabitTracker();
});`
      }
    ];
  }

  private selectBestTemplate(description: string, templates: GeneratedTool[]): GeneratedTool {
    const keywords = description.toLowerCase();
    
    if (keywords.includes('task') || keywords.includes('todo') || keywords.includes('project')) {
      return templates[0]; // Task Manager
    } else if (keywords.includes('habit') || keywords.includes('routine') || keywords.includes('daily')) {
      return templates[1]; // Habit Tracker
    }
    
    // Default to task manager
    return templates[0];
  }

  private customizeTemplate(template: GeneratedTool, description: string): GeneratedTool {
    // Simple customization based on description
    const customized = { ...template };
    
    // Extract potential app name from description
    const words = description.split(' ');
    if (words.length > 0) {
      const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      customized.name = `${firstWord} ${template.name}`;
    }
    
    // Add description-specific features
    if (description.includes('team') || description.includes('collaboration')) {
      customized.features.push('Team Collaboration');
    }
    if (description.includes('notification') || description.includes('reminder')) {
      customized.features.push('Smart Notifications');
    }
    if (description.includes('analytics') || description.includes('report')) {
      customized.features.push('Analytics Dashboard');
    }
    
    return customized;
  }

  async deployToNetlify(tool: GeneratedTool): Promise<string> {
    // This would integrate with Netlify's API to deploy the generated code
    // For now, we'll simulate the deployment process
    
    const deploymentId = Math.random().toString(36).substring(2, 15);
    const siteName = tool.name.toLowerCase().replace(/\s+/g, '-');
    
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return `https://${siteName}-${deploymentId}.netlify.app`;
  }
}

export const aiService = new AIService();