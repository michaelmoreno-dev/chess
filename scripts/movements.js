
function movement(current, validMoves, limit, horizontal, vertical, modifier) {
  for (let i = 1, h = horizontal, v = vertical; i <= limit; i++, h+=horizontal, v+=vertical) {
    let $query = $(`.file-${current.$file + h}.rank-${current.$rank + v}`);

    if ($query.length < 1) {
      break;
    }
    if (modifier === 'pawn') {
      let q = 1;
      for (let n = 0; n <= 1; n++) {
        let $cornerQuery = $(`.file-${current.$file + q}.rank-${current.$rank + v}`);
        q *= -1
        if ($query.children().length < 1) {
          $query.addClass('available')
          validMoves.push([parseInt($query.attr('class').split(' ')[1].split('-')[1]), parseInt($query.attr('class').split(' ')[2].split('-')[1])])
        }
        if ($cornerQuery.children().length > 0 && $cornerQuery.children().attr('class').split(' ')[0] !== current.$color) {
          $cornerQuery.addClass('enemy')
          validMoves.push([parseInt($cornerQuery.attr('class').split(' ')[1].split('-')[1]), parseInt($cornerQuery.attr('class').split(' ')[2].split('-')[1])])

        }
      }
      
    }
    else {
      if ($query.children().length > 0) {
        if ($query.children().attr('class').split(' ')[0] === current.$color) {
          break;
        }
        $query.addClass('enemy')
        console.log(validMoves[0]);
        i = limit;
      } 
      else {
        $query.addClass('available')
      }
      validMoves.push([parseInt($query.attr('class').split(' ')[1].split('-')[1]), parseInt($query.attr('class').split(' ')[2].split('-')[1])])
    }
  }
}

function checkMoves(current, validMoves) {
  if (current.$piece === 'pawn') {
    movement(current, validMoves, current.$rank === 2 || current.$rank === 7 ? 2:1, 0, current.$color === 'white' ? 1:-1, 'pawn');
  }
  if (current.$piece === 'rook') {
    movement(current, validMoves, 8, 0, 1);
    movement(current, validMoves, 8, 1, 0);
    movement(current, validMoves, 8, 0, -1);
    movement(current, validMoves, 8, -1, 0);
  }
  if (current.$piece === 'bishop') {
    movement(current, validMoves, 8, 1, 1);
    movement(current, validMoves, 8, 1, -1);
    movement(current, validMoves, 8, -1, -1);
    movement(current, validMoves, 8, -1, 1);
  }
  if (current.$piece === 'knight') {
    movement(current, validMoves, 1, 1, 2);
    movement(current, validMoves, 1, 2, 1);
    movement(current, validMoves, 1, 2, -1);
    movement(current, validMoves, 1, 1, -2);
    movement(current, validMoves, 1, -1, -2);
    movement(current, validMoves, 1, -2, -1);
    movement(current, validMoves, 1, -2, 1);
    movement(current, validMoves, 1, -1, 2);
  }
  if (current.$piece === 'queen') {
    movement(current, validMoves, 8, 1, 1);
    movement(current, validMoves, 8, 1, -1);
    movement(current, validMoves, 8, -1, -1);
    movement(current, validMoves, 8, -1, 1);
    movement(current, validMoves, 8, 0, 1);
    movement(current, validMoves, 8, 1, 0);
    movement(current, validMoves, 8, 0, -1);
    movement(current, validMoves, 8, -1, 0);
  }
  if (current.$piece === 'king') {
    movement(current, validMoves, 1, 0, 1);
    movement(current, validMoves, 1, 1, 1);
    movement(current, validMoves, 1, 1, 0);
    movement(current, validMoves, 1, 1, -1);
    movement(current, validMoves, 1, 0, -1);
    movement(current, validMoves, 1, -1, -1);
    movement(current, validMoves, 1, -1, 0);
    movement(current, validMoves, 1, -1, 1);
  }
}