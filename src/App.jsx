
import { useEffect, useState } from 'react'
import { supabase } from './utils/supabase'
import './App.css'

function App() {
//READ from Database//
    const [students, setStudents] = useState([]);

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

   useEffect(()=>{
    fetchStudents();
   }, []);

  return (
    <>
      <h1>List</h1>
        {/*READ fromDatabase*/}
      <div>
        {students.map((student) => (
          <div key={student.id}>
            <h2>{student.name}</h2>
            <p>{student.major}</p>
            <p>{student.year}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App
