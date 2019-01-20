import React, {Component} from 'react';
import spinner from '../extra/spinner.gif';

class Loader extends Component {
  render(){
    return(
      <div className = 'valign-wrapper'style = {{width: '100vw', height: '100vh'}}>
        <span style = {{margin: 'auto'}}>
          <img src={spinner} alt="Loading..."/>
        </span>
      </div>
    );
  }
}
export default Loader;
