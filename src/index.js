import React from 'react';
import  ReactDOM from 'react-dom';
import './index.css'
import ToDoItem from './componets/demo';
import ToDoForm from './componets/ToDoForm';
import * as PT from 'prop-types';
import $ from 'jquery';


class Hello extends React.Component{
    render()
    {
        return(
            <h1>HELLO EveryBody</h1>
        )

    }
}

class World  extends React.Component
{
    render()
    {
        return(
<h1>Planet Earth</h1>
        )
    }
}

class HelloWorld extends React.Component
{
    render()
    {
        return(
            <section className="demo">
                <Hello/>
                <br/>
                <World/>
            
              </section>
        )
    }
}
ReactDOM.render(<Hello/>,document.getElementById('abc')); 
ReactDOM.render(<World/>,document.getElementById('abd'));

ReactDOM.render(<HelloWorld/>,document.getElementById('hw'));



class JSXDemo extends React.Component
{
    name;
    constructor()
    {
        super();
        this.name="Suraja";
    }
    greet()
    {
        return "GOOD EVENING !";
    }
    render()
    {
        return(
            <div>
            <section>
                <h1>JSX DEMO</h1>
            </section>
            <section>
               
            UserName:<input type="text"/>
                Password:<input type="password"/>

                <hr/>
                {2+5}<br/>
                {this.greet()}<br/><br/>
                Your Good Name :{this.name}
             </section>
             </div>
        )
    }
}

class ToDoList extends React.Component
{
    constructor()
    {
        super();
        this.state={
            names:['Manju','Raju','Shuhas','Chidu','Parasu']
        }
    }

    render()
    {
        return(
            <ul>
              {
             this.state.names.map(function(RefArr){
                return <ToDoItem detail={RefArr} key={RefArr}/>
             })
         }
    </ul>
        )
    }
}



class EventDemo extends React.Component
{
    render()
    {
        return(
            <div>
    <h2>Event Demo</h2>
    <p onClick={this.abc}><button>click here</button></p>
            </div>
    )
    }

    abc()
    {
        alert("You clicked on the button ")
    }
}


class StateEventDemo extends React.Component
{
   constructor()
   {
       super();
       this.changeStatus=this.changeStatus.bind(this);
       this.updateTask=this.updateTask.bind(this);
       this.addTask=this.addTask.bind(this);
       this.deleteTask=this.deleteTask.bind(this);
       this.editTask=this.editTask.bind(this);

       this.state={
           tasks:[
               {
                   name:'Movi',
                   completed:true
               },
               {
                name:'Sports',
                completed:false
               },
               {
                name:'food',
                completed:true
            }],
           currentTask:''
       }
   }
   
   editTask(index,newValue)
   {
    //console.log(index,newValue)
    var tasks=this.state.tasks;
    var task=tasks[index];
    task['name']=newValue;
    this.setState({
        tasks
    })
   }
    deleteTask(index)
    {
        console.log(index);
        var tasks=this.state.tasks;
        tasks.splice(index,1);
        this.setState({
            tasks
        })
    }

   addTask(catg)
   {
       catg.preventDefault();  //inbuilt for to avoid reloading when we add new data
       let tasks=this.state.tasks;
       let currentTask=this.state.currentTask;
       tasks.push({
           name:currentTask,
           completed:false    //we made it false/true
       })

    this.setState(  //very imoprtant inbuilt methro allows to adds changing values
        {
            tasks
        }
    )
   }

   updateTask(newValue)
   {
    this.setState({
        currentTask:newValue.target.value //inbuilts
    })
   }

   changeStatus(index)
   {
    //console.log(this.state.tasks[index]);
    var tasks=this.state.tasks;
    var task=tasks[index];
    task.completed=!task.completed;  // to make revers color which clicked true to false and viseversa
    
    this.setState({     //setState is inbuilt function to show what changed and it is called from React.Component
       // tasks:tasks
    })
   }


   render(){
       return(
           <section>
               <ToDoForm 
               currentTask={this.state.currentTask}
               updateTask={this.updateTask}
               addTask={this.addTask} 
               editTask={this.editTask}/>
               
        <ul>
        {this.state.tasks.map((task,index)=>{       //map has overloaded ...can pass 2nd arg to get index
          return <Todoitem detail={task} 
          index={index}
           clickHandler={this.changeStatus}
            key={index}//clickHandler is user defind and invokes changestatus methed
            editTask={this.editTask}
            deleteTask={this.deleteTask}/> 
        })
        }
    </ul></section>
       )
    }
}


class Todoitem extends React.Component{

    constructor(props)
    {
        super(props)
        {
            this.state={
                isEditing:true
            }
        }
        this.renderForm=this.renderForm.bind(this);
        this.renderItem=this.renderItem.bind(this);
        this.toggelSwitch=this.toggelSwitch.bind(this);
        this.updateItem=this.updateItem.bind(this);
    }

