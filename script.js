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
