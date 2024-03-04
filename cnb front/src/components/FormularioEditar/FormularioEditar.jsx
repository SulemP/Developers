import React, {useState} from "react";
import Style from './formularioEditar.module.css'
import axios from "axios";

export default function Formulario(props) {

    const{desarrollador} = props
    
    const [nuevoDesarrollador, setNuevoDesarrollador] = useState({
        idDesarrollador: desarrollador.id,
        name: desarrollador.name,
        age: desarrollador.age,
        skills: desarrollador.skills
    })

    const [error, setError] = useState({
        idDesarrollador: '',
        name:'',
        age:'',
        skills:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoDesarrollador({
            ...nuevoDesarrollador,
            [name]: value
        });
    }

    const handleCreate = () => {
        const errores = {}
        let hayErrores = false

        if(!nuevoDesarrollador.name){
            errores.name = 'Inserte un nombre'
            hayErrores = true
        }

        if(!nuevoDesarrollador.age){
            errores.age = 'Inserte la edad'
            hayErrores = true
        }

        if(!nuevoDesarrollador.skills){
            errores.skills = 'Inserte las habilidades'
            hayErrores = true
        }

        if(hayErrores) {
            setError(errores)
            return
        }

        axios.put(`http://localhost:3001/desarrolladores/updateDesarrollador/${nuevoDesarrollador.idDesarrollador}`, nuevoDesarrollador)

        setNuevoDesarrollador({
            idDesarrollador:'',
            name:'',
            age:'',
            skills:''
        })

        setError({
            idDesarrollador:'',
            name:'',
            age:'',
            skills:''
        })
    }


    return (

        <div className={Style.tabla_form}>
            <h2 style={{textAlign:'left', color:'black'}}>Datos</h2>
            <div className={Style.form}>
                <input 
                    placeholder={error.name ? error.name : "Nombre"} 
                    name="name" 
                    value={nuevoDesarrollador.name} 
                    onChange={handleChange} 
                    className={error.name ? Style.inputError: ''}
                />

                <input 
                    placeholder="Edad" 
                    name="age" 
                    value={nuevoDesarrollador.age} 
                    onChange={handleChange} 
                    className={error.age ? Style.inputError: ''}
                />
                <input 
                    placeholder="Habilidades" 
                    name="skills" 
                    value={nuevoDesarrollador.skills} 
                    onChange={handleChange} 
                    className={error.skills ? Style.inputError: ''}
                />
                <button onClick={handleCreate}>Guardar</button>
            </div>

        </div>

    )
}