"use client";

import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

interface ResourceListProps {
    type: string;
}

interface Resource {
    id: number;
    name: string;
    description: string;
    website: string;
}

const initialResources: Resource[] = [
    {
        id: 1,
        name: "Banque alimentaire locale",
        description: "Repas gratuits et aide alimentaire disponible dans votre ville.",
        website: "https://exemple.com",
    },
    {
        id: 2,
        name: "Aide alimentaire pour personne agée",
        description: "Soutien alimentaire pour les personne de plus de 65 ans.",
        website: "https://exemple2.com",
    },
];

export default function ResourceList({ type }: ResourceListProps) {
    const [resources, setResources] = useState(initialResources);

    // Function to add a new resource
    const handleAddResource = () => {
        const newId = resources.length + 1;
        const newResource: Resource = {
            id: newId,
            name: `Nouvelle ressource ${newId}`,
            description: "Description à compléter...",
            website: "#",
        };
        setResources([...resources, newResource]);
    };

    // Function to edit a resource
    const handleEditResource = (id: number) => {
        const newName = prompt("Modifier le nom de la ressource :");
        if (newName) {
            setResources(
                resources.map((r) => (r.id === id ? { ...r, name: newName } : r))
            );
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8 relative">   {/*min-h-screen is to get the full screen and not only the half*/}
            <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
                Ressources pour {type}
            </h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between relative"  //relative to have edit icon (absolute) in different resources
                    >
                        {/* Edit Button */}
                        <button
                            onClick={() => handleEditResource(resource.id)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                            title="Modifier la ressource"
                        >
                            <EditIcon/>
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-gray-800">
                                {resource.name}
                            </h2>
                            <p className="text-gray-600 mb-4">{resource.description}</p>
                        </div>
                        <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-block text-center bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            Visiter le site
                        </a>
                    </div>
                ))}
            </div>

            {/* Add Button */}
            <button
                onClick={handleAddResource}
                className="fixed bottom-8 right-8 bg-blue-500 text-white w-16 h-16 rounded-full text-3xl font-bold shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                title="Ajouter une nouvelle ressource"
            >
                +
            </button>
        </main>
    );
}
