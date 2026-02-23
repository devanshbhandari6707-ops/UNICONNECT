// INITIALIZE DATA
let opportunities = JSON.parse(localStorage.getItem('uni_opps')) || [
    { id: 101, title: "Frontend Developer", type: "Internship" },
    { id: 102, title: "UI/UX Course", type: "Certification" }
];

let appliedIds = JSON.parse(localStorage.getItem('uni_applied')) || [];

// NAVIGATION
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

// STUDENT FUNCTIONS
function renderStudentView() {
    const availableDiv = document.getElementById('opportunity-list');
    const appliedDiv = document.getElementById('applied-list');

    // Clear lists
    availableDiv.innerHTML = "";
    appliedDiv.innerHTML = "";

    opportunities.forEach(opp => {
        const isApplied = appliedIds.includes(opp.id);
        
        const html = `
            <div class="opp-card ${isApplied ? 'applied' : ''}">
                <div>
                    <strong>${opp.title}</strong><br>
                    <small>${opp.type}</small>
                </div>
                ${isApplied 
                    ? '<span class="status-tag">Enrolled</span>' 
                    : `<button class="btn-primary" onclick="applyFor(${opp.id})">Apply</button>`
                }
            </div>
        `;

        if (isApplied) {
            appliedDiv.innerHTML += html;
        } else {
            availableDiv.innerHTML += html;
        }
    });

    // Update Progress
    const progress = (appliedIds.length / (opportunities.length || 1)) * 100;
    document.getElementById('progress-val').innerText = Math.round(progress) + "%";
}

function applyFor(id) {
    console.log("Applying for ID:", id);
    if (!appliedIds.includes(id)) {
        appliedIds.push(id);
        localStorage.setItem('uni_applied', JSON.stringify(appliedIds));
        renderStudentView();
    }
}

// UNIVERSITY FUNCTIONS
function addOpportunity() {
    const titleVal = document.getElementById('opp-title').value;
    const typeVal = document.getElementById('opp-type').value;

    if (!titleVal) {
        alert("Please enter a title");
        return;
    }

    const newOpp = {
        id: Date.now(), // Unique ID
        title: titleVal,
        type: typeVal
    };

    opportunities.push(newOpp);
    localStorage.setItem('uni_opps', JSON.stringify(opportunities));
    
    document.getElementById('opp-title').value = ""; // Reset input
    renderUniversityView();
    alert("Opportunity Posted!");
}

function renderUniversityView() {
    const manageDiv = document.getElementById('uni-manage-list');
    manageDiv.innerHTML = opportunities.map(opp => `
        <div class="opp-card">
            <div><strong>${opp.title}</strong> (${opp.type})</div>
            <button class="btn-delete" onclick="deleteOpp(${opp.id})">Remove</button>
        </div>
    `).join('');
}

function deleteOpp(id) {
    opportunities = opportunities.filter(o => o.id !== id);
    appliedIds = appliedIds.filter(aid => aid !== id);
    localStorage.setItem('uni_opps', JSON.stringify(opportunities));
    localStorage.setItem('uni_applied', JSON.stringify(appliedIds));
    renderUniversityView();
}

// EMERGENCY RESET
function resetSystem() {
    localStorage.clear();
    location.reload();
}
