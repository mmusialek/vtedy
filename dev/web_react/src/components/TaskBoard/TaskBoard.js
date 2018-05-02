import React from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.scss';

export class TaskBoard extends React.Component {


  showDetails(item) {
    console.log('details: ' + item.id);
    if (this.props.onTaskClick) {
      this.props.onTaskClick(item.id);
    }
  }

  _getTaskList = (item, index) => {
    const res = [];

    res.push(<li key={index} onClick={() => this.showDetails(item)}>{item.name}</li>);

    return res;
  };

  render() {

    const items = this.props.items;

    return (
      <div className='vth-task-list'>
        <ul>
          {items.map(this._getTaskList)}
        </ul>
      </div>
    );
  }
}

TaskBoard.propTypes = {
  items: PropTypes.array,
  onTaskClick: PropTypes.func
};
