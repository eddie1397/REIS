import NewForm from './components/NewForm'
import './App.css';
import React, { Component } from 'react';
let baseURL = 'http://localhost:3003';


class App extends Component {
  constructor(props){
    super(props)

    this.state={
      travels:[],
      modalOpen: false,
      travelToBeEdited: {},
      description: '',
      city: '',
      country: '',
      completed: false,
      tasks: [],
      notes: [],

    }
  }

  getTravels = () => {
    console.log('Getting Travels...');
    fetch(baseURL + '/travels').then(res=>{
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data =>{
      console.log(data)
      this.setState({travels: data})
    })

  }


  addTravels = (newTravel) => {
      const copyTravels = [...this.state.travels]
      copyTravels.push(newTravel)
      this.setState({
        travels: copyTravels
      })
    }


    deleteTravel = (id)=> {
        console.log(id);
        fetch(baseURL + '/travels/' +  id, {
          method: 'DELETE',
          credetials: 'include'
        }).then(res =>{
          console.log(res);
          if (res.status === 200) {
            const findIndex= this.state.travels.findIndex(travel => travel._id === id)
            const copyTravels = [...this.state.travels]
            copyTravels.splice(findIndex, 1)
            this.setState({
              travels: copyTravels
            })
          }
        })
      }


    handleSubmit = (e) => {
      e.preventDefault()
      fetch(baseURL + '/travels/' +
    this.state.travelToBeEdited._id, {
      method: 'PUT',
      body: JSON.stringify({
        city: e.target.city.value,
        description: e.target.description.value,
        // notes: e.target.notes.value

      }),
      headers: {
        'Content-Type': 'application/json'
      },
       credentials: 'include'
    }).then(res=> res.json())
    .then(resJson => {
    console.log(resJson)
    const findIndex = this.state.travels.findIndex(travel => travel._id
    === resJson.data._id)
    const copyTravels= [...this.state.travels]
    copyTravels[findIndex] = resJson.data
    this.setState({
      travels: copyTravels,
      modalOpen: false
    })
    })
  }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,

      })
    }

    showEditForm = (travel) =>{
      console.log(travel);
      this.setState({
        modalOpen: true,
        city: travel.city,
        description: travel.description,
        travelToBeEdited: travel


      })

    }




  componentDidMount(){
    this.getTravels()
  }


  render(){
    return (
      <>
        <div className='App'>
          <h1>REIS</h1>
          <h2>Destination Travel Log</h2>
          <h3>Add a New Destination: </h3>
          <NewForm baseURL={baseURL} addTravel={this.addTravels}/>
          <table>
            <tbody>
              {this.state.travels.map((travel, i)=>{
                return(
                  <tr key={i}>
                    <td onDoubleClick={()=>this.toggleCelebrated(travel)}
                    className={travel.celebrated ? 'celebrated' : null}>
                    </td>
                    <td >{travel.city}</td>
                    <td> {travel.likes}</td>
                    <td> {travel.description}</td>

                    <td onClick={()=> this.addFave(travel)}>💖</td>
                    <td onClick={()=> this.addNote(travel)}>📚</td>
                    <td onClick={()=>this.showEditForm(travel)}>Edit Destination</td>
                    <td onClick={()=> this.deleteTravel(travel._id)}>❌</td>
                  </tr>

        )
      })}
    </tbody>
    </table>
    
    {
        this.state.modalOpen &&
        <>
        <h3>Edit a Destination: </h3>
        <form onSubmit={this.handleSubmit}>
          <label>City Name:  </label>
          <input name='city' value={this.state.city}
          onChange={this.handleChange}/>
          <br/>
          <label>Description:  </label>
          <input name='description' value={this.state.description}
          onChange={this.handleChange}/>
          <br/>
          <button> Submit </button>
        </form>
        </>

      }
        </div>
      </>
    );
  }
}

export default App;
