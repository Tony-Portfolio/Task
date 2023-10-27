import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
// import Navigation from './components/Navigation';
import Todo from './pages/Task';
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend'

export const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: {enableMouseEvents: true},
      preview: true,
      transition: TouchTransition,
    },
  ],
}


const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

const AppContent = () => {
    return (
        <>
            <div className="flex">
                {/* <Navigation /> */}
                <Routes>
                    <Route path="/p/:id" element={
                        <DndProvider options={HTML5toTouch}>
                            <Todo />
                        </DndProvider>
                    } />
                </Routes>
            </div>
        </>
    )
}

export default App