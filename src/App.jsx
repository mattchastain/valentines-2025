import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import './App.css';

const music = new Audio('./audio/music.mp3');
const yay = new Audio('./audio/yay.mp3');
const dun = new Audio('./audio/dun.mp3');

music.playbackRate = 0.8;

const getRandomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {
	const [position, setPosition] = useState({
		position: 'absolute',
		top: 0,
		left: 0,
		transform: 'translate(0, 0)',
	});
	const handleSetPosition = () => {
		setPosition({
			position: 'absolute',
			top: 0,
			left: 0,
			transform: `translate(${getRandomNumber(
				5,
				85
			)}vw, ${getRandomNumber(5, 85)}vh)`,
		});
	};

	const handleMouseEnter = () => {
		if (!isMobile) {
			handleSetPosition();
		}
	};

	const [image, setImage] = useState('./images/CorgiHoldingFlowers.jpg');
	const [moveBtn, setMoveBtn] = useState(false);
	const handleYesClick = (e) => {
		e.preventDefault;
		setImage('./images/HappyCorgi.jpg');
		yay.play();
	};
	const handleNoClick = (e) => {
		e.preventDefault;
		setImage('./images/MadCorgi.jpg');
		setMoveBtn(true);
		handleSetPosition();
		music.pause();
		dun.play();
	};

	const [open, setOpen] = useState(false);
	const handleOpen = (e) => {
		e.preventDefault();
		setOpen(true);
		music.play();
	};

	if (open) {
		return (
			<div className='container'>
				<h1>Happy Valentines Day!</h1>
				<h3>Will you be my Valentine?</h3>
				<img src={image} alt='image of corgi' />
				<div className='options'>
					<button className='yes-btn' aria-label='click yes' onClick={handleYesClick}>
						Yes
					</button>
					<button
						className='no-btn'
					    aria-label='click no'
						onClick={handleNoClick}
						onMouseEnter={handleMouseEnter}
						style={moveBtn ? position : { top: 0, left: 0 }}
					>
						No
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<>
				<h1 className='letter-title'>You got a letter!</h1>
				<div className='letter'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='envelope bi bi-envelope'
						viewBox='0 0 16 16'
					>
						<path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z' />
					</svg>
				</div>
				<button aria-label='click to open envelope' onClick={handleOpen}>Open</button>
			</>
		);
	}
}

export default App;
