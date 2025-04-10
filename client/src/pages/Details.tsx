import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import TaskForm from "../components/TaskForm";
import { MdCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ProjectDetails: React.FC = () => {
    const { id } = useParams();  // Estrai l'ID dal URL
    const [project, setProject] = useState<any>(null);  // Stato per memorizzare i dati del progetto
    const [loading, setLoading] = useState<boolean>(true);  // Stato per gestire il caricamento
    const [error, setError] = useState<string>("");
    const [addingTask, setAddingTask] = useState<boolean>(false)
    const [tasks, setTasks] = useState<any[]>([]);

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


        // Fetch dei task
        fetch(`http://localhost:8080/api/projects/${id}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data.tasks))
            .catch(err => console.error("Errore nel fetch dei task", err));
    }, [id, addingTask]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                                            <li className={` cursor-pointer p-2 z-10 rounded-xl shadow hover:shadow-white transition-all duration-200 ${task.completed && 'line-through text-gray-500'}`}>
                                                {task.title}
                                            </li>
                                            <MdCancel className="cursor-pointer z-0 hover:text-red-700 absolute top-1/2 -translate-y-[50%] w-8 border right-0 group-hover:translate-x-8 transition-all duration-300"/>
                                            <CiEdit className="cursor-pointer z-0 hover:text-yellow-500 absolute top-1/2 -translate-y-[50%] w-8 left-0 group-hover:-translate-x-8 transition-all duration-300"/>

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
        </div>
    );
};

export default ProjectDetails;
