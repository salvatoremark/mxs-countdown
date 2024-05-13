document.addEventListener( 'DOMContentLoaded', () => {
	( function () {
		const countdownId = 'mxs-countdown';
		const countdownDate =
			document.getElementById( 'countdownDate' ).innerHTML;
		const countdownMessage =
			document.getElementById( 'countdownMessage' ).innerHTML;

		function CountdownTimer() {
			let timer;

			const end = new Date( countdownDate );
			const _second = 1000;
			const _minute = _second * 60;
			const _hour = _minute * 60;
			const _day = _hour * 24;

			function showRemaining() {
				// console.log( 'inside showRemaining' );

				const now = new Date();
				const distance = end - now;
				if ( distance < 0 ) {
					clearInterval( timer );
					console.log( 'Timer is complete, so output message' );

					document.getElementById( countdownId ).innerHTML =
						countdownMessage;
					return;
				}

				const days = Math.floor( distance / _day );
				const hours = Math.floor( ( distance % _day ) / _hour );
				const minutes = Math.floor( ( distance % _hour ) / _minute );
				const seconds = Math.floor( ( distance % _minute ) / _second );

				const d = ( document.getElementById( 'days' ).innerHTML =
					days + ' days ' );
				const h = ( document.getElementById( 'hours' ).innerHTML =
					hours + ' hours ' );
				const m = ( document.getElementById( 'minutes' ).innerHTML =
					minutes + ' minutes ' );
				const s = ( document.getElementById( 'seconds' ).innerHTML =
					seconds + ' seconds' );
			}

			timer = setInterval( showRemaining, 1000 );
		}
		CountdownTimer();
	} )();
} );
