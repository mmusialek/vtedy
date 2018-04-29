import React from 'react';
import "./shell.scss"

export class Shell extends React.Component {

  render() {
    return (
      <div className="vth-shell">
        <div className="vth-shell__left-sidebar">
          <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
            <li>item 5</li>
          </ul>
        </div>

        <div className="vth-shell__header">
          header
        </div>

        <div className="vth-shell__body">
          body
          <img src="/assets/img/structure-light-led-movement-158826.jpeg"/>
        </div>

        <div className="vth-shell__footer">
          footer
        </div>

      </div>
    );
  }

}
