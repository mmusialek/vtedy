import PropTypes from "prop-types";
import React from "react";
import './NavigationSidebar.scss'
import {Link} from "react-router-dom";

export class NavigationSidebar extends React.Component {

  _getListaData = (item, index) => {
    const res = [];

    const url = item.url;

    // res.push(<li key={index}><a href={item.url}>{item.name}</a></li>);
    // res.push(<li key={index}><Link to={item.url}>{item.name}</Link></li>);
    res.push(<li key={index}>
      <Link to={item.url}>{item.name}</Link>
      {/*<Link to={{*/}
      {/*pathname: {url},*/}
      {/*search: '{item.url}',*/}
      {/*state: { detail: response.data }*/}
      {/*}}> My Link </Link>*/}
    </li>);

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
