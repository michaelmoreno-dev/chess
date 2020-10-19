// PIECE GENERATION
const pieces = {
  pawn: {
    dna: '<p>&#9823</p>',
    worth: 1,
  },
  rook: {
    dna: '<p>&#9820</p>',
    worth: 5,
  },
  knight: {
    dna: '<p>&#9822</p>',
    worth: 3,
  },
  bishop: {
    dna: '<p>&#9821;</p>',
    worth: 3,
  },
  queen: {
    dna: '<p>&#9819</p>',
    worth: 9,
  },
  king: {
    dna: '<p>&#9818</p>',
    worth: 1000,
  },
}

// GENERATE BOARD
let color = 1;
for (let r = 8; r >= 1; r--) {
  $('<div>').addClass(`div divider-${r}`).appendTo('#board')
  color++;
  for (let f = 1; f <= 8; f++) {
    $('<div>').addClass(`square file-${f} rank-${r}`).appendTo(`.divider-${r}`).addClass(color % 2 === 0 ? 'white-square':'black-square');
    color++;
  }
}

for (let i = 1; i <=8; i++) {
  $(pieces.pawn.dna).addClass('white pawn').attr('draggable','true').appendTo(`.file-${i}.rank-2`)
}
$(pieces.rook.dna).addClass('white rook').appendTo(`.file-1.rank-1`)
$(pieces.knight.dna).addClass('white knight').appendTo(`.file-2.rank-1`)
$(pieces.bishop.dna).addClass('white bishop').appendTo(`.file-3.rank-1`)
$(pieces.queen.dna).addClass('white queen').appendTo(`.file-4.rank-1`)
$(pieces.king.dna).addClass('white king').appendTo(`.file-5.rank-1`)
$(pieces.bishop.dna).addClass('white bishop').appendTo(`.file-6.rank-1`)
$(pieces.knight.dna).addClass('white knight').appendTo(`.file-7.rank-1`)
$(pieces.rook.dna).addClass('white rook').appendTo(`.file-8.rank-1`)

for (let i = 1; i <= 8; i++) {
  $(pieces.pawn.dna).addClass('black pawn').attr('draggable', 'true').appendTo(`.file-${i}.rank-7`)
}
$(pieces.rook.dna).addClass('black rook').appendTo(`.file-1.rank-8`)
$(pieces.knight.dna).addClass('black knight').appendTo(`.file-2.rank-8`)
$(pieces.bishop.dna).addClass('black bishop').appendTo(`.file-6.rank-8`)
$(pieces.king.dna).addClass('black king').appendTo(`.file-4.rank-8`)
$(pieces.queen.dna).addClass('black queen').appendTo(`.file-5.rank-8`)
$(pieces.bishop.dna).addClass('black bishop').appendTo(`.file-3.rank-8`)
$(pieces.knight.dna).addClass('black knight').appendTo(`.file-7.rank-8`)
$(pieces.rook.dna).addClass('black rook').appendTo(`.file-8.rank-8`)