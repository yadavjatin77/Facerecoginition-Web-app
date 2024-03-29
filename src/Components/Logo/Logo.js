import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import ninja from './ninja.png';

const Logo = () => {
	return(
	<div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			<div className="Tilt-inner pa2">
				<img style={{paddingTop:'5px'}}alt='logo' src={ninja}/>
			</div>
		</Tilt>
	</div>
	);
}
export default Logo;