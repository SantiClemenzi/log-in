import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// components
import Contacto from './Contacto';
// db  y demas funciones
import db from '../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const ListaContacto = () => {
	// creamos arreglo para los usuarios
	const [usuarios, cambiarUsuarios] = useState([]);

	// conectamos la app con firebase
	useEffect(() => {
		// onSnapshot mantiene una conexion abierta con firebase
		onSnapshot(
			// primer parametro realiza la coleccion y el segundo es lo que va a ejecutar por cada cambio
			collection(db, 'usuario'),
			(snapshot) => {
				// console.log(snapshot.docs[1].data());
				const arregloUsuarios = snapshot.docs.map((documento) => {
					return { ...documento.data(), id: documento.id };
				});
				// agregamos los usuarios cargados en firestore a nuestro arreglo usuarios
				cambiarUsuarios(arregloUsuarios);
			}
		);
	}, []);
	return (
		// creamos condicional que va a mostrar los usuarios si es que hay 
		usuarios.length > 0 && (
			<ContenedorContacto>
				{usuarios.map((usuario) => (
					<Contacto
						key={usuario.id}
						id={usuario.id}
						nombre={usuario.nombre}
						correo={usuario.email}
					/>
				))}
			</ContenedorContacto>
		)
	);
};

const ContenedorContacto = styled.div`
	margin-top: 40px;
`;
export default ListaContacto;
