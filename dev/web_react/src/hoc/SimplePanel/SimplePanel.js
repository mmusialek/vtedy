import React from "react";
import './SimplePanel.scss';

export function SimpleListWrapper(WrappedComponent) {

  return class SimplePanel extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.setState({
        isClosed: false
      });
    }

    render() {
      return (
        <React.Fragment>

          <div className="vth-simple-panel">
            <div className='vth-simple-panel__container'>
              <div className='vth-simple-panel__container__header'>
                <a onClick={this.props.closeWindow}>Close</a>
              </div>

              <div className='vth-simple-panel__container__body'>
                <WrappedComponent {...this.props}/>
              </div>

              <div className='vth-simple-panel__container__footer'>footer</div>
            </div>
          </div>

        </React.Fragment>
      );
    }
  };
}

//
//
// SimplePanel.propTypes = {
//   isClosed: PropTypes.bool,
//   openWindow: PropTypes.func,
//   closeWindow: PropTypes.func,
// };
