
function movement(current, validMoves, limit, horizontal, vertical) {
  for (let i = 1, h = horizontal, v = vertical; i <= limit; i++, h+=horizontal, v+=vertical) {
    let $query = $(`.file-${current.$file + h}.rank-${current.$rank + v}`);
    
    if ($query.length < 1) {
      break;
    }
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

function checkMoves(current, validMoves) {
  if (current.$piece === 'pawn') {
    movement(current, validMoves, current.$rank === 2 || current.$rank === 7 ? 2:1, 0, current.$color === 'white' ? 1:-1);
  }
}