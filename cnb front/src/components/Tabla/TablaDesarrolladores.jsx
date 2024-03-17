import React, {useState, useEffect} from "react";
import Style from './tablaDesarrolladores.module.css'
import axios from "axios";
import FormularioEditar from "../FormularioEditar/FormularioEditar"
import { Modal } from "@mui/material";
import Swal from 'sweetalert2';

export default function Desarrolles() {

    const[desarrolladores, setDesarrolladores] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/desarrolladores/getDesarrolladores").then((response) => {
            setDesarrolladores(response.data)
        })  
    }, []) 

    const handleDelete = (idDesarrollador) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/desarrolladores/deleteDesarrollador/${idDesarrollador}`)
                    .then(() => {
                        Swal.fire('¡Eliminado!', 'El desarrollador ha sido eliminado correctamente.', 'success');
                        axios.get("http://localhost:3001/desarrolladores/getDesarrolladores")
                        .then((response) => {
                            setDesarrolladores(response.data);
                        })
                        .catch((error) => {
                            console.error('Error al obtener la lista de desarrolladores después de eliminar:', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el desarrollador:', error);
                        Swal.fire('¡Error!', 'Hubo un problema al intentar eliminar el desarrollador.', 'error');
                    });
            }
        });
    }

    const [modal, setModal] = useState(false)
    const [desarrolladorEdit, setDesarrolladorEdit] = useState(false)

    const handleOpenModal = (desarrollador) => {
        setModal(true)
        setDesarrolladorEdit(desarrollador)
    }

    const handleCloseModal = () => {
        setModal(false)
    }

    return (

        <div className={Style.table_list}>
            <h1  style={{textAlign:'left',color:'black', marginLeft:'5%'}}>Lista de Desarrolladores</h1>

            <table className={Style.table}>
                <thead className={Style.campos}>
                    <tr>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Habilidades</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>

                    {desarrolladores.map((desarrollador, index) => (
                        <tr key={index}>
                            <td>{desarrollador.id}</td>
                            <td>{desarrollador.name}</td>
                            <td>{desarrollador.age}</td>
                            <td>{desarrollador.skills}</td>
                            <td className={Style.options}>
                                <button className={Style.update} onClick={() => handleOpenModal(desarrollador)}>Editar</button>
                                <button className={Style.delete} onClick={() => handleDelete(desarrollador.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
    
                </tbody>
            </table>

            { desarrolladorEdit &&
                <Modal open={modal} onClose={handleCloseModal}>
                    <FormularioEditar
                        desarrollador={desarrolladorEdit}
                        handleCloseModal={handleCloseModal}
                        getDesarrolladores={desarrolladores}
                        setDesarrolladores={setDesarrolladores}
                    />
                </Modal>

            }
            
        </div>

    )
}