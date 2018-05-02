import React from "react";
import {Route, Switch} from "react-router-dom";
import {SimpleListWrapper} from "../../hoc/SimplePanel/SimplePanel";
import {Labels} from "../Labels/Labels";
import {Projects} from "../Projects/Projects";

export class ShellNavigationSidebarRouter extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {

    this.setState({
      projectsComponent: new SimpleListWrapper(Projects),
      labelsComponent: new SimpleListWrapper(Labels),
    });
  }

  closeWindow = (routeProps) => {
    routeProps.history.push('/');
  };

  prepareRouteComponent = (component, routeProps) => {
    let finalProps = Object.assign({}, routeProps, {
      closeWindow: () => this.closeWindow(routeProps)
    });
    return React.createElement(component, finalProps)
  };


  render() {
    return (
      <Switch>
        {/*<Route exact path='/task-board' component={TaskBoard}/>*/}
        {/*<Route path='/projects' component={this.state.projectsComponent}/>*/}
        <Route path='/projects' render={routeProps => { return this.prepareRouteComponent(this.state.projectsComponent, routeProps) }} />
        <Route path='/labels' render={routeProps => { return this.prepareRouteComponent(this.state.labelsComponent, routeProps) }} />
      </Switch>
    );
  }
}
