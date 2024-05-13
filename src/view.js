document.addEventListener( 'DOMContentLoaded', () => {
	console.log( 'DOM fully loaded and parsed' );

	( function () {
		console.log( 'Now loading the functions' );

		const countdownDate = '';
		const countdownMessage = '';
		const countdownId = 'mxs-countdown';

		function CountdownTimer() {
			console.log( 'inside countdowntimer' );
			let timer;

			const end = new Date( countdownDate );
			const _second = 1000;
			const _minute = _second * 60;
			const _hour = _minute * 60;
			const _day = _hour * 24;

			function showRemaining() {
				console.log( 'inside showRemaining' );

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

				const d = document.querySelector( `.day` );
				const h = document.querySelector( `.hour` );
				const m = document.querySelector( `.min` );
				const s = document.querySelector( `.sec` );

				if ( d ) d.innerHTML = days;
				if ( h ) h.innerHTML = hours;
				if ( m ) m.innerHTML = minutes;
				if ( s ) s.innerHTML = seconds;
			}

			timer = setInterval( showRemaining, 1000 );
		}
		CountdownTimer();
	} )();
} );
