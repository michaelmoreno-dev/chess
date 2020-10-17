let p = document.querySelectorAll('p');
let square = document.querySelectorAll('.square');
p.forEach(piece => {
  piece.addEventListener('dragstart', ()=>{
    piece.classList.add('dragging');
  })
  piece.addEventListener('dragend', ()=>{
    piece.classList.remove('dragging');
  })
})

square.forEach(s => {
  s.addEventListener('dragover', e =>{
    e.preventDefault();
    const dragPiece = document.querySelector('.dragging')
    s.appendChild(dragPiece);
  })
})