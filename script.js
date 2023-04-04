var count = 0;
var studentsData = [];

function addNewStudent() {

    const studentName = document.getElementsByClassName("name").value;
    const studentEmail = document.getElementsByClassName("email").value;
    const studentAge = document.getElementsByClassName("age").value;
    const studentGrade = document.getElementsByClassName("gpa").value;
    const studentDegree = document.getElementsByClassName("degree").value;

    //plz fill all mandotory field, Blank will not be Accepted.
    if (studentName == "" || studentEmail == "" || studentAge == "" || studentGrade == "" || studentDegree == "") {
        alert("All fields are required!")
        return;
    }

    // add id and push new studentsData  in array
    count++;

    studentsData.push({
        ID: count, name: studentName, email: studentEmail, age: studentAge, grade: studentGrade, degree: studentDegree
    });

    localStorage.setItem("studentsData", JSON.stringify(studentsData));

    document.getElementsByClassName("name").value="";
    document.getElementsByClassName("email").value="";
    document.getElementsByClassName("age").value="";
    document.getElementsByClassName("gpa").value="";
    document.getElementsByClassName("degree").value="";
    console.log(studentsData);
   showTableData();
}

function showTableData() {
    const table = document.getElementsByClassName("tablebody");
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value = "";
    studentsData.forEach((student) => {
        const tableRow = document.createElement("tr")

        var keys = Object.keys(student)
        var id = document.createElement('td')

        const name = document.createElement("td")
        const email = document.createElement("td")
        const age = document.createElement("td")
        const gpa = document.createElement("td")
        const degree = document.createElement("td")

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'gpa') {
                gpa.innerHTML = student[key];
            }
            else
            degree.innerHTML = `<div>${
                student[key]
            }
            </div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div> `;
        
            tableRow.appendChild(id);
            tableRow.appendChild(name);
            tableRow.appendChild(email);
            tableRow.appendChild(age);
            tableRow.appendChild(gpa);
            tableRow.appendChild(degree);
        })
        table.appendChild(tableRow);
    })
}
function searchByName() {
    var input, filter, table, tr, td, i, inputText, inputText2, inputText3;
    input = document.getElementsByClassName("searchByName");
    filter = input.value.toUpperCase();
    table = document.getElementsByClassName("tablebody");
    tr = table.getElementsByTagName("tr");
   
   //Loops all table rows and hide the not matching search element
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            inputText = td.textContent || td.innerText;
            inputText2 = td1.textContent || td1.innerText;
            inputText3 = td2.textContent || td2.innerText;

            if ( inputText.toUpperCase().indexOf(filter) > -1 ||  inputText2.toUpperCase().indexOf(filter) > -1 ||  inputText3.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }

        }
    }
}

//Edit StudentData from Stored array
function edit(id) {
    studentsData.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementsByClassName("name").value = student["name"];
            document.getElementsByClassName("email").value = student["email"];
            document.getElementsByClassName("age").value = student["age"];
            document.getElementsByClassName("gpa").value = student["gpa"];
            document.getElementsByClassName("degree").value = student["degree"];
            document.getElementsByClassName("submitBtn").innerText = "Edit Student";

            document.getElementsByClassName("submitBtn").onclick = function jsFunc() {

                student["name"] = document.getElementsByClassName("name").value;
                student["email"] = document.getElementsByClassName("email").value;
                student["age"] = document.getElementsByClassName("age").value;
                student["gpa"] = document.getElementsByClassName("gpa").value;
                student["degree"] = document.getElementsByClassName("degree").value;

                document.getElementsByClassName("name").value="";
                document.getElementsByClassName("email").value="";
                document.getElementsByClassName("age").value="";
                document.getElementsByClassName("gpa").value="";
                document.getElementsByClassName("degree").value="";

                document.getElementsByClassName("submitBtn").innerText = "Add Student";

                showTableData();
            }
        }
    })
}

function del(id) {
    studentsData.forEach((student, index) => {
        if (student["ID"] == id) {
            studentsData.splice(index, 1);
            showTableData();
        }
    })
}
    
    
window.onload = () => {
    studentsData = JSON.parse(localStorage.getItem('studentsData')) || [];
     count = studentsData.reduce((max, student) => Math.max(max, student.ID), 0);
    showTableData();
};
    
window.onbeforeunload = () => {
 localStorage.setItem('studentsData', JSON.stringify(studentsData));
};