// --- DATABASE INITIALIZATION ---
let opportunities = JSON.parse(localStorage.getItem('uni_opps')) || [
    { id: 1001, title: "Software Engineering Intern", type: "Internship" },
    { id: 1002, title: "Full Stack Certification", type: "Certification" }
];

let appliedIds = JSON.parse(localStorage.getItem('uni_applied')) || [];

// --- NAVIGATION ---
function showDashboard(role) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');

    if (role === 'student') {
        document.getElementById('student-dashboard').classList.remove('hidden');
        document.getElementById('uni-dashboard').classList.add('hidden');
        renderStudentView();
    } else {
        document.getElementById('uni-dashboard').classList.remove('hidden');
        document.getElementById('student-dashboard').classList.add('hidden');
        renderUniversityView();
    }
}

// --- STUDENT VIEW LOGIC ---
function renderStudentView() {
    const availableList = document.getElementById('opportunity-list');
    const appliedList = document.getElementById('applied-list');

    // Filter logic
    const availableItems = opportunities.filter(opp => !appliedIds.includes(opp.id));
    const appliedItems = opportunities.filter(opp => appliedIds.includes(opp.id));

    // Update Progress Bar (Example: 20% per application up to 100)
    const progress = Math.min(appliedIds.length * 20, 100);
    document.getElementById('progress-val').innerText = progress + "%";

    availableList.innerHTML = availableItems.map(opp => `
        <div class="opp-card">
            <div><strong>${opp.title}</strong><br><small>${opp.type}</small></div>
            <button class="btn-primary" onclick="applyFor(${opp.id})">Apply</button>
        </div>
    `).join('') || '<p class="empty">All caught up!</p>';

    appliedList.innerHTML = appliedItems.map(opp => `
        <div class="opp-card applied">
            <div><strong>${opp.title}</strong><br><small>${opp.type}</small></div>
            <span class="status-tag">Enrolled</span>
        </div>
    `).join('') || '<p class="empty">No applications yet.</p>';
}

function applyFor(id) {
    // Convert to number to ensure strict matching
    const targetId = Number(id);
    if (!appliedIds.includes(targetId)) {
        appliedIds.push(targetId);
        localStorage.setItem('uni_applied', JSON.stringify(appliedIds));
        renderStudentView();
    }
}

// --- UNIVERSITY VIEW LOGIC ---
function addOpportunity() {
    const titleInput = document.getElementById('opp-title');
    const typeInput = document.getElementById('opp-type');

    if (!titleInput.value.trim()) {
        alert("Please enter a title for the opportunity.");
        return;
    }

    const newOpp = {
        id: Date.now(), // Unique numeric ID
        title: titleInput.value,
        type: typeInput.value
    };

    opportunities.push(newOpp);
    localStorage.setItem('uni_opps', JSON.stringify(opportunities));
    
    // Clear inputs and refresh
    titleInput.value = "";
    renderUniversityView();
    alert("Opportunity posted to UniConnect!");
}

function renderUniversityView() {
    const manageList = document.getElementById('uni-manage-list');
    manageList.innerHTML = opportunities.map(opp => `
        <div class="opp-card">
            <div><strong>${opp.title}</strong> (${opp.type})</div>
            <button class="btn-delete" onclick="deleteOpp(${opp.id})">Remove</button>
        </div>
    `).join('') || '<p class="empty">No active postings.</p>';
}

function deleteOpp(id) {
    opportunities = opportunities.filter(opp => opp.id !== Number(id));
    appliedIds = appliedIds.filter(aid => aid !== Number(id));
    localStorage.setItem('uni_opps', JSON.stringify(opportunities));
    localStorage.setItem('uni_applied', JSON.stringify(appliedIds));
    renderUniversityView();
}

function logout() { location.reload(); }