    updateItem(evt)
    {
        evt.preventDefault();
        console.log(this.input.value);
        this.props.editTask(this.props.index, this.input.value);
        this.toggelSwitch();
    }

    toggelSwitch()
    {
        const {isEditing}=this.state;
        this.setState({
            isEditing:!this.state.isEditing
        })
    }

    renderForm()
    {
        return ( <form onSubmit={this.updateItem}>
            <input type="text" ref={(value)=>{
                this.input=value
            }} defaultValue={this.props.detail.name}/>
        <button type="submit">Upadate Item</button>
        </form>)
    }
    renderItem()
    {
        return(
            <li onClick={()=>
                {this.props.clickHandler(this.props.index)}} className={this.props.detail.completed ?'abc' : ''}>
                    {this.props.detail.name}
                    <button onClick={(evt)=>{
                        evt.stopPropagation(); //every child elemnt propegate to parent element ...to stop it by like this
                        this.props.deleteTask(this.props.index)
                    }}>Delete</button>

                     <button onClick={(evt)=>{
                        evt.stopPropagation(); //every child elemnt propegate to parent element ...to stop it by like this
                        this.toggelSwitch()
                    }}>Edit Item</button>
              </li> 
          )
    }
    render()
    {
            //const isEditing=this.state.isEditing;
            const {isEditing}=this.state;
            return(
            <section>{
            isEditing ? this.renderForm() : this.renderItem()

            }</section>
        )
    }
}

Todoitem.propTypes={
    detail :PT.object.isRequired,
    index :PT.number.isRequired,
    clickHandler:PT.func.isRequired,
    deleteTask:PT.func.isRequired,
    editTask:PT.func.isRequired
}

ReactDOM.render(<JSXDemo/>,document.getElementById('jsx'));
ReactDOM.render(<ToDoList/>,document.getElementById('sp'));
ReactDOM.render(<EventDemo/>,document.getElementById('ed'));
ReactDOM.render(<StateEventDemo/>,document.getElementById('sed'));




class Practice extends React.Component
{

    constructor()
    {
        super();
        this.fun=this.fun.bind(this);
        this.manju={
            array:[
                {
                    id:123,
                    disignation:"devloper"
                 },
                 {
                    id:321,
                    disignation:"Tester"
                 },
                 {
                    id:258,
                    disignation:"Data_Analist"
                 }
                ]
        }
       
    }

    fun()
    {
        alert('running');
    }


    render(){
        return(
            <section>
                <EventsB fun={this.fun}/>
            <ul>
            {this.manju.array.map((people,index)=>{
                return <Fruit print={people}index={index} key={people.id}/>
            })}
             </ul>  
             </section> 
        )
    }
}

class Fruit extends React.Component
{
    render(){
        return(
        <li><input type="checkbox"/>
    {this.props.print.disignation}
    {this.props.check}
    </li>
   )}
}


class EventsB extends React.Component
{
    render()
    {
        return(
            <section>
                <button onClick={this.props.fun}>creat event</button>
            </section>
            )
    }
}

ReactDOM.render(<Practice/>,document.getElementById('assy'));




class LifeCycleDemo extends React.Component
{
    constructor(props)
    {
        console.log('Constructor');
        super(props);
        this.state={
            count:0
        }
    }

    incCount=()=>{
        console.log('incCount metheod called : '+this.state.count)
        this.setState({
            count:this.state.count+1
        })
    }

    componentWillMount()
    {
        console.log('Component Will Mount');
    }
    componentDidMount()
    {
        console.log('componentDidMount');
    }
    componentWillReceiveProps()
    {
        console.log('componentWillReceiveProps');
    }
    componentWillUpdate()
    {
        console.log('componentWillUpdate');
    }
    
    componentDidUpdate()
    {
        console.log('comonent DiD update');
    }

    shouldComponentUpdate()   //to avaoid rendering every time click button
    {
        console.log('shouldComponetUpdate');
        if(this.state.count<10)
        {
        return true;
    }
    return false;
    }

    render(){
        console.log('Rendering..');
        return(
           <section>
            <h1>React Life Cycle methed Demo</h1>
            <h2>
                {this.state.count}
                <button onClick={this.incCount}>Increment</button>
                </h2>
            </section>
        )
    }
}

class AjaxDemo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            users:[]
        }
    }
    componentWillMount()
    {
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/users",
            success:(data)=>{
                this.setState({ users:data})
               
            }
        })
    }
    render(){
        const{users}=this.state
        return(
            <ul><hr/><h1>Ajax Demo</h1>
                {
                    users.map((user)=>{
                        return <li key={user.name}>{user.name} </li>
                    })
                }

            </ul>
        )
    }
}

ReactDOM.render(<AjaxDemo/>,document.getElementById('ajaxDemo'));

ReactDOM.render(<LifeCycleDemo/>,document.getElementById('lifecycle'));
setTimeout(()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById('lifecycle'))},1000)

