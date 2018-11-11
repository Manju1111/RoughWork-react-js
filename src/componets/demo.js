import React from 'react';
//import  ReactDOM from 'react-dom';
/*
class ToDoItem extends React.Component{  //export default for class directly without reactComponent  and run
    render()
    {
        return(
       <section>
           {this.props.detail}
           </section> 
        )
    }
}
*/


// StateLess Logical Component
const ToDoItem=(props)=>{
    return (
        <section>
        {props.detail}
        </section> 
    )
}

export default ToDoItem;
