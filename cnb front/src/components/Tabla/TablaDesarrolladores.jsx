import React, {useState, useEffect} from "react";
import Style from './tablaDesarrolladores.module.css'
import axios from "axios";
import FormularioEditar from "../FormularioEditar/FormularioEditar"
import { Modal } from "@mui/material";

export default function Desarrolles() {

    // const{desarrolladores, getDev} =props
    // console.log('tabla',desarrolladores)
    // console.log('getDev', getDev)
    const[desarrolladores, setDesarrolladores] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/desarrolladores/getDesarrolladores").then((response) => {
            setDesarrolladores(response.data)
        })
    }, []) 

    const handleDelete = (idDesarrollador) => {
        axios.delete(`http://localhost:3001/desarrolladores/deleteDesarrollador/${idDesarrollador}`)
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
                    />
                </Modal>

            }
            
        </div>

    )
}