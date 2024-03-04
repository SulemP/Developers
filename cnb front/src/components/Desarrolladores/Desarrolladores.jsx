// import React from "react";
// import Style from './tablaDesarrolladores.module.css'

// export default function TablaDesarrolles() {
//     return (
//         <div className={Style.tabla_container}>
//             <div className={Style.fondo_blanco}>
//                 <div className={Style.tabla_form}>
//                     <h2 style={{textAlign:'left', color:'black'}}>Datos</h2>
//                     <div className={Style.form}>
//                         <input placeholder="Nombre" />
//                         <input placeholder="Edad" />
//                         <input placeholder="Habilidades" />
//                         <button>Guardar</button>
//                     </div>
//                 </div>

//                 <div className={Style.tabla_list}>
//                     <h1  style={{color:'black'}}>Lista de Desarrolladores</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }



import React, {useState, useEffect} from "react";
import Style from './desarrolladores.module.css'
import Formulario from "../Formulario/Formulario";
import TablaDesarrolladores from '../Tabla/TablaDesarrolladores'
import axios from "axios";

export default function Desarrolles() {

    // const [desarrolladores, setDesarrolladores] = useState([]);
    // console.log(desarrolladores)
    
    // const addDev = (nuevoDesarrollador) => {
    //     setDesarrolladores([...desarrolladores, nuevoDesarrollador])
    // }

    // const getDev = useEffect(() => {
    //     axios.get("http://localhost:3001/desarrolladores/getDesarrolladores").then((response) => {
    //         setDesarrolladores(response.data)
    //     })
    // },[])

    return (
        <div className={Style.tabla_container}>
            <div className={Style.fondo_blanco}>
                
                <Formulario
                    // addDev={addDev}
                />
                
                <TablaDesarrolladores
                    // desarrolladores={desarrolladores}
                />

            </div>
        </div>
    )
}