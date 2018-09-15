import React,{Component} from 'react';
import AppBar from './Components/AppBar';
import Form from './Components/Form';
export default class App extends Component{
  render(){
    return(
      <div>
        <AppBar />
        <Form />
      </div>
    )
  }
}