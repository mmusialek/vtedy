import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.scss'

export class TaskList extends React.Component {


  showDetails(item) {
    console.log('details: ' + item.id);
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

TaskList.propTypes = {
  items: PropTypes.array
};
