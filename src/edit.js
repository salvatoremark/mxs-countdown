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
import {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { DatePicker } from '@wordpress/components';
import { __experimentalHeading as Heading } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		countdownDate,
		countdownHeading,
		countdownHeadingLevel,
		countdownMessage,
		countdownUnits,
		countdownUnitsDelimeter,
		countdownHeadingFontSize,
		countdownFontSize,
		textAlign,
		boxWidth,
	} = attributes;

	const inlineStyles = {
		maxWidth: boxWidth + 'rem',
	};
	const blockProps = useBlockProps( {
		className: `has-text-align-${ textAlign }`,
		style: inlineStyles,
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

	useEffect( () => {
		timer = setInterval( showRemaining, 1000 );
		return () => clearInterval( timer );
	}, [
		countdownDate,
		countdownHeading,
		countdownMessage,
		countdownUnits,
		countdownUnitsDelimeter,
		countdownFontSize,
		countdownHeadingFontSize,
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
				<PanelBody title={ __( 'Target Date' ) } initialOpen={ false }>
					<DatePicker
						currentDate={ countdownDate }
						onChange={ ( countdownDate ) =>
							setAttributes( { countdownDate } )
						}
					/>
				</PanelBody>

				<PanelBody title={ __( 'Settings' ) } initialOpen={ false }>
					<TextControl
						label="Heading"
						value={ countdownHeading }
						onChange={ ( countdownHeading ) =>
							setAttributes( { countdownHeading } )
						}
					/>
					<SelectControl
						label="Heading Level"
						value={ countdownHeadingLevel }
						options={ [
							{ label: 'h1', value: '1' },
							{ label: 'h2', value: '2' },
							{ label: 'h3', value: '3' },
							{ label: 'h4', value: '4' },
							{ label: 'h5', value: '5' },
							{ label: 'h6', value: '6' },
						] }
						onChange={ ( countdownHeadingLevel ) =>
							setAttributes( { countdownHeadingLevel } )
						}
						__nextHasNoMarginBottom
					/>

					<TextControl
						label="Target Date Message"
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

					<TextControl
						label="Heading Size (rem)"
						value={ countdownHeadingFontSize }
						onChange={ ( countdownHeadingFontSize ) =>
							setAttributes( { countdownHeadingFontSize } )
						}
					/>
					<TextControl
						label="Countdown Size (rem)"
						value={ countdownFontSize }
						onChange={ ( countdownFontSize ) =>
							setAttributes( { countdownFontSize } )
						}
					/>
					<RangeControl
						label="Box Width"
						value={ boxWidth }
						onChange={ ( boxWidth ) =>
							setAttributes( { boxWidth } )
						}
						min={ 3 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ countdownHeading && (
					<Heading
						ref={ countdownRef }
						className={ `countdownText countdownHeadingFontSize-${ countdownHeadingFontSize }` }
						level={ countdownHeadingLevel }
						isBlock="false"
						style={ {
							fontSize:
								Number( countdownHeadingFontSize ) + 'rem',
						} }
					>
						{ countdownHeading }
					</Heading>
				) }
				<div
					id="mxs-countdown"
					style={ {
						fontSize: Number( countdownFontSize ) + 'rem',
					} }
				>
					{ countdownUnits.includes( 'd' ) && (
						<span className="days" ref={ daysRef }></span>
					) }
					{ countdownUnits.includes( 'h' ) && (
						<span className="hours" ref={ hoursRef }></span>
					) }
					{ countdownUnits.includes( 'm' ) && (
						<span className="minutes" ref={ minutesRef }></span>
					) }
					{ countdownUnits.includes( 's' ) && (
						<span className="seconds" ref={ secondsRef }></span>
					) }
				</div>
			</div>
		</>
	);
}
