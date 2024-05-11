/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		countdownDate,
		countdownLabel,
		countdownMessage,
		countdownUnits,
		countdownUnitsDelimeter,
		textAlign,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `has-text-align-${ textAlign }`,
	} );

	const daysRef = useRef();
	const hoursRef = useRef();
	const minutesRef = useRef();
	const secondsRef = useRef();
	const countdownRef = useRef();

	let timer;

	const end = new Date( countdownDate );
	const _second = 1000;
	const _minute = _second * 60;
	const _hour = _minute * 60;
	const _day = _hour * 24;

	const showRemaining = () => {
		const now = new Date();
		const distance = end - now;
		if ( distance < 0 ) {
			clearInterval( timer );
			countdownRef.current.innerHTML = countdownMessage;
			return;
		}

		const days = Math.floor( distance / _day );
		const hours = Math.floor( ( distance % _day ) / _hour );
		const minutes = Math.floor( ( distance % _hour ) / _minute );
		const seconds = Math.floor( ( distance % _minute ) / _second );

		if (
			daysRef.current !== null &&
			typeof daysRef.current !== 'undefined'
		) {
			countdownUnits.includes( 'd' )
				? ( daysRef.current.innerHTML = days + ' days' )
				: '';
		}

		if (
			hoursRef.current !== null &&
			typeof hoursRef.current !== 'undefined'
		) {
			hoursRef.current.innerHTML = countdownUnits.includes( 'd' )
				? ' ' + countdownUnitsDelimeter + ' ' + hours + ' hours'
				: hours + ' hours';
		}

		if (
			minutesRef.current !== null &&
			typeof minutesRef.current !== 'undefined'
		) {
			minutesRef.current.innerHTML =
				countdownUnits.includes( 'd' ) || countdownUnits.includes( 'h' )
					? ' ' + countdownUnitsDelimeter + ' ' + minutes + ' minutes'
					: minutes + ' minutes';
		}

		if (
			secondsRef.current !== null &&
			typeof secondsRef.current !== 'undefined'
		) {
			secondsRef.current.innerHTML =
				countdownUnits.includes( 'd' ) ||
				countdownUnits.includes( 'h' ) ||
				countdownUnits.includes( 'm' )
					? ' ' + countdownUnitsDelimeter + ' ' + seconds + ' seconds'
					: seconds + ' seconds';
		}
	};

	// YOU DONT WANT THIS VALUE TO Participate until it's 10 chars
	const evaluateDateInput = ( incomingString ) => {
		if ( incomingString.length === 10 ) {
			setAttributes( {
				countdownDate: incomingString,
			} );
		}
	};

	useEffect( () => {
		timer = setInterval( showRemaining, 1000 );
		return () => clearInterval( timer );
	}, [
		countdownDate,
		countdownLabel,
		countdownMessage,
		countdownUnits,
		countdownUnitsDelimeter,
	] );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( textAlign ) => setAttributes( { textAlign } ) }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) } initialOpen={ true }>
					<TextControl
						label="Date"
						value={ countdownDate }
						onChange={ evaluateDateInput }
					/>

					<TextControl
						label="Label"
						value={ countdownLabel }
						onChange={ ( countdownLabel ) =>
							setAttributes( { countdownLabel } )
						}
					/>
					<TextControl
						label="Message"
						value={ countdownMessage }
						onChange={ ( countdownMessage ) =>
							setAttributes( { countdownMessage } )
						}
					/>

					<SelectControl
						label="Units Delimeter"
						value={ countdownUnitsDelimeter }
						options={ [
							{ label: '•', value: '•' },
							{ label: '>', value: '>' },
							{ label: ':', value: ':' },
							{ label: '|', value: '|' },
						] }
						onChange={ ( countdownUnitsDelimeter ) =>
							setAttributes( { countdownUnitsDelimeter } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					id="mxs-countdown"
					ref={ countdownRef }
					className="mxs-countdown"
				>
					{ countdownLabel && (
						<div className="target-date-label">
							{ countdownLabel }
						</div>
					) }
					{ countdownUnits.includes( 'd' ) && (
						<span ref={ daysRef }></span>
					) }
					{ countdownUnits.includes( 'h' ) && (
						<span ref={ hoursRef }></span>
					) }
					{ countdownUnits.includes( 'm' ) && (
						<span ref={ minutesRef }></span>
					) }
					{ countdownUnits.includes( 's' ) && (
						<span ref={ secondsRef }></span>
					) }
				</div>
			</div>
		</>
	);
}
