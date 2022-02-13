const soundButton = document.querySelectorAll('.sound-button');
const sounds = document.querySelectorAll('audio');
const commands = document.querySelectorAll('button');

soundButton.forEach(function (item) {
    item.addEventListener('click', function (e) {
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

function getSelector(selector, callback){
    document.querySelectorAll(selector)
        .forEach(function (item) {
        callback(item);
    })
}