let currentRole = "";
let currentUser = "";

let internships = JSON.parse(localStorage.getItem("internships")) || ["Web Developer Intern", "Finance Intern"];
let certifications = JSON.parse(localStorage.getItem("certifications")) || ["Data Analytics Certification"];
let students = JSON.parse(localStorage.getItem("students")) || {
    "student1": { progress: "Completed 20%" }
};

function setRole(role) {
    currentRole = role;
}

function login() {
    const username = document.getElementById("username").value;

    if (!currentRole) {
        alert("Select a role first!");
        return;
    }

    currentUser = username;

    if (currentRole === "student") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("student-dashboard").classList.remove("hidden");
        loadStudentDashboard();
    } else {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("university-dashboard").classList.remove("hidden");
        loadUniversityDashboard();
    }
}

function logout() {
    location.reload();
}

function loadStudentDashboard() {
    const internshipList = document.getElementById("internship-list");
    internshipList.innerHTML = "";

    internships.forEach(i => {
        const li = document.createElement("li");
        li.textContent = i;
        internshipList.appendChild(li);
    });

    const progressList = document.getElementById("progress-list");
    progressList.innerHTML = "";

    if (students[currentUser]) {
        const li = document.createElement("li");
        li.textContent = students[currentUser].progress;
        progressList.appendChild(li);
    } else {
        progressList.innerHTML = "<li>No progress yet</li>";
    }
}

function loadUniversityDashboard() {
    const studentList = document.getElementById("student-list");
    studentList.innerHTML = "";

    for (let student in students) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${student} - ${students[student].progress}
            <button onclick="updateProgress('${student}')">Update</button>
        `;
        studentList.appendChild(li);
    }
}

function addInternship() {
    const newInternship = document.getElementById("new-internship").value;
    internships.push(newInternship);
    localStorage.setItem("internships", JSON.stringify(internships));
    alert("Internship Added!");
}

function addCertification() {
    const newCert = document.getElementById("new-certification").value;
    certifications.push(newCert);
    localStorage.setItem("certifications", JSON.stringify(certifications));
    alert("Certification Added!");
}

function updateProgress(student) {
    const newProgress = prompt("Enter new progress:");
    students[student] = { progress: newProgress };
    localStorage.setItem("students", JSON.stringify(students));
    loadUniversityDashboard();
}