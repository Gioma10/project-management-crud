import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import TaskForm from "../components/TaskForm";
import { MdCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import EditTaskForm from "../components/EditTaskForm";

const ProjectDetails: React.FC = () => {
    const { id } = useParams();  // Estrai l'ID dal URL
    const [project, setProject] = useState<any>(null);  // Stato per memorizzare i dati del progetto
    const [loading, setLoading] = useState<boolean>(true);  // Stato per gestire il caricamento
    const [error, setError] = useState<string>("");
    const [addingTask, setAddingTask] = useState<boolean>(false)
    const [editingTask, setEditingTask] = useState<any>(null);  // Stato per la task da modificare
    const [tasks, setTasks] = useState<any[]>([]);
    
    useEffect(() => {
        if (id) {
            // Fetch dei dettagli del progetto
            axios.get(`http://localhost:8080/api/projects/${id}`)
                .then(response => {
                    setProject(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Failed to fetch project details");
                    setLoading(false);
                });
        }
    
        // Fetch dei task
        axios.get(`http://localhost:8080/api/projects/${id}/tasks`)
            .then(response => {
                setTasks(response.data.tasks);
            })
            .catch(err => {
                console.error("Errore nel fetch dei task", err);
            });
    }, [id, addingTask]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleDeleteTask = (taskId: string) => {
        if (id) {
            axios.delete(`http://localhost:8080/api/projects/${id}/tasks/${taskId}`)
                .then((response) => {
                    if (response.status === 200) {
                        // Se la cancellazione è riuscita, aggiorna lo stato
                        setTasks(tasks.filter((task) => task.id !== taskId));
                    } else {
                        console.error("Failed to delete task");
                    }
                })
                .catch((err) => {
                    console.error("Error deleting task:", err);
                });
        }
    };

    const handleToggleCompleted = (taskId: string) => {
        // Trova il task che è stato cliccato
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                // Cambia il valore di completed
                const updatedTask = { ...task, completed: !task.completed };
                
                // Effettua la richiesta PUT per aggiornare lo stato della task
                axios.put(`http://localhost:8080/api/projects/${id}/tasks/${taskId}`, updatedTask)
                    .then(response => {
                        if (response.status === 200) {
                            // Aggiorna lo stato locale solo dopo aver ricevuto la risposta positiva
                            return updatedTask;
                        }
                    })
                    .catch(err => {
                        console.error("Errore nell'aggiornare la task", err);
                    });
                
                return updatedTask; // Restituisci l'oggetto aggiornato
            }
            return task;
        });

        // Aggiorna il set di task nel componente
        setTasks(updatedTasks);
    };

    return (
        <div className="w-screen h-screen flex justify-start items-center">

            {project ? (
                <div className="p-10 flex flex-col justify-center items-start gap-10">
                    <h1 className="text-8xl">{project.title} Details</h1>
                    <div className=" w-full">
                        <h3 className="text-4xl">Description</h3>
                        <p>{project.description}</p>
                    </div>

                    <div className="flex flex-col gap-5 items-start w-full">
                        <h3>Tasks</h3>

                        <ol className="border rounded-xl py-5 px-12 min-w-52 h-min-52 list-decimal list-inside flex flex-col gap-5">
                            {tasks.length === 0 ? (
                                <p>There aren't tasks yet...</p>
                            ) : (
                                <>
                                    {tasks.map((task) => (
                                        <div key={task.id} className="relative group">
                                            <li 
                                                onClick={() => handleToggleCompleted(task.id)}
                                                className={`cursor-pointer z-10 p-2 rounded-xl shadow hover:shadow-white transition-all duration-200 ${task.completed && 'line-through text-white/30'}`}>
                                                {task.title}
                                            </li>
                                            <MdCancel 
                                                onClick={() => handleDeleteTask(task.id)} // Chiama la funzione di eliminazione quando viene cliccata l'icona
                                                className="text-lg cursor-pointer opacity-0 group-hover:opacity-100 hover:text-red-700 absolute top-1/2 -translate-y-[50%] w-8 right-0 group-hover:translate-x-8 transition-all duration-300"/>
                                            <CiEdit 
                                                onClick={() => setEditingTask(task)}
                                                className="text-lg cursor-pointer opacity-0 group-hover:opacity-100 hover:text-yellow-500 absolute top-1/2 -translate-y-[50%] w-8 left-0 group-hover:-translate-x-8 transition-all duration-300"/>
                                        </div>
                                    ))}
                                </>
                            )}
                        </ol>
                    </div>
                    <Button onSelect={()=>setAddingTask(true)}>Add task</Button>
                </div>
            ) : (
                <p>No project found</p>
            )}

            {addingTask && id &&
                <div className="fixed h-full w-full bg-black/50 backdrop-blur-xs flex justify-center items-center">
                    {/* modulo  */}
                    <TaskForm 
                        projectId={id}
                        onClose={() => setAddingTask(false)}/>
                </div>
            }

            {editingTask && id &&
                <div className="fixed h-full w-full bg-black/50 backdrop-blur-xs flex justify-center items-center">
                    {/* modulo  */}
                    <EditTaskForm 
                        taskId={editingTask.id}  // Passa l'ID della task da modificare
                        currentTitle={editingTask.title}  // Passa il titolo corrente della task
                        projectId={id}
                        onClose={() => setEditingTask(null)}/>
                </div>
            }
        </div>
    );
};

export default ProjectDetails;
