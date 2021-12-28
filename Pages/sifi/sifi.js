
function blink()
{
    document.querySelectorAll(".dot").forEach(function(item)
    {
      item.classList.toggle("active")
    })
}

// var timesRun = 0;
// var interval = setInterval(play(), 1000); 

// function play()
// {
//     timesRun += 1;
//     if(timesRun == 1)
//     {
//         clearInterval(interval);
//         clearInterval(interval + 5000)
//     }
// }

var f = 100

function startBlink()
{
  var start = setInterval(blink, f)
  // if (f == 100)
  //   clearInterval(start)
  // return
}

function stopBlink()
{
  clearInterval(start);
}

// function stopBlink()
// {
//     var start = setInterval(blink, 0)
//     return
// }

//   function stopBlink(start)
// {
//     var stop = clearInterval(start)
// }

// // blink "on" state (black)
// function on()
// {
// 	if (document.getElementById)
// 	  document.getElementById("blink").style.visibility = "visible";
// }

// // blink "off" state (white)
// function off()
// {
// 	if (document.getElementById)
// 	  document.getElementById("blink").style.visibility = "hidden";
// }

// var myButton = document.getElementByID("blinkOnce");

// function playOnce()
// // toggle "on" and "off" states every 300 ms to achieve a blink effect
// // end after 10000 ms (less than ten seconds)
//   for(var i = 0; i < 10000; i += 6000)
//   {
//     setTimeout("off()", i);
//     setTimeout("on()", i + 200);
//   }

// function playTwice()
//   // toggle "on" and "off" states every 200 ms to achieve a blink effect
//   // end after 6000 ms (6 seconds)
//     for(var i = 0; i < 10000; i += 6000)
//     {
//       setTimeout("off()", i);
//       setTimeout("on()", i + 200);
//       setTimeout("off()", i + 400);
//       setTimeout("on()", i + 600);
//     }