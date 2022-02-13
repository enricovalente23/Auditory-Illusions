const soundButton = document.querySelectorAll('.sound-button');
const sounds = document.querySelectorAll('audio');

soundButton.forEach(function (item) {
    item.addEventListener('click', function (e) {
        if(item.classList.contains('active'))
        stopSound(this.getAttribute('data-key'))
        else
        playSound(this.getAttribute('data-key'));
    });
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
            item.pause();
        }else{ return false;}
    })
}

function getSelector(selector, callback){
    document.querySelectorAll(selector)
        .forEach(function (item) {
        callback(item);
    })
}





// PARTE TASTINI

document.getElementById('stopbutton').onclick = function() {
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].currentTime = 0;
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    
    button = document.querySelectorAll(".sound-button");
    button.classList.toggle("active");
};