// 1. Load Data with unique IDs
let opportunities = JSON.parse(localStorage.getItem('opps')) || [
    { id: 1, title: "Frontend Development", type: "Internship" },
    { id: 2, title: "Cloud Computing", type: "Certification" },
    { id: 3, title: "UI/UX Design", type: "Internship" }
];

let appliedIds = JSON.parse(localStorage.getItem('applied')) || [];

// 2. The "Apply" Function (Specifically targets ONE ID)
function applyFor(targetId) {
    // Ensure we are handling the ID as a number or unique string
    if (!appliedIds.includes(targetId)) {
        appliedIds.push(targetId);
        
        // Save to browser memory
        localStorage.setItem('applied', JSON.stringify(appliedIds));
        
        // RE-RENDER only the student view to show the change
        renderStudentView();
    }
}

// 3. Render Student View
function renderStudentView() {
    const availableList = document.getElementById('opportunity-list');
    const appliedList = document.getElementById('applied-list');

    // Filter logic: Item is "Available" ONLY if its ID is NOT in the appliedIds array
    const availableItems = opportunities.filter(opp => !appliedIds.includes(opp.id));
    const appliedItems = opportunities.filter(opp => appliedIds.includes(opp.id));

    availableList.innerHTML = availableItems.map(opp => `
        <div class="opp-card">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: #64748b">${opp.type}</small>
            </div>
            <button class="btn-primary" onclick="applyFor(${opp.id})">Apply</button>
        </div>
    `).join('') || '<p>No more available items.</p>';

    appliedList.innerHTML = appliedItems.map(opp => `
        <div class="opp-card applied-style">
            <div>
                <h4 style="margin:0">${opp.title}</h4>
                <small style="color: #64748b">${opp.type}</small>
            </div>
            <span class="applied-badge">Applied</span>
        </div>
    `).join('') || '<p>Nothing applied for yet.</p>';
}

// 4. University: Adding New Opportunity with UNIQUE ID
function addOpportunity() {
    const title = document.getElementById('opp-title').value;
    const type = document.getElementById('opp-type').value;

    if (title) {
        const newOpp = {
            id: Date.now(), // This creates a unique ID based on the timestamp
            title: title,
            type: type
        };

        opportunities.push(newOpp);
        localStorage.setItem('opps', JSON.stringify(opportunities));
        
        alert("Posted: " + title);
        document.getElementById('opp-title').value = '';
        renderUniversityView(); // Refresh uni list if visible
    }
}

// 5. General Navigation
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
    }
}

function logout() { location.reload(); }
