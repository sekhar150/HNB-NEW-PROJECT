import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import { Flight } from './Flight'
import InfiniteScrolling from './InfiniteScrolling'
import DragAndDrop from './DragAndDrop'
import Parent from './Parent'
import TimerAndDate from './TimerAndDate'
import {Response} from './HigherOrderComponent'
import ToDoList from './TodoList'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/flight' element={<Flight/>} />
        <Route path='/infinite-scrolling' element={<InfiniteScrolling />} />
        <Route path='/drag-drop' element={<DragAndDrop />} />
        <Route path='/parent' element={<Parent />} />
        <Route path='/timer-date' element={<TimerAndDate />} />
        <Route path='/higher-order' element={<Response />} />
        <Route path='/to-do' element={<ToDoList />} />
       </Routes>
    </>
  )
}

export default App
