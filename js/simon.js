var idblink, options = ['#green', '#red', '#blue', '#yellow'], sequence=[],
clone = [], wons=0, rounds=0, strict=false;
sounds = {
  "#red": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  "#green": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  "#blue": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  "#yellow": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

function init() {
  $('#cards').click( function(e) { getclick(e) })
  $('#btrestart').unbind();
  $('#btrestart').click( function() {resetGame(); newRound('start')})
  resetGame()
  newRound('start')
}

function getclick(e) {
  var click = '#'+e.target.id
  last = clone.shift()
  sounds[click].play()
  if (click !== last) {
    console.log('wrong')
    if (strict==false) {
      alert('Wrong! See the serie and try again')
      newRound('lostNS')
    } else {
      alert('Wrong! Strict mode, begin new sequence')
      sequence=[];
      newRound('lostS')
    }
  } else {
    if (clone.length === 0) {
      wons++;
      if (wons>=20) {
        alert('Game Over, You Won!');
        location.reload();
      }
      newRound('win');
    }
  }
}

function resetGame() {
  $('#controls #btrestart').text('Restart')
  sequence=[];
  rounds=0;
  clone=[];
}

function newRound(status) {
  var i=0, seq, $seq;
  // Randomize next play
  if (status !== 'lostNS') {
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
    $('#controls #rounds').text(++rounds+'/'+20)
    $('#controls #ranking').text(wons+'/'+rounds)
  }
}

function animeButton(_seq) {
  _seq.addClass("blink")
  sounds[_seq.selector].play()
  setTimeout(function() {_seq.removeClass("blink")}, 600)
}

$(document).ready(function() {
    $('#t1').bootstrapToggle('off');
    $('#t1').change(function() {strict=(strict==true ? false : true)})
    $('#btrestart').click( function() {init()})
 });
