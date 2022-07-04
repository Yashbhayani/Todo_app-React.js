import React,{useState} from 'react'
import '../UI/TodoApp.css'

let btn = "Submit"
let TODO = []
let text
let obj
let ID 
const TodoApp = () => {
    let View
    const [title, setTitle]  = useState('')
    const [note, setNote]  = useState('')
    text = localStorage.getItem("TODO")
    obj = JSON.parse(text)
   
    const SHOW = () =>{
        if(obj !== undefined && obj !== null && obj !== "" && obj.length !== 0){
            //console.log(obj)
                View = obj.map((obj, index) => (
                    <div className="card">
                        <div className="card__header">
                            <h3 className="card__title">{obj.title}</h3>
                                <div className="card__remove-icon">
                                <span className="material-icons-outlined" onClick={() => handleDelete(index)}> clear </span>
                            </div>
                        </div>
                        <div className="card__body">
                            <h5 className="card__text">{obj.note}</h5>
                        </div>
                        <div className="card__dropdown">
                            <div className="card__dropdown__toggler">
                                <span className="material-icons-outlined" onClick={() => handleEdit(index)}>edit</span>
                            </div>
                        </div>
                    </div>
            ))
        }else{
            View = "Data is Not edded"
        }
    }
    
    SHOW()
    
    const handleSubmitData = (e) =>{
        e.preventDefault()
        TODO = JSON.parse(localStorage.getItem("TODO"))?JSON.parse(localStorage.getItem("TODO")):[]

        if(btn === "Submit" ){
            TODO.push({
                title,
                note
            })
            localStorage.setItem("TODO",JSON.stringify(TODO));
            setTitle('')
            setNote('')
        }else{
            obj[ID].title = title
            obj[ID].note = note
            localStorage.setItem("TODO",JSON.stringify(obj))
            ID = undefined 
            btn = "Submit"
            setTitle('')
            setNote('')
        }

    }

    const handleEdit = (id) =>{
        ID  = id
        setTitle(obj[ID].title)
        setNote(obj[ID].note)
        btn = "Update"
    }

    const handleDelete = (id) =>{
        obj.splice(id,1)
        localStorage.setItem("TODO",JSON.stringify(obj))
        setTitle('')
        setNote('')
        SHOW()
    }

    const handelSearch = (event) =>{
        if(event.target.value === ""){
            text = localStorage.getItem("TODO")
            obj = JSON.parse(text)
            console.log(obj)
            SHOW()
        }else{
            console.log(event.target.value)
            obj =  obj.filter((search) => {
                return search.title.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase()) || search.note.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase()) 
             })

             console.log(obj)
             SHOW()
        }
    }

  return (
    <div>

        <header className="header">
            <div className="header__inner container">
                <h1 className="header__title">Todo List</h1>
                <form className="todo-form" onSubmit={handleSubmitData}>
                    <div className="todo-form__group">
                        <input
                        type="text"
                        className="todo-form__input"
                        value={title}
                        placeholder="Todo Title..."
                        onChange={(e) => setTitle(e.target.value)}
                        required/>
                    </div>

                    <div className="todo-form__group">
                        <textarea className="todo-form__textarea"
                        value={note} placeholder="Todo Description..."
                        onChange={(e) => setNote(e.target.value)} required></textarea>
                    </div>
                        <button className="btn btn--primary">{btn}</button>
                </form>

                <nav classNameName="navbar">
                    <input type="text" className="todo-form__input" onChange={handelSearch} placeholder="Search here"/>
                </nav>
            </div>
        </header>

        <div className="body">
            <div className="container">
                <div className="cards">
                    <div className="cards__row">
                            { View }
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TodoApp