function navToggle(toggleClass) {
	let toggle = document.querySelector(toggleClass)
	toggle.addEventListener('click', () => {
		document.body.classList.toggle('nav-open')
	})
}

//navToggle('.toggle')

$( ".logo-bg" ).click(function() {
    if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","rotate(45deg)");
    } else {
        $(this).css("transform","" );
    }
});

// Countdown Script//

countdown('April 15, 2021 16:00:00', '.counter', 'go time')


function countdown(datetime, selector, message) {
  let cd = new Date(datetime).getTime()
  let el = document.querySelector(selector)
  let ms = message
  let x = setInterval(function() {
    let now = new Date().getTime()
    let diff = cd - now
    let days = Math.floor(diff / (1000 * 60 * 60 * 24))
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (diff < 0) {
      clearInterval(x)
      el.textContent = ms
    } else {

     /* if (days > 7) {
        let weeks = Math.ceil(days / 7)
        el.textContent = `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`
      } else */ if (days >= 1) {
        //el.textContent = `${days} ${days === 1 ? 'day' : 'days'}  ${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
        el.textContent = `${days}:${hours}:${minutes}`
      } else {
        el.textContent = `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
      }
      
    }
  }, 1000)
}
