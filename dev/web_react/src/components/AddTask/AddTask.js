import React from 'react';
import './AddTask.scss';

export class AddTask extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='vth-add-task'>
        <span className='vth-add-task__add-label'>+</span>
        <input className='vth-add-task__input'/>
        <span  className='vth-add-task__close-label'>X</span>
      </div>
    );
  }
}
