import { useBlockProps } from '@wordpress/block-editor';

// countdownFontSize

export default function Save( {
	attributes: {
		countdownDate,
		countdownHeading,
		countdownHeadingLevel,
		countdownMessage,
		countdownUnitsDelimeter,
		countdownHeadingFontSize,
		countdownFontSize,
		textAlign,
		boxWidth,
	},
	setAttributes,
} ) {
	return (
		<>
			<h1>Countdown to the New Year</h1>
			<div
				id="mxs-countdown"
				style={ {
					fontSize: Number( '2' ) + 'rem',
				} }
			></div>
			<span className="days">days</span>
			<span className="hours">hours</span>
			<span className="minutes">minutes</span>
			<span className="seconds">seconds</span>
		</>
	);
}
