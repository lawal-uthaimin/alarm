
// const Swal = require('sweetalert2')
// const form = document.getElementById('form')
// console.log(form)
// const input = document.querySelector('.userNameForm')
// console.log(input)
// const navName = document.getElementById('userNameDisplay')
// console.log(navName)
const adhanTimeInput = document.getElementById('adhan-time');
const setAdhanButton = document.getElementById('set-adhan-btn');
const stopAdhanButton = document.getElementById('stop-adhan-btn');
const adhanAudio = document.getElementById('adhan-audio');
let isCallActive = false;
let adhanTimeoutId;





// input.addEventListener('submit', e => {
//   e.preventDefault()
//   if (SubmitEvent) {
//     Swal.fire({
//       position: 'top',
//       icon: 'success',
//       title: 'Name set have been sucessfully',
//       showConfirmButton: false,
//       timer: 1500
//     })
//   }
//   const userName = form.value.trim();

//   navName.innerText = `Hello, mr ${userName}`
//   form.style.display = 'none'
// })






// const Logname = (all) => {
//   console.log(all)
// }

// // get  form input
// form.addEventListener('keyup', () => {
//   const alls = form.value.trim();
//   Logname(alls)
//  })




// Check if the user receives a phone call
window.addEventListener('blur', () => {
  if (adhanAudio.paused) return;
  adhanAudio.pause();
  isCallActive = true;
});

console.log('hello everyone')

// Resume the Adhan audio if the phone call ends
window.addEventListener('focus', () => {
  if (!isCallActive) return;
  adhanAudio.play();
  isCallActive = false;
});

setAdhanButton.addEventListener('click', () => {

  const adhanTime = adhanTimeInput.value;
  if (adhanTime) {
    const currentTime = new Date();
    console.log(currentTime)
    const adhanDateTime = new Date(currentTime.toDateString() + ' ' + adhanTime);
    const timeDifference = adhanDateTime - currentTime;

    if (timeDifference > 0) {

      adhanTimeoutId = setTimeout(() => {
        adhanAudio.play();

        stopAdhanButton.style.display = 'inline-block';

}, timeDifference);


//  alert('Adhan alarm set!');
     Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Alarm set have been sucessfully',
        showConfirmButton: false,
        timer: 1500
      })
} else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',

        text: 'Please enter a future time!',

      })

  }
  } else {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid time!',

    })
  }
});

stopAdhanButton.addEventListener('click', () => {
  clearTimeout(adhanTimeoutId);
  adhanAudio.pause();
  adhanAudio.currentTime = 0;
  stopAdhanButton.style.display = 'none';
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Alarm has succesfully stoped',
    showConfirmButton: false,
    timer: 1500
  })

});


adhanAudio.addEventListener('play', () => {
  stopAdhanButton.style.display = 'inline-block';

  if (adhanAudio.play) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Alarm playing'
    })
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Alarm has succesfully stoped',
      showConfirmButton: false,
      timer: 1500
    })
  }
});

adhanAudio.addEventListener('ended', () => {
  adhanAudio.currentTime = 0;
  stopAdhanButton.style.display = 'none';
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Alarm has succesfully stoped',
    showConfirmButton: false,
    timer: 1500
  })
});

adhanAudio.addEventListener('pause', () => {
  stopAdhanButton.style.display = 'none';
});


