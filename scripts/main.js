// let piece = document.querySelectorAll('p');
// let square = document.querySelectorAll('.square');
// piece.forEach(p => {
//   p.addEventListener('dragstart', ()=>{
//     p.classList.add('dragging');

//     square.forEach(s => {
//       s.addEventListener('dragover',()=>{
//         console.log('work');
//         p.addEventListener('dragend', ()=>{
//           console.log('end');
//           s.appendChild(p)
//           p.classList.remove('dragging');
//         }) 
//       })
//     })
//   })
// })

let check = false;
function inCheck(color) {
  let $king = $(`.${color}.king`);
  let $kingFile = parseInt($king.parent().attr('class').split(' ')[1].split('-')[1]);
  let $kingRank = parseInt($king.parent().attr('class').split(' ')[2].split('-')[1]);
  let $kingColor = $king.attr('class').split(' ')[0];

  function searchChecks(enemy, limit, horizontal, vertical) {
    for (let i = 1, h = horizontal, v = vertical; i <= limit; i++, h += horizontal, v += vertical) {
      let $query = $(`.file-${$kingFile + h}.rank-${$kingRank + v}`);
      // IF QUERY IS OFF THE BOARD
      if ($query.length < 1) {
        break;
      }
      if ($query.children().length > 0) {
        if ($query.children().eq(0).attr('class').split(' ')[0] !== $kingColor && $query.children().eq(0).attr('class').split(' ')[1] === enemy) {
          $king.parent().addClass('check');
          check = true;
          console.log('check')
        }
        break;
      }
    }
  }
  searchChecks('pawn',1,1,1)
  searchChecks('pawn',1,-1,1)
  searchChecks('bishop',8,1,1)
  searchChecks('bishop',8,1,-1)
  searchChecks('bishop',8,-1,-1)
  searchChecks('bishop',8,-1,1)
  searchChecks('rook',8,0,1)
  searchChecks('rook',8,1,0)
  searchChecks('rook',8,0,-1)
  searchChecks('rook',8,-1,0);
  searchChecks('knight',1,1,2);
  searchChecks('knight',1,2,1);
  searchChecks('knight',1,2,-1);
  searchChecks('knight',1,1,-2);
  searchChecks('knight',1,-1,-2);
  searchChecks('knight',1,-2,-1);
  searchChecks('knight',1,-2,1);
  searchChecks('knight',1,-1,2);
}

let turn = true;

function select() {
  console.log(turn);
  $('.square p').on('click', function(){
    // console.log('First click');
    $('.square p').off('click');
    let $this = $(this);
    let current = {
      $selection: $this,
      $color: $this.attr('class').split(' ')[0],
      $piece: $this.attr('class').split(' ')[1],
      $position: '.' + $this.parent().attr('class').split(' ')[1] + '.' + $this.parent().attr('class').split(' ')[2],
      $file: parseInt($this.parent().attr('class').split(' ')[1].split('-')[1]),
      $rank: parseInt($this.parent().attr('class').split(' ')[2].split('-')[1]),
    }
    // console.log(current.$color);
    // console.log(current.$piece);
    // console.log(current.$position);
    // console.log(current.$file);
    // console.log(current.$rank);

    // CHECK IF IT'S PLAYERS TURN
    if ((turn === true && current.$color === 'white') || (turn === false && current.$color === 'black')) {
      
      let validMoves = [];
      
      checkMoves(current,validMoves);
      setTimeout(function(){
        $('.square').on('click', function(){
          // console.log('Second click');
          $('.square').off('click');
          let $this = $(this);
          let target = {
            $selection: $this.children().eq(0),
            $position: '.' + $this.attr('class').split(' ')[1] + '.' + $this.attr('class').split(' ')[2],
            $file: parseInt($this.attr('class').split(' ')[1].split('-')[1]),
            $rank: parseInt($this.attr('class').split(' ')[2].split('-')[1]),
          }
  
          // CHECK IF MOVE IS VALID
          for (let i = 0; i < validMoves.length; i++) {
            if (`${target.$file},${target.$rank}` == validMoves[i]) {
              let tmp = current.$position
              current.$selection.appendTo($(`${target.$position}`));
              inCheck('white');
              inCheck('black');
              // CHECK IF MOVE RESULTS IN KING CHECK
              if (check === true && (turn == true && current.$color === 'white')) {
                console.log('true');
                console.log(tmp);
                current.$selection.appendTo($(tmp))
                console.log('That would put you in check!');
                check = false;
              }
              else {
                turn = !turn;
                current.$selection.appendTo($(`${target.$position}`));
                target.$selection.appendTo(current.$color == 'white' ? '#black':'#white')
                target.$selection.appendTo(current.$color == 'white' ? '#black' : '#white')
              }
              break;
            }
          }
          // RESET SQUARE STYLINGS
          $(`.square`).removeClass('available').removeClass('enemy');
          select();
        })
      }, 1)
    }
    else {
      select();
    }
  })
}
select();

function flipBoard() {
  $('#flip-board').on('click',function(){
    $('#board').toggleClass('flip')
    // $('.container').toggleClass('flip')
  })
  $('#cycle-themes').on('click', function(){
    $('.black-square').toggleClass('black-square-1')
  })
}
flipBoard();