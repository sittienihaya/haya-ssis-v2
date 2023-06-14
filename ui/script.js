async function Read(){
    const studentsdata = await eel.getStudents()()
    studentsdata.map((student)=>{
        DisplayStudent(student[0],student[1],student[3],student[4],student[5],student[6])
    })
}
Read()


async function AddStudent(){
    const lrn = document.getElementById('addlrninput')
    const fname = document.getElementById('addfnameinput')
    const mname = document.getElementById('addmnameinput')
    const lname = document.getElementById('addlnameinput')
    const sex = document.getElementById('addsexinput')
    const year = document.getElementById('addyearinput')
    const course = document.getElementById('addcourseinput')
    const email = document.getElementById('addemailinput')
    const info= [lrn.value,fname.value,mname.value,lname.value,sex.value,course.value,year.value,email.value]
    await eel.add(info)()
    location.reload()
}

function DisplayStudent(id,fname,lname,sex,course,year){
    const main = document.getElementById('table-body')
    const row = document.createElement('tr')
    row.innerHTML = `
    <th>${id}</th>
    <th>${fname} ${lname}</th>
    <th>${sex}</th>
    <th>${course}</th>
    <th>${year}</th>
    <th>
        <a class="uk-button uk-button-primary" href="#modal-centerG" uk-toggle onclick="EditStudent(${id})">Edit</a>
        <button class="uk-button uk-button-danger" onclick="DeleteStudent(${id})">Delete</button>
    </th>
    `
    main.appendChild(row)
}


async function DeleteStudent(lrn){
    await eel.deleteStudent(lrn)
    location.reload()
    
}

async function EditStudent(id){
    const studentdata = await eel.getStudentInfo(id)()
    console.log(studentdata)
    const lrnE = document.getElementById('editlrninput')
    lrnE.value = id
    const fnameE = document.getElementById('editfnameinput')
    fnameE.value = studentdata[1]
    const mnameE = document.getElementById('editmnameinput')
    mnameE.value = studentdata[2]
    const lnameE = document.getElementById('editlnameinput')
    lnameE.value = studentdata[3]
    const sexE = document.getElementById('editsexselect')
    sexE.value = studentdata[4]
    const courseE = document.getElementById('editcourseinput')
    courseE.value = studentdata[5]
    const yearE = document.getElementById('edityearinput')
    yearE.value = studentdata[6]
    const gmailE = document.getElementById('editemailinput')
    gmailE.value = studentdata[7]
}

async function SaveEditStud(){
    const lrn = document.getElementById('editlrninput').value
    const fname = document.getElementById('editfnameinput').value
    const mname = document.getElementById('editmnameinput').value
    const lname = document.getElementById('editlnameinput').value
    const sex = document.getElementById('editsexselect').value
    const course = document.getElementById('editcourseinput').value
    const year = document.getElementById('edityearinput').value
    const gmail = document.getElementById('editemailinput').value
    const data = [fname,mname,lname,sex,course,year,gmail]
    await eel.updateStudent(lrn, data)
    location.reload()
}

function IdOrName(){
    const choice = document.getElementById('idorname')
    document.getElementById('searchby').innerText = choice.value
}


document.getElementById('searchbutton').addEventListener('click', async function Search(){
    const input = document.getElementById('searchinput')
    const idorname = document.getElementById('idorname')
    const main = document.getElementById('searchresult')
    main.innerHTML = ""
    if(input.value.length > 0){
        if(idorname.value == 'id'){
            const data = await eel.searchStudentbyId(input.value)()
            if(data.length > 0){
                data.map(data =>(
                    searchedStudents(data[0], data[1], data[3])
                ))
            }else{
                main.innerHTML = `<div id="searchresult">No Students Found ☹️</div>`
            }
        }else if(idorname.value == 'name'){
            const data = await eel.searchStudentbyName(input.value)()
            if(data.length > 0){
            data.map(data =>(
                searchedStudents(data[0], data[1], data[3])
            ))
        }else{
            main.innerHTML = `<div id="searchresult">No Students Found ☹️</div>`
        }
        }
    }else{
        main.innerHTML = `<div id="searchresult">No Students Found ☹️</div>`
    }
})

function searchedStudents(id,fname,lname){
    const main = document.getElementById('searchresult')
    const div = document.createElement('div')
    div.classList.add('results')
    div.innerHTML = `<div class="flex border-bottom-2">
    <a class="uk-button" href="#modal-centerG" uk-toggle onclick="EditStudent(${id})">${fname} - ${lname}</a>
    </div>`
    main.appendChild(div)
}