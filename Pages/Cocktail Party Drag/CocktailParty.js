const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}





















document.addEventListener('DOMContentLoaded', init);
        const SOUNDS = {
            'clear-throat':null,
            'doorbell':null,
            'static':null
        };
        let allowSound = true;
        
        function init(){
            let p1 = document.querySelector('p[data-file]');
            let p2 = document.querySelector('p:nth-of-type(2)');
            let p3 = document.querySelector('p:last-of-type');
            p1.addEventListener('click', play);
            p2.addEventListener('mouseover', play);
            p3.addEventListener('dblclick', play);
        }
        
        function play(ev){
            let p = ev.currentTarget;
            ev.preventDefault();
            
            let fn = p.getAttribute('data-file');
            let src = './media/' + fn + '.mp3';
            if( SOUNDS[fn] ){
                SOUNDS[fn].pause();
                SOUNDS[fn] = null;
            }
            console.log(src);
            
            //let audio = document.getElementById("a");
            let audio = document.createElement('audio');
            //audio.removeAttribute('controls');
            //document.body.appendChild(audio);
            audio.src = src;
            audio.volume = 0.2;
            //change the starting position in the file
            //audio.currentTime = 0.8;
            if(allowSound){
                SOUNDS[fn] = audio;
                audio.setAttribute('data-file', fn);
                audio.play();
            }
            
            
            /**********************
            Event list for <audio> and <video>
            https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
            ***********************/
            //listen for the event that ends sound
            audio.addEventListener('playing', goAudio);
            audio.addEventListener('ended', doneAudio);
        }
        
        function goAudio(ev){
            console.log(ev.target.src, 'has started playing');
        }
        
        function doneAudio(ev){
            console.log(ev.target.src, 'has finished playing');
            let fn = ev.target.getAttribute('data-file');
            SOUNDS[fn] = null;
        }