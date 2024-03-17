import React, {useState} from "react";
import Style from './formularioEditar.module.css'
import axios from "axios";
import Swal from 'sweetalert2';

export default function Formulario(props) {

    const{desarrollador, handleCloseModal, getDesarrolladores, setDesarrolladores} = props

    console.log('getDesarrolladores', getDesarrolladores)
    
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

    const handleEdit = () => {
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

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:3001/desarrolladores/updateDesarrollador/${nuevoDesarrollador.idDesarrollador}`, nuevoDesarrollador)
                    .then(() => {
                        Swal.fire('¡Editado!', 'El desarrollador ha sido editado correctamente.', 'success');
                        axios.get("http://localhost:3001/desarrolladores/getDesarrolladores")
                        .then((response) => {
                            setDesarrolladores(response.data);
                        })
                        .catch((error) => {
                            console.error('Error al obtener la lista de desarrolladores después de editar:', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error al editar el desarrollador:', error);
                        Swal.fire('¡Error!', 'Hubo un problema al intentar editar el desarrollador.', 'error');
                    });
            }
        })

        .catch((error) => {
            console.error('Error creating developer:', error);
        });

        handleCloseModal()

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
            <div className={Style.close}>
                <h2 style={{textAlign:'left', color:'black'}}>Datos</h2>
                <p onClick={handleCloseModal}>X</p>  
            </div>

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
                <button onClick={handleEdit}>Guardar</button>
            </div>

        </div>

    )
}