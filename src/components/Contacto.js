import React, {useState} from "react";
import styled from "styled-components";
// db y demas funciones
import db from "../firebase/firebase-config";
import { doc, deleteDoc, updateDoc} from "firebase/firestore";

const Contacto = ({id, nombre, correo}) => {
    const [estadoContacto, cambiarEstadoContacto]= useState(false)

    const [nuevoNombre, cambiarNuevoNombre] = useState(nombre);
    const [nuevoCorreo, cambiarNuevoCorreo] = useState(correo);

    const actualizarContacto = async (e) =>{
        // evitamos que la pagina se refresque
        e.preventDefault();

        // actualizamos los datos
        try{
            await updateDoc(doc(db, 'usuario', id), {
                nombre: nuevoNombre,
                email: nuevoCorreo
            });
        }catch(error){
            console.log('Ha ocurrido un error al actualizar');
            console.log(error);
        }

        // ocultamos los inputs
        cambiarEstadoContacto(!estadoContacto);
    }

    const borrarContacto = async () =>{
        // borramos los datos
        try{
            await deleteDoc(doc(db, 'usuario', id));
        }catch(error){
            console.log('Ha ocurrido un error al actualizar');
            console.log(error);
        }
    }

    return ( 
    <ContenedorContacto>
        {estadoContacto?
         <form action="" onSubmit={actualizarContacto}>
             <Input
                type="text"
                name="nombre"
                placeholder="nombre"
                value={nuevoNombre}
                onChange={(e)=>{cambiarNuevoNombre(e.target.value)}}
             />
             <Input
                type="email"
                name="email"
                placeholder="nombre@correo.com"
                value={nuevoCorreo}
                onChange={(e)=>{cambiarNuevoCorreo(e.target.value)}}
             />
             <Boton type="submit">Actualizar</Boton>
         </form>
         :
         <> 
            <Nombre>{nombre}</Nombre>
            <Correo>{correo}</Correo>
            <Boton onClick={()=>cambiarEstadoContacto(!estadoContacto)}>Editar</Boton>
            <Boton onClick={()=>borrarContacto(id)}>Borrar</Boton>
         </>   
        }
    </ContenedorContacto> );
}
const ContenedorContacto = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;
 
const Nombre = styled.p`
    font-weight: bold;
`;
 
const Correo = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;
 
const Boton = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;
 
export default Contacto;