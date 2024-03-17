import React, {useState, useEffect} from "react";
import Style from './desarrolladores.module.css'
import Formulario from "../Formulario/Formulario";
import TablaDesarrolladores from '../Tabla/TablaDesarrolladores'
import axios from "axios";

export default function Desarrolles() {

    return (
        <div className={Style.tabla_container}>
            <div className={Style.fondo_blanco}>
                
                <Formulario/>
                
                <TablaDesarrolladores/>

            </div>
        </div>
    )
}