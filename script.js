const courses = [];

function addCourse() {
    const table = document.getElementById("courses");
    const row = document.createElement("tr");

    let gradeOptions = `
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="E">E</option>
    `;

    let levelOptions = `
        <option value="Regular">Regular</option>
        <option value="Honors">Honors</option>
        <option value="AP">AP</option>
    `;

    let creditOptions = `
        <option value="Full Year">Full Year</option>
        <option value="Phy Ed">Phy Ed</option>
        <option value="SEM">SEMESTER</option>
        <option value="Health">Health</option>
    `;

    row.innerHTML = `
        <td><input type="text" class="course-name" placeholder="Course Name"></td>
        <td>
            <select class="grade">${gradeOptions}</select>
        </td>
        <td>
            <select class="level">${levelOptions}</select>
        </td>
        <td>
            <select class="credit">${creditOptions}</select>
        </td>
        <td>
         <button class="remove-btn">Remove</button>
        </td>
    `;

    table.appendChild(row);

    const removeButton = row.querySelector(".remove-btn");
    removeButton.addEventListener("click", function () {
        removeCourse(row);
    });

    courses.push(row);
}

function removeCourse(row) {
    const index = courses.indexOf(row);
    if (index > -1) {
        courses.splice(index, 1);
    }
    row.remove();
}

function calculateGPA(courses) {
    if (courses.length === 0) {
        alert("Please add at least one course before calculating GPA.");
        return;
    }

    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach(row => {
        let gradeElement = row.getElementsByClassName("grade")[0];
        let levelElement = row.getElementsByClassName("level")[0];
        let creditElement = row.getElementsByClassName("credit")[0];

        let grade = gradeElement.value;
        let level = levelElement.value;
        let creditType = creditElement.value;

        let numericGrade = convertToNumeric(grade, level);
        let credit = getCreditValue(creditType);

        if (credit > 0) {
            totalQualityPoints += numericGrade * credit;
            totalCredits += credit;
        }
    });

    let gpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : "N/A";
    document.getElementById("gpa").innerText = gpa;
}

function convertToNumeric(letterGrade, level) {
    const gradeScale = {
        Regular: { "A+": 4.6, "A": 4.3, "A-": 4.0, "B+": 3.6, "B": 3.3, "B-": 3.0, "C+": 2.6, "C": 2.3, "C-": 2.0, "D+": 1.6, "D": 1.3, "E": 0.0 },
        Honors: { "A+": 5.1, "A": 4.8, "A-": 4.5, "B+": 4.1, "B": 3.8, "B-": 3.5, "C+": 3.1, "C": 2.8, "C-": 2.5, "D+": 2.1, "D": 1.8, "E": 0.0 },
        AP: { "A+": 5.6, "A": 5.3, "A-": 5.0, "B+": 4.6, "B": 4.3, "B-": 4.0, "C+": 3.6, "C": 3.3, "C-": 3.0, "D+": 2.6, "D": 2.3, "E": 0.0 }
    };

    if (gradeScale[level] && gradeScale[level][letterGrade]) {
        return gradeScale[level][letterGrade];
    } else {
        return 0.0;
    }
}

function getCreditValue(creditType) {
    const creditValues = {
        "Full Year": 5.0,
        "Phy Ed": 3.75,
        "SEM": 2.5,
        "Health": 1.25
    };

    if (creditValues[creditType]) {
        return creditValues[creditType];
    } else {
        return 0;
    }
}
document.getElementById("calculate-btn").addEventListener("click", function () {
    calculateGPA(courses);
});