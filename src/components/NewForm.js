import React, { Component } from 'react'

export default class NewForm extends Component{
    constructor(props){
      super(props)

      this.state={
        name: '',
        description: '',
      }
    }


    handleChange= (e)=>{
    this.setState({
      name: e.target.value
    })
  }

  handleChange2= (e)=>{
  this.setState({
    description: e.target.value
  })
}

  handleSubmit=(event)=> {
    event.preventDefault()
    console.log(this.state.name);
    console.log(this.state.description);
    //fetch to the back extends
    fetch(this.props.baseURL + '/travels', {
      method: 'POST',
      body: JSON.stringify({city: this.state.name, description: this.state.description}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res =>{
      return res.json()
    }).then(data=>{
      console.log(data);
      this.props.addTravel(data);
      this.setState({
        name: '',
        description: ''
      })
    }).catch(error=>console.log(error))
  }

  render(){
    console.log(this.state.name);
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>Name: </label>
        <input type='text' id='name' name='name' onChange={(e)=> this.handleChange(e)} value={this.state.name}/>
        <br/>
        <label htmlFor='description'>Description: </label>
        <input type='textarea' id='description' name='description' onChange={(e)=> this.handleChange2(e)} value={this.state.description}/>
        <br/>
        <br/>
        <input type='submit' value='Add a Destination'/>
      </form>
    )
}
}
