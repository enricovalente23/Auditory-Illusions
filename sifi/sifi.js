
function blink()
{
    document.querySelectorAll(".dot").forEach(function(item)
    {
      item.classList.toggle("active")
    })
  }

var timesRun = 0;
var interval = setInterval(uwu(), 200); 

function uwu()
{
    timesRun += 1;
    if(timesRun === 1)
    {
        clearInterval(interval);
    }
}


function startBlink()
{
var start = setInterval(blink, 100)
return
}
  
//   function stopBlink(start)
// {
//     var stop = clearInterval(start)
// }

// function toDo()
// {
//     startBlink();
//     stopBlink();
// }

function startBlink2()
{
    var start = setInterval(blink, 100)
}