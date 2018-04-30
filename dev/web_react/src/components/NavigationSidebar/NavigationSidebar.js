import PropTypes from "prop-types";
import React from "react";
import './NavigationSidebar.scss'

export class NavigationSidebar extends React.Component {

  _getListaData = (item, index) => {
    const res = [];

    res.push(<li key={index}><a href={item.url}>{item.name}</a></li>);

    return res;
  };


  render() {
    return (
      <div className='vth-navigation-sidebar'>
        <ul>
          {this.props.items && this.props.items.map(this._getListaData)}
        </ul>
      </div>
    );
  }
}


NavigationSidebar.propTypes = {
  items: PropTypes.array
};
