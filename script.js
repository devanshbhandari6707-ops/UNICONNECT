// Initial Mock Data
let opportunities = JSON.parse(localStorage.getItem('opps')) || [
    { title: "Frontend Development", type: "Internship" },
    { title: "Cloud Computing", type: "Certification" }
];

const students = [
    { name: "Alice Johnson", course: "Computer Science", progress: "85%" },
    { name: "Bob Smith", course: "Data Science", progress: "40%" }
];

function showDashboard(role) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');

    if (role === 'student') {
        document.getElementById('student-dashboard').classList.remove('hidden');
        renderOpportunities();
    } else {
        document.getElementById('uni-dashboard').classList.remove('hidden');
        renderStudentTable();
    }
}

function renderOpportunities() {
    const list = document.getElementById('opportunity-list');
    list.innerHTML = opportunities.map(opp => `
        <div class="opp-card">
            <h4>${opp.title}</h4>
            <p style="color: var(--secondary)">${opp.type}</p>
            <button class="btn-primary" style="font-size: 0.8rem">Apply</button>
        </div>
    `).join('');
}

function addOpportunity() {
    const title = document.getElementById('opp-title').value;
    const type = document.getElementById('opp-type').value;

    if (title) {
        opportunities.push({ title, type });
        localStorage.setItem('opps', JSON.stringify(opportunities));
        alert("Posted successfully!");
        document.getElementById('opp-title').value = '';
    }
}

function renderStudentTable() {
    const tbody = document.getElementById('student-body');
    tbody.innerHTML = students.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td><strong>${s.progress}</strong></td>
        </tr>
    `).join('');
}

function logout() {
    location.reload(); // Simple way to reset state
}
// Load data from LocalStorage or use defaults
let opportunities = JSON.parse(localStorage.getItem('opps')) || [
    { id: 1, title: "Frontend Development", type: "Internship" },
    { id: 2, title: "Cloud Computing", type: "Certification" },
    { id: 3, title: "UI/UX Design", type: "Internship" }
];

let appliedIds = JSON.parse(localStorage.getItem('applied')) || [];

function renderOpportunities() {
    const availableList = document.getElementById('opportunity-list');
    const appliedList = document.getElementById('applied-list');
    
    // Filter opportunities into two groups
    const availableItems = opportunities.filter(opp => !appliedIds.includes(opp.id));
    const appliedItems = opportunities.filter(opp => appliedIds.includes(opp.id));

    // Render Available
    availableList.innerHTML = availableItems.map(opp => `
        <div class="opp-card">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: var(--secondary)">${opp.type}</small>
            </div>
            <button class="btn-primary" onclick="applyFor(${opp.id})">Apply</button>
        </div>
    `).join('') || '<p>No new opportunities available.</p>';

    // Render Applied
    appliedList.innerHTML = appliedItems.map(opp => `
        <div class="opp-card" style="border-left-color: #10b981">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: var(--secondary)">${opp.type}</small>
            </div>
            <span class="applied-badge">Pending Review</span>
        </div>
    `).join('') || '<p>You haven\'t applied to anything yet.</p>';
}

function applyFor(id) {
    if (!appliedIds.includes(id)) {
        appliedIds.push(id);
        localStorage.setItem('applied', JSON.stringify(appliedIds));
        renderOpportunities(); // Refresh the lists
    }
}

// Ensure showDashboard calls the render function
function showDashboard(role) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');

    if (role === 'student') {
        document.getElementById('student-dashboard').classList.remove('hidden');
        renderOpportunities();
    } else {
        document.getElementById('uni-dashboard').classList.remove('hidden');
        renderStudentTable();
    }
}
