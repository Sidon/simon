var idblink, options = ['#green', '#red', '#blue', '#yellow'], sequence=[],
clone = [], wons=0, rounds=0
sounds = {
  "#red": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  "#green": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  "#blue": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  "#yellow": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

function start() {
  $('#cards').click( function(e) { getclick(e) })
  newRound('start')
}

function getclick(e) {
  var click = '#'+e.target.id
  last = clone.shift()
  sounds[click].play()

  if (click !== last) {
    console.log('you lost')
    alert('Wrong! See the serie and try again')
    newRound('lost')
  } else {
    if (clone.length === 0) {
      console.log('you won')
      wons++;
      newRound('win');
    }
  }
}


function resetGame() {
  sequence=[]
}


function newRound(status) {
  var i=0, seq, $seq;
  // Randomize next play
  if (status !== 'lost') {
    sequence.push( options[Math.floor(Math.random()*options.length)] );
  }
  clone = sequence.slice(0);
  interval = setInterval(function() {
    $seq = $(sequence[i])
    if (i < sequence.length) {
      animeButton($seq)
      i++
    } else {
      clearInterval(interval)
    }
  },1000);
  if (status !== 'lost') {
    $('#controls #ranking').text(++rounds+'/'+20)
  }

}

function animeButton(_seq) {
  _seq.addClass("blink")
  console.log('Seq: ',_seq.selector)
  sounds[_seq.selector].play()
  setTimeout(function() {_seq.removeClass("blink")}, 600)
}


 $(document).ready(function() {
    $('#t1').bootstrapToggle('off');
    $('#btrestart').click(start)
 });
