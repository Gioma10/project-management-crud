import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Button from "../components/Button";

const ProjectDetails: React.FC = () => {
    const { id } = useParams();  // Estrai l'ID dal URL
    const [project, setProject] = useState<any>(null);  // Stato per memorizzare i dati del progetto
    const [loading, setLoading] = useState<boolean>(true);  // Stato per gestire il caricamento
    const [error, setError] = useState<string>("");

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
                            <div className="flex flex-col gap-5">
                                <div className="border p-5">
                                    <p>Non ci sono ancora task...</p>
                                </div>
                                <Button>Aggiungi</Button>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <p>No project found</p>
            )}
        </div>
    );
};

export default ProjectDetails;
