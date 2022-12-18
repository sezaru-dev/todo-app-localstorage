import React from 'react'
import Task from './Task'
import TaskInfo from './TaskInfo'
import TaskButtonGroup from './TaskButtonGroup'

const Tasks = ({tasks, deleteTask, toggleTask, setTasks, onFilter, filteredTasks, filter, clearCompletedTask}) => {
  return (
    <section className='relative -top-7 lg:-top-12'>
      <div className='max-w-[582px] px-5  mx-auto'>
        <div className='overflow-hidden rounded-lg divide-y-[1px] divide-lmode-lightGrayishBlue dark:divide-dmode-grayishBlue3 shadow-lg colorModeTransition'>
          {
            filteredTasks.map(task => (
              <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} />
            ))
          }

          <TaskInfo tasks={tasks} setTasks={setTasks} onFilter={onFilter} filter={filter} clearCompletedTask={clearCompletedTask}/>
        </div>

        <TaskButtonGroup  style="lg:hidden py-4 px-5 mt-4 gap-5" tasks={tasks} onFilter={onFilter} filter={filter}/>

      </div>

    </section>
  )
}

export default Tasks