import React from "react";
import { withRouter } from 'react-router-dom'
// this also works with react-router-native


function withRouterLink(Component ){
  return withRouter(({ history }, routerPath, routerParam) => (
    <a
      onClick={() => { history.push(routerPath) }}>
      Click Me!
    </a>
  ))
}


// const Button = withRouter(({ history }) => (
//   <button
//     type='button'
//     onClick={() => { history.push('/new-location') }}
//   >
//     Click Me!
//   </button>
// ));
