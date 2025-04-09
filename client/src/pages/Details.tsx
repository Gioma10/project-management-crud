import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import Button from "../components/Button";
import { collection, addDoc, updateDoc, getDoc, doc, getFirestore } from "firebase/firestore"; // Funzioni Firestore per aggiungere e aggiornare documenti

const ProjectDetails: React.FC = () => {
    const { id } = useParams();  // Estrai l'ID dal URL
    const [project, setProject] = useState<any>(null);  // Stato per memorizzare i dati del progetto
    const [loading, setLoading] = useState<boolean>(true);  // Stato per gestire il caricamento
    const [error, setError] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>(''); // Stato per il titolo del task

    useEffect(() => {
        if (id) {
            // Effettua la fetch per ottenere i dettagli del progetto
            fetch(`http://localhost:8080/api/projects/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProject(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Failed to fetch project details");
                    setLoading(false);
                });
        }
    }, [id]);

    // Funzione per aggiungere un task
    const addTask = async () => {
        if (!taskTitle) {
            alert("Please provide a title for the task.");
            return;
        }
    
        if (!id) {
            console.error("Project ID is undefined!");
            return;
        }
    
        try {
            const db = getFirestore();
    
            // Aggiungi un task nella collezione 'tasks' del progetto specifico
            await addDoc(collection(db, "projects", id, "tasks"), {
                title: taskTitle,
                completed: false,
            });
    
            console.log("Task added successfully!");
    
            setTaskTitle('');
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };
    

    // Funzione per aggiornare lo stato di completamento del task
    const toggleTask = async (taskId: string) => {
        if (!id) {
            console.error("Project ID is undefined!");
            return;
        }
    
        try {
            // Crea il riferimento al documento della task
            const taskRef = doc(db, "projects", id, "tasks", taskId);
    
            // Ottieni lo stato attuale della task (assicurati di ottenerlo prima dal database se necessario)
            const taskSnapshot = await getDoc(taskRef);
            if (!taskSnapshot.exists()) {
                console.log("Task not found!");
                return;
            }
    
            // Prendi il valore `completed` e fai il toggle
            const currentCompleted = taskSnapshot.data()?.completed;
    
            // Cambia lo stato della task
            await updateDoc(taskRef, {
                completed: !currentCompleted,
            });
    
            console.log("Task toggled successfully!");
        } catch (error) {
            console.error("Error toggling task: ", error);
        }
    };

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-screen">
            {project ? (
                <div className="p-10 flex flex-col justify-center items-start gap-10">
                    <h1 className="text-8xl">{project.title} Details</h1>
                    <div className=" w-full">
                        <h3 className="text-4xl">Description</h3>
                        <p>{project.description}</p>
                    </div>

                    <div className="flex flex-col gap-5 items-start w-full">
                        <h3>Tasks</h3>
                        {
                            project.tasks?.length ? (
                                project.tasks.map((task: any) => (
                                    <div key={task.id} className="border p-5 flex items-center gap-5">
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed} 
                                            onChange={() => toggleTask(task.id)} 
                                        />
                                        <p className={task.completed ? 'line-through' : ''}>{task.title}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="border p-5">
                                    <p>Non ci sono ancora task...</p>
                                </div>
                            )
                        }
                    </div>

                    {/* Form per aggiungere un task */}
                    <div className="flex flex-col gap-5">
                        <input 
                            type="text" 
                            placeholder="Task Title" 
                            value={taskTitle} 
                            onChange={(e) => setTaskTitle(e.target.value)} 
                            className="p-2"
                        />
                        <Button onSelect={addTask}>Add task</Button>
                    </div>
                </div>
            ) : (
                <p>No project found</p>
            )}
        </div>
    );
};

export default ProjectDetails;
