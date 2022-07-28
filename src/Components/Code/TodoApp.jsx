import React,{useState, useEffect} from 'react'
import '../UI/TodoApp.css'

let btn = "Submit"
let TODO = []
let ID 
const TodoApp = () => {
    const [title, setTitle]  = useState('')
    const [note, setNote]  = useState('')
    const [obj, setObj]  = useState([])
    let text;

    useEffect(() => {
        text = localStorage.getItem("TODO")
        const obj1 = JSON.parse(text)
        setObj(obj1)
        console.log(obj.length)
    })
    

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
            </div>
        </header>

        <div className="body">
            <div className="container">
                <div className="cards">
                    <div className="cards__row">
                        {obj.length === 0 && <h3>Data is Not edded</h3> }
                            
                            { obj.length >= 0 &&

                                obj.map((obj, index) => (
                                    <div className="card" key={index} >
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

                            }
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TodoApp
