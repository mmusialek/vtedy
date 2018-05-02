import React from "react";
import "./shell.scss";
import {AddTask} from "../../components/AddTask/AddTask";
import {NavigationSidebar} from "../../components/NavigationSidebar/NavigationSidebar";
import {ShellNavigationSidebarRouter} from "../../components/ShellNavigationSidebarRouter/ShellNavigationSidebarRouter";
import {TaskBoard} from "../../components/TaskBoard/TaskBoard";
import {TaskDetails} from "../../components/TaskDetails/TaskDetails";

export class Shell extends React.Component {


  componentWillMount() {
    this.setState({areDetailsClosed: true});
  }


  _toggleDetailsClose = () => {
    this.setState({areDetailsClosed: !this.state.areDetailsClosed});
  };

  _showDetailsClose = (id) => {
    this.setState({areDetailsClosed: false, taskId: id});
  };

  render() {
    const navigationItems = [];
    navigationItems.push(
      {
        name: "Task board",
        url: "/task-board"
      },
      {
        name: "Projects",
        url: "/projects"
      },
      {
        name: "Calendar",
        url: "#"
      },
      {
        name: "Labels",
        url: "/labels"
      }
    );

    const taskItems = [];
    taskItems.push(
      {
        id: '1',
        name: "task 1"
      },
      {
        id: '2',
        name: "task 2"
      },
      {
        id: '3',
        name: "task 3"
      },
      {
        id: '4',
        name: "task 4"
      },
      {
        id: '5',
        name: "task 5"
      },
      {
        id: '6',
        name: "task 6"
      },
      {
        id: '7',
        name: "task 7"
      }
    );

    return (
      <div className="vth-shell">
        <div className="vth-shell__left-sidebar">
          <NavigationSidebar items={navigationItems}/>
          <div className='vth-shell__left-sidebar__additionals'>
            <ShellNavigationSidebarRouter/>
          </div>
        </div>

        <div className="vth-shell__header">
          <AddTask/>
        </div>

        <div className="vth-shell__body">
          <TaskBoard items={taskItems} onTaskClick={(id) => this._showDetailsClose(id)}/>
          {/*<div className='vth-shell__body__details'>*/}

          {/*</div>*/}
          <TaskDetails isClosed={this.state.areDetailsClosed} taskId={this.state.taskId} toggleClose={this._toggleDetailsClose}/>
        </div>

        <div className="vth-shell__footer">footer</div>
      </div>
    );
  }
}


// Shell.propTypes ={
//   areDetailsClosed: PropTypes.bool
// };
