import React from 'react';
import styled from 'styled-components';
// components
import Contacto from './Contacto';
// db  y demas funciones
import db from '../firebase/firebase-config';

const ListaContacto = () => {
	return (
		<ContenedorContacto>
			<Contacto />
		</ContenedorContacto>
	);
};

const ContenedorContacto = styled.div`
	margin-top: 40px;
`;
export default ListaContacto;
