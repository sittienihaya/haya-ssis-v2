# importing the eel library
import eel
import sqlite3 as sql
import csv

# initializing the application
eel.init("ui")


@eel.expose
def getStudents():
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    students = []
    for row in cur.execute("SELECT * FROM student"):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def add(studentinfo):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    query = "INSERT INTO Student (lrn,studentfname, middlename, lastname, gender, course, year, gmail) VALUES (?,?, ?, ?, ?, ?, ?, ?);"
    cur.execute(
        query,
        (
            studentinfo[0],
            studentinfo[1],
            studentinfo[2],
            studentinfo[3],
            studentinfo[4],
            studentinfo[5],
            studentinfo[6],
            studentinfo[7],
        ),
    )
    con.commit()
    for row in cur.execute("SELECT * FROM student"):
        print(row)

    con.close()


@eel.expose
def searchStudentbyId(id):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Student WHERE lrn LIKE ?;"
    pattern = f"{id}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def searchStudentbyName(name):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Student WHERE studentfname LIKE ?;"
    pattern = f"{name}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def updateStudent(studentid, studentinfo):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    query = "UPDATE Student SET studentfname = ?, middlename = ?, lastname = ?, gender = ?, course = ?, year = ?, gmail = ? WHERE lrn = ?;"
    cur.execute(
        query,
        (
            studentinfo[0],
            studentinfo[1],
            studentinfo[2],
            studentinfo[3],
            studentinfo[4],
            studentinfo[5],
            studentinfo[6],
            studentid,
        ),
    )
    con.commit()
    con.close()


@eel.expose
def getStudentInfo(studentid):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    query = "SELECT * FROM student WHERE lrn = ?;"
    cur.execute(
        query,
        (studentid,),
    )
    student_info = cur.fetchone()
    return student_info


@eel.expose
def deleteStudent(studentid):
    con = sql.connect("haya_ssis_v2.db")
    cur = con.cursor()
    query = "DELETE from student where lrn =?"
    cur.execute(
        query,
        (studentid,),
    )
    con.commit()
    con.close()


eel.start("index.html")
