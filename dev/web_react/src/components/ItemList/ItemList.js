import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export class ItemList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vth-item-list">
        <ul>
          {this.props.items.map((item, index) => {
            return <li key={index}><Link to={item.url}>{item.name}</Link></li>
          })};
        </ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array
};
