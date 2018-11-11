import React from 'react';

const ToDoForm=(props)=>
{
    return (
        <section>
        <h1>ADD Catagaries</h1>
        <form onSubmit={props.addTask}> 
            <input type="text" value={props.currentTask}
            onChange={props.updateTask}/>
            <button type="submit">Submit</button>
            </form>
        </section>
    )
}
export default ToDoForm;