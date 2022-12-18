import {useState, useEffect} from 'react'
import { useTheme } from "next-themes"
import Header from "../components/Header";
import Tasks from "../components/Tasks";

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [filteredTasks, setFilteredTasks] = useState([])

  const loadSavedTasks = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  const onFilter = (filterText) => {
    setFilter(filterText)
  }

  useEffect(() =>{
    loadSavedTasks()
  },[])

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => {
      if (filter === "active") {
        return task.isCompleted === false
      }else if(filter === "completed"){
        return task.isCompleted === true
      }else{
        return task
      }
    }))
  }, [tasks, filter])
  
  const setTaskAndSave = (newTasks) => {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const addTask = (taskTitle) => {
    setTaskAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ])
  }

  const deleteTaskById = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTaskAndSave(newTasks)
  }

  const clearCompletedTask = () => {
    const newTasks = tasks.filter(task => !task.isCompleted)
    setTaskAndSave(newTasks)
  }

  const toggleTaskCompletedById = (taskId) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task
    })
    setTaskAndSave(newTasks)
  }

  return (
    <>
      <Header
        currentTheme={currentTheme}
        setTheme={setTheme}
        addTask={addTask}
      />
      <Tasks
        tasks={tasks}
        deleteTask={deleteTaskById}
        toggleTask={toggleTaskCompletedById}
        setTasks={setTasks}
        onFilter={onFilter}
        filteredTasks={filteredTasks}
        filter={filter}
        clearCompletedTask={clearCompletedTask}
      />

    </>
  )
}
