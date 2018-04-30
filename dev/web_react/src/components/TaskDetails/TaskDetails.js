import React from "react";
import PropTypes from "prop-types";
import "./TaskDetails.scss";

export class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ isClosed: true });
  }

  // _toggleClose = () => {
  //   this.props.isClosed = !this.props.isClosed;
  // };

  render() {
    return (
      <React.Fragment>
        {!this.props.isClosed && (
          <div className="vth-task-details">
            <div>
              <div>
                <span>TAKS ID: {this.props.taskId}</span>
                <a href="#" onClick={this.props.toggleClose}>
                  Close
                </a>
              </div>

              <div>details</div>

              <div>footer</div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

TaskDetails.propTypes = {
  toggleClose: PropTypes.func,
  isClosed: PropTypes.bool,
  taskId: PropTypes.string,
};
