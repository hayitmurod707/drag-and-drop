import { Fragment } from 'react';
import Double from './Double';
import Horizontal from './Horizontal';
import Vertical from './Vertical';
import './style.css';
import Three from './three';
const App = () => (
   <Fragment>
      <h1>Drag and drop with react-beautiful-dnd</h1>
      <h4>
         <a href='https://github.com/hayitmurod707/drag-and-drop'>Github</a>
      </h4>
      <h3>Vertical list</h3>
      <Vertical />
      <h3>Horizontal list</h3>
      <Horizontal />
      <h3>Ordering Double List</h3>
      <Double />
      <h3>Ordering Three List</h3>
      <Three />
   </Fragment>
);
export default App;
