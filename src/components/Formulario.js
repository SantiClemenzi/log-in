import React, {useState} from "react";
import styled from "styled-components";
// db  y demas funciones
import db from './../firebase/firebase-config';
import { collection, addDoc } from "firebase/firestore";

const Formulario = () => {
    const [nombre, cambiarNombre] = useState('');
    const [email, cambiarEmail] = useState('');

    const onSubmit = async (e) =>{
        e.preventDefault();

        // utilizamos try para que nos notifique si hay error
        try{
            // await es para ejecutar primero el insert a la db
            await addDoc(collection(db, 'usuario'), {
                nombre: nombre,
                email: email
            });
            console.log('se registro correctamente');
            //catch para obtener el error
        }catch(error){
            console.log('Ha ocurrido un error '+ error);
        }

        // limpiamos los inputs
        cambiarNombre('');
        cambiarEmail('');
    }
    return ( 
        <form action="" onSubmit={onSubmit}>
            <Input name="nombre" type="text" placeholder="nombre" value={nombre} onChange={(e)=>cambiarNombre(e.target.value)} required/>
            <Input name="email" type="email" placeholder="nombre@correo.com" value={email} onChange={(e)=>cambiarEmail(e.target.value)} required/>
            <Boton type="submit">Agregar</Boton>
        </form>
     );
}

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
 
const Boton = styled.button`
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .3s ease all;
    outline: none;
    background: #3D76E9;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #C4C4C4;
    }
 required`;
export default Formulario;