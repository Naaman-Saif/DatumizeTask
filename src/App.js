import React,{Component} from 'react';
import AppBar from './Components/AppBar';
import Form from './Components/Form';
import { Provider } from 'react-redux'
import configureStore from './store';

export default class App extends Component{
  render(){
    return(
      <Provider store={configureStore()}>
        <div>
          <AppBar />
          <Form />
        </div>
      </Provider>
    )
  }
}