import React from 'react';
import PropTypes from 'prop-types';
import './TaskDetails.scss'

export class TaskDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({isClosed: true});
  }

  // _toggleClose = () => {
  //   this.props.isClosed = !this.props.isClosed;
  // };

  render() {
    return (
      <React.Fragment>
        { 1 === 1 &&
        <div className='vth-task-details'>
          <div>

            <div>
              <a href="#" onClick={this.props.toggleClose}>Close</a>
            </div>

            <div>
              details
            </div>

            <div>
              footer
            </div>

          </div>
        </div>}
      </React.Fragment>

    );
  }
}

TaskDetails.propTypes = {
  toggleClose: PropTypes.func,
  isClosed: PropTypes.bool
};
