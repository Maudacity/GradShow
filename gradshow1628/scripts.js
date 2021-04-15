// d is for design


let gathertownurl = 'https://gather.town/app/WXLJ1kTMsJu7IF4U/disfordesign'
let datetime = 'April 14, 2021 22:05:00' //'April 15, 2021 16:00:00'
let youtubeId =  'Mzw2lhFLtXM' // 'smrGiT0brQ8'
let serverOrigin = 'https://disfordesign.ca/'  // 'http://localhost:8080'

document.querySelector('.gathertownurl').setAttribute('href', gathertownurl)

countdown(datetime, '.counter', '')

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

    if (minutes.toString().length === 1) {
      minutes = '0' + minutes
    }

    if (seconds.toString().length === 1) {
      seconds = '0' + seconds
    }

    //console.log(diff)
    
    if (diff < 1) {
      clearInterval(x)
      document.querySelector('.intro-loop').pause()
      if (diff > -420000) {
        console.log('show is happening now')
        startVideo()
        el.textContent = ''
      } else if (diff > -10800000) {
        console.log('show is over, but gathertown is happening')
        document.body.classList.add('video-ended')
      } else {
        document.body.classList.add('video-ended')
        document.body.classList.add('gathertown-ended')
        console.log('the whole show is done')
      }
    } else {
      if (days > 7) {
        let weeks = Math.ceil(days / 7)
        el.innerHTML = `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`
      } else if (days >= 1) {
        el.innerHTML = `${days} ${days === 1 ? 'day' : 'days'}`
      } else {
        if (hours <= 0 && minutes <= 0)  {
          el.innerHTML = `<span>${seconds}</span>`
        } else if (hours > 0) {
          el.innerHTML = `<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`
        } else {
          el.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`
        }
      }
      
    }
  }, 1000)
}


let vidReady = false
let tooEarly = false
let tooLate = false
let offsetTime = 0
let currentVideoTime = 0
let mute  = document.querySelector('.mute-video')
let agenda = document.querySelector('.agenda')
let intro = document.querySelector('.intro-loop')
//let btn = document.querySelector('.remove-screen')
let tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
let player


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1120',
    width: '630',
    videoId: youtubeId,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'disablekb': 0,
      'modestbranding': 1,
      'mute': 1,
      'rel': 0,
      'enablejsapi': 1,
      'origin': serverOrigin
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  vidReady = true
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

  
  
  //event.target.playVideo()

  //  player.seekTo(offsetTime)
  mute.addEventListener('click', muteVideo)
  videoTime()
  //    removeScreenButton()

  window.addEventListener('resize', debounceHeight)
  iframeHeight()

  document.querySelector('.fullscreen-video').addEventListener('click', playFullscreen)
  
  function removeScreen() {
    document.body.classList.add('playing')
    setTimeout(() => { player.unMute() }, 1000)
    btn.classList.remove('btn-visible')
  }


  function removeScreenButton() {  
    btn.classList.add('btn-visible')
    btn.addEventListener('click', removeScreen)
  }


  function playVideo() {
    player.playVideo()
  }

  function stopVideo() {
    player.stopVideo();
  }


  function muteVideo() {
    if (player.isMuted()) {
      if (intro.muted) {
        intro.muted = false        
      }
      player.unMute()
      //mute.textContent = 'mute'
      mute.classList.remove('muted')
      console.log('unmuted')
    } else {
      if (!intro.muted) {
        intro.muted = true
      }
      player.mute()
      //mute.textContent = 'unmute'
      mute.classList.add('muted')
      console.log('muted')      
    }
  }


  function videoTime() {
    currentVideoTime = Math.floor(player.getCurrentTime())

    if (currentVideoTime <= 0) {
      agenda.textContent = 'Starting soon'
    } else if (currentVideoTime < 30) {
      agenda.textContent = 'Welcome'
    } else if (currentVideoTime < 70) {
      agenda.textContent = 'Land acknowledgement'
    } else if (currentVideoTime < 140) {
      agenda.textContent = 'Message from Jessie Demone'
    } else if (currentVideoTime < 350){
      agenda.textContent = 'Grad highlights'
    } else {
      agenda.innerHTML = `<a href=${gathertownurl} target="_blank">go to gather.town</a>`
    }    
    setTimeout(videoTime, 1000)
  }


  
}



function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    videoEnded()
  }
}




function videoEnded() {
  document.body.classList.add('video-ended')
}


function startVideo() {
  if (vidReady) {
    player.playVideo()
  } else {
    setTimeout(startVideo, 1000)
  }
  document.body.classList.add('hide-intro')
  iframeHeight()
}

function watchVideo() {
  document.body.classList.remove('video-ended')
  document.body.classList.add('hide-intro')
  player.playVideo()
  player.unMute()
  mute.textContent = 'mute'
  iframeHeight()
}

document.querySelector('.watch-video').addEventListener('click', watchVideo)


function iframeHeight() {
  let x = document.querySelector('#player')
  x.style.height = x.offsetWidth / 1.78 + 'px'
}


function debounce(func, wait, immediate) {
  let timeout
  return function() {
    let context = this, args = arguments
    let later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

let debounceHeight = debounce(iframeHeight, 250)


function playFullscreen (){

  let iframe = document.querySelector('#player')
  player.playVideo();//won't work on mobile
  
  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}
