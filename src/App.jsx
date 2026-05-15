
import { useEffect, useState } from 'react'
import { supabase } from './utils/supabase'
import './App.css'

function App() {
//READ from Database//
    const [students, setStudents] = useState([]);
//Form Add/CREATE State//
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");

//READ//
async function fetchStudents() {
   try {
    const {data, error} = await supabase.from("Directory").select("*");
    if(error){
      console.log(error);
    } else {
      console.log(data);
      setStudents(data);
    }
   } catch (error) {
      console.log(error);
   }
}
//Form Add/CREATE//
async function addStudent(event) {
   event.preventDefault();
   try {
     const {data, error} = await supabase.from("Directory").insert([{
      name: name, major: major, year: year,
     }]);
     if(error){
      console.log(error);
     } else {
      console.log("Student Added");
      //Clear Form//
      setName("");
      setMajor("");
      setYear("");
      //Refresh List//
      fetchStudents();
     }
   } catch (error) {
      console,log(error);
      console.log(addStudent);
   }
}
//DELETE//
async function deleteStudent(id) {
   try {
     const{error} = await supabase.from("Directory").delete().eq("id", id);
     if(error){
      console.log(error);
     } else {
      //Refresh students after delete//
      fetchStudents();
     }
   } catch (error) {
      console.error(error);
   }
}

   useEffect(()=>{
    fetchStudents();
   }, []);

  return (
    <>
      <h1>List</h1>
        {/*Form Add/CREATE*/}
      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(event) => setMajor(event.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {/*READ fromDatabase*/}
      <div>
        {students.map((student) => (
          <div key={student.id}>
            <h2>{student.name}</h2>
            <p>{student.major}</p>
            <p>{student.year}</p>
            <button onClick={()=> deleteStudent(student.id)}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App
