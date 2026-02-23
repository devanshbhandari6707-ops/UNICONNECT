// 1. Initialize Data
let opportunities = JSON.parse(localStorage.getItem('opps')) || [
    { id: 101, title: "Frontend Development", type: "Internship" },
    { id: 102, title: "Cloud Computing", type: "Certification" },
    { id: 103, title: "UI/UX Design", type: "Internship" },
    { id: 104, title: "Data Science", type: "Certification" }
];

// Load applied IDs from storage
let appliedIds = JSON.parse(localStorage.getItem('applied')) || [];

// 2. Navigation Logic
function showDashboard(role) {
    // Hide login, show logout
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');

    if (role === 'student') {
        document.getElementById('student-dashboard').classList.remove('hidden');
        document.getElementById('uni-dashboard').classList.add('hidden');
        renderStudentView(); // Call the specific student render
    } else {
        document.getElementById('uni-dashboard').classList.remove('hidden');
        document.getElementById('student-dashboard').classList.add('hidden');
        renderUniversityView();
    }
}

// 3. Student Render Logic
function renderStudentView() {
    const availableList = document.getElementById('opportunity-list');
    const appliedList = document.getElementById('applied-list');

    // Filter into two arrays
    const availableItems = opportunities.filter(opp => !appliedIds.includes(opp.id));
    const appliedItems = opportunities.filter(opp => appliedIds.includes(opp.id));

    // Render Available Column
    availableList.innerHTML = availableItems.map(opp => `
        <div class="opp-card">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: #64748b">${opp.type}</small>
            </div>
            <button class="btn-primary" onclick="applyFor(${opp.id})">Apply</button>
        </div>
    `).join('') || '<p class="empty-msg">No new opportunities.</p>';

    // Render Applied Column
    appliedList.innerHTML = appliedItems.map(opp => `
        <div class="opp-card" style="border-left-color: #10b981; background: #f0fdf4;">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: #64748b">${opp.type}</small>
            </div>
            <span class="applied-badge">Applied</span>
        </div>
    `).join('') || '<p class="empty-msg">No applications yet.</p>';
}

// 4. THE ACTION FUNCTION
function applyFor(id) {
    console.log("Applying for ID:", id); // Check your browser console (F12)
    
    if (!appliedIds.includes(id)) {
        appliedIds.push(id);
        // Save to browser memory
        localStorage.setItem('applied', JSON.stringify(appliedIds));
        // Refresh the UI immediately
        renderStudentView();
    }
}

// 5. University Render Logic
function renderUniversityView() {
    const tbody = document.getElementById('student-body');
    const mockStudents = [
        { name: "Alice Johnson", course: "Computer Science", progress: "85%" },
        { name: "Bob Smith", course: "Data Science", progress: "40%" }
    ];

    tbody.innerHTML = mockStudents.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td><strong>${s.progress}</strong></td>
        </tr>
    `).join('');
}

function logout() {
    window.location.reload();
}
