import React from "react";
import './Projects.scss';
import {ItemList} from "../ItemList/ItemList";

export class Projects extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    console.log('projects mount');

    let projectItems = [{
      id: 1,
      name: 'project 1',
    },{
      id: 2,
      name: 'project 2'
    },{
      id: 3,
      name: 'project 3'
    },{
      id: 4,
      name: 'project 3'
    }];

    for(let item of projectItems){
      item.url = `/task-board/projectId=${item.id}`;
    }

    this.setState({
      projects: projectItems
    })
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

        <ItemList items={this.state.projects}/>
      </div>
    );
  }
}
