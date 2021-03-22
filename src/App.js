import React from 'react'
import './App.css';

function App() {
  const [ boards, setBoards]= React.useState([
    {id:1 ,title: 'Сделать', items:[{id:1,title:'Решить задачу'},{id:2,title:'Уборку'},{id:3,title:'Еду собой'}] },
    {id:2 ,title: 'Найти', items:[{id:4,title:'Материалы для учебы'},{id:5,title:'Квартиру на сьем'},{id:6,title:'Старый шнур'}] },
    {id:3 ,title: 'Сделано', items:[{id:7,title:'Пойти погулять'},{id:8,title:'Научиться drag and drop'},{id:9,title:'Посмотреть код'}] }
  ])
    const [currentBoard,setCurrentBoard]=React.useState()
    const [currentItem,setCurrentItem]=React.useState()
    function dragOverHandler(e) {
       e.preventDefault()
        if(e.target.className=='item'){
            e.target.style.boxShadow= '0 2px 3px red'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow= 'none'
    }

    function dragStartHandler(e,board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow= 'none'
    }

    function dropHandler(e, board, item) {
        e.preventDefault()

        const currentIndex=currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex,1)
        const dropIndex=board.items.indexOf(item)
        board.items.splice(dropIndex+1,0,currentItem)
        setBoards(boards.map(b=>{
            if(b.id===board.id){
            return board
            }
            if(b.id===currentBoard.id){
             return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow='none'

    }

    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex=currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex,1)

        setBoards(boards.map(b=>{
            if(b.id===board.id){
                return board
            }
            if(b.id===currentBoard.id){
                return currentBoard
            }
            return b
        }))
        // e.target.style.boxShadow='none'

    }

    function pushTask() {
   //Закидывает в state ? в столбик сделать
    }

    return (
      <div className="App">
          <div className="newTask">
              <input type="text" placeholder="Введите задачу"/>
              <button className="btn-task" onClick={pushTask}>В список</button>

          </div>
          { boards.map(board=>
              <div
                  onDragOver={(e)=>dragOverHandler(e)}
                  onDrop={(e)=>dropCardHandler(e,board)}
                  className="board">
                  <div className="board__title">{board.title}</div>
                  {
                      board.items.map(item=>
                      <div
                        onDragOver={(e)=>dragOverHandler(e)}
                        onDragLeave={e=>dragLeaveHandler(e)}
                        onDragStart={(e)=>dragStartHandler(e,board, item)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                        onDrop={(e)=>dropHandler(e,board,item)}
                      className="item"
                      draggable={true}
                      >{item.title}</div>
                      )
                  }
              </div>


          )}

      </div>
  );
}

export default App;
