import React from "react";
import './Projects.scss';

export class Projects extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    console.log('projects mount');
  }

  componentWillUnmount(){
    console.log('projects unmount');
  }

  render() {
    return (
      <div className='vth-projects'>
        Projects <br/>
        isClosed: {this.props.isClosed? 'true' : 'false'}<br/>
        closeWindow {this.props.closeWindow !== undefined ? 'true' : 'false'}<br/>
      </div>
    );
  }
}
