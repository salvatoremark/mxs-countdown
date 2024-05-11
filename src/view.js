/**
 * WordPress Dependencies
 */
// import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal Dependencies
 */
// none

console.log( 'in the view file.' );

export default function MXS_Countdown( { attributes } ) {
	const {
		targetDate,
		targetDateLabel,
		targetDateMessage,
		targetDateSeparator,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'mxs-countdown',
	} );

	const refDays = useRef();
	const refHours = useRef();
	const refMinutes = useRef();
	const refSeconds = useRef();
	const refCountdown = useRef();

	let timer;
	const end = new Date( targetDate );
	const _second = 1000;
	const _minute = _second * 60;
	const _hour = _minute * 60;
	const _day = _hour * 24;

	const showRemaining = () => {
		const now = new Date();
		const distance = end - now;
		if ( distance < 0 ) {
			clearInterval( timer );
			refCountdown.current.innerHTML = targetDateMessage;
			return;
		}

		const days = Math.floor( distance / _day );
		const hours = Math.floor( ( distance % _day ) / _hour );
		const minutes = Math.floor( ( distance % _hour ) / _minute );
		const seconds = Math.floor( ( distance % _minute ) / _second );

		if (
			refDays.current !== null &&
			typeof refDays.current !== 'undefined'
		) {
			refDays.current.innerHTML =
				days + ' days ' + targetDateSeparator + ' ';
			refHours.current.innerHTML =
				hours + ' hours ' + targetDateSeparator + ' ';
			refMinutes.current.innerHTML =
				minutes + ' minutes ' + targetDateSeparator + ' ';
			refSeconds.current.innerHTML = seconds + ' seconds';
		}
	};

	useEffect( () => {
		timer = setInterval( showRemaining, 1000 );
		console.log( 'useEffect is running' );
		return () => clearInterval( timer );
	}, [] );

	return (
		<>
			<div { ...blockProps }>
				<div ref={ refCountdown } className="countdown">
					{ targetDateLabel && (
						<div className="target-date-label">
							{ targetDateLabel }
						</div>
					) }
					<span ref={ refDays }></span>
					<span ref={ refHours }></span>
					<span ref={ refMinutes }></span>
					<span ref={ refSeconds }></span>
				</div>
			</div>
		</>
	);
}

document.addEventListener( 'DOMContentLoaded', () => {
	console.log( 'DOM is loaded' );
	const domNode = document.getElementsByClassName( 'mxs-countdown' )[ 0 ];
	const root = hydrateRoot( domNode );
	root.render( <MXS_Countdown /> );
} );
