import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalHeading as Heading } from '@wordpress/components';

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
	const inlineStyles = {
		maxWidth: boxWidth + 'rem',
	};
	const blockProps = useBlockProps.save( {
		className: `has-text-align-${ textAlign }`,
		style: inlineStyles,
	} );

	return (
		<>
			<div { ...blockProps }>
				<h6
					style={ {
						fontSize: Number( countdownHeadingFontSize ) + 'rem',
					} }
				>
					{ countdownHeading }
				</h6>
				<div
					id="mxs-countdown"
					style={ {
						fontSize: Number( countdownFontSize ) + 'rem',
					} }
				></div>
				<span id="days"></span>
				<span id="hours"></span>
				<span id="minutes"></span>
				<span id="seconds"></span>
			</div>

			<input id="countdownDate" type="hidden" value={ countdownDate } />
			<input
				id="countdownMessage"
				type="hidden"
				value={ countdownMessage }
			/>
		</>
	);
}
