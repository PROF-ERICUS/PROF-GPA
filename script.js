// Function to convert marks to grade
function getGrade(marks) {
    if (marks >= 80) return 'A';
    if (marks >= 75) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 60) return 'B-';
    if (marks >= 55) return 'C+';
    if (marks >= 50) return 'C';
    if (marks >= 45) return 'C-';
    if (marks >= 40) return 'D';
    return 'F';
  }
  
  // Function to classify the GPA
  function classifyGPA(gpa) {
    if (gpa >= 3.60) return 'First Class';
    if (gpa >= 3.00) return 'Second Class Upper';
    if (gpa >= 2.50) return 'Second Class Lower';
    if (gpa >= 2.00) return 'Pass';
    return 'Fail';
  }
  
  // Variables to track total points and credits for CGPA
  let totalGpaPoints = 0;
  let totalCredits = 0;
  
  // Function to add a course input row for a semester
  function addCourse(button) {
    const courseInputs = button.previousElementSibling;
    const row = document.createElement('div');
    row.className = 'courseRow';
    row.innerHTML = `
      <input type="text" placeholder="Course Name" required>
      <input type="number" placeholder="Credit Hours" min="1" required>
      <input type="number" placeholder="Marks (0-100)" min="0" max="100" required>
      <span class="grade"></span>
    `;
    courseInputs.appendChild(row);
  }
  
  // Function to calculate the GPA for a specific semester
  function calculateSemesterGPA(button) {
    const semesterSection = button.closest('.semesterSection');
    const courseRows = semesterSection.querySelectorAll('.courseRow');
  
    let semesterPoints = 0;
    let semesterCredits = 0;
  
    courseRows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const credit = parseFloat(inputs[1].value);
      const marks = parseFloat(inputs[2].value);
      const grade = getGrade(marks);
      const point = {
        'A': 4.00, 'A-': 3.75, 'B+': 3.50, 'B': 3.25, 'B-': 3.00,
        'C+': 2.75, 'C': 2.50, 'C-': 2.00, 'D': 1.50, 'F': 0
      }[grade];
  
      row.querySelector('.grade').innerText = `Grade: ${grade}`;
  
      if (point !== undefined) {
        semesterPoints += point * credit;
        semesterCredits += credit;
      }
    });
  
    const semesterResult = semesterSection.querySelector('.semesterResult');
    if (semesterCredits > 0) {
      const gpa = (semesterPoints / semesterCredits).toFixed(2);
      const classLabel = classifyGPA(gpa); // Get the class based on GPA
  
      // Update total points and credits for CGPA calculation
      totalGpaPoints += semesterPoints;
      totalCredits += semesterCredits;
  
      // Calculate CGPA
      const cgpa = (totalGpaPoints / totalCredits).toFixed(2);
      const cgpaClassLabel = classifyGPA(cgpa); // Get the class based on CGPA
  
      semesterResult.innerText = `Semester GPA: ${gpa} (Total Credits: ${semesterCredits}) - Class: ${classLabel}`;
      document.getElementById('cgpaResult').innerText = `CGPA: ${cgpa} (Total Credits: ${totalCredits}) - Class: ${cgpaClassLabel}`;
    } else {
      semesterResult.innerText = 'Please enter valid course information.';
    }
  }
  
  // Function to add a new semester section
  function addSemester() {
    const semesterInputs = document.getElementById('semesterInputs');
    const semesterCount = semesterInputs.getElementsByClassName('semesterSection').length + 1;
  
    const semesterSection = document.createElement('div');
    semesterSection.className = 'semesterSection';
    semesterSection.innerHTML = `
      <h4>Semester ${semesterCount}</h4>
      <div class="courseInputs">
        <div class="courseRow">
          <input type="text" placeholder="Course Name" required>
          <input type="number" placeholder="Credit Hours" min="1" required>
          <input type="number" placeholder="Marks (0-100)" min="0" max="100" required>
          <span class="grade"></span>
        </div>
      </div>
      <button type="button" onclick="addCourse(this)">Add Course</button>
      <button type="button" onclick="calculateSemesterGPA(this)">Calculate Semester GPA</button>
      <div class="semesterResult"></div>
    `;
    semesterInputs.appendChild(semesterSection);
  }
  
  // Close popup function
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
    localStorage.setItem('popupSeen', 'true');
  }
  
  // Show popup on window load
  window.onload = function () {
    const popupSeen = localStorage.getItem('popupSeen');
    if (!popupSeen) {
      setTimeout(() => {
        document.getElementById('popup').style.display = 'flex';
      }, 500);
    }
  
    // Check and apply dark mode preference on load
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    document.getElementById('modeToggle').checked = darkModePreference;
    document.body.classList.toggle('dark', darkModePreference);
  };
  
  // Dark mode toggle
  document.getElementById('modeToggle').addEventListener('change', function () {
    const isDarkMode = this.checked;
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  });
  