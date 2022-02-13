
const soundButton = document.querySelectorAll('.sound-button');
const sounds = document.querySelectorAll('audio');
const commands = document.querySelectorAll('button');

soundButton.forEach(function (item) {
    item.addEventListener('click', function (e) {
        if(item)
        playSound(this.getAttribute('data-key'));
    });
})

window.addEventListener('keydown', function (e) {
    playSound(e.keyCode);
})

function playSound(keycode) {
    sounds.forEach(function (item) {
        const soundKeyCode = item.getAttribute('data-key');
        if (parseInt(keycode) === parseInt(soundKeyCode)) {
            getSelector('.sound-button', item => {
                const $this = item.getAttribute('data-key');
                if (parseInt($this) === parseInt(keycode)) {
                    item.classList.add('active');
                }
            })
            item.currentTime = 0;
            item.play();
        }else{ return false;}
    })
}

function stopSound(keycode) {
    sounds.forEach(function (item) {
        const soundKeyCode = item.getAttribute('data-key');
        if (parseInt(keycode) === parseInt(soundKeyCode)) {
            getSelector('.sound-button', item => {
                const $this = item.getAttribute('data-key');
                if (parseInt($this) === parseInt(keycode)) {
                    item.classList.remove('active');
                }
            })
            item.currentTime = 0;
            item.stop();
        }else{ return false;}
    })
}

function getSelector(selector, callback){
    document.querySelectorAll(selector)
        .forEach(function (item) {
        callback(item);
    })
}


function keyClicked(event) {
    clickedKey = event.target;
    dot = clickedKey.children[0];
    soundButton.classList.add('active');
  }
  
  allKeys = document.querySelectorAll(".soundButton");
  
  function assignClick(item) {
    item.onclick = keyClicked;
  }
  
  allKeys.forEach(assignClick);
  
//   on.onclick = function () {
//     soundButton = document.querySelectorAll(".soundbutton")
//     dots.forEach(function (item) {
//       item.classList.add('active')
//     })
//   }
  
//   off.onclick = function () {
//     dots = document.querySelectorAll(".soundbutton")
//     dots.forEach(function (item) {
//       item.classList.remove("active")
//     })
//   }
  