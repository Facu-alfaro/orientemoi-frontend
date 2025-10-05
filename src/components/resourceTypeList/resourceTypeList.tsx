"use client";
import Link from "next/link";
import { useState } from "react";

const initialResourceTypes = [
    {
        id: 1,
        name: "Aide alimentaire",
        description:
            "Liste des banques alimentaires, programmes d'aide et repas gratuits disponibles dans votre ville.",
    },
    {
        id: 2,
        name: "Anxiété",
        description:
            "Ressources pour le soutien psychologique, groupes de discussion et lignes d'écoute.",
    },
    {
        id: 3,
        name: "Logement",
        description:
            "Aide pour trouver un logement temporaire, services sociaux et centres d'hébergement.",
    },
];

export default function ResourceTypeList() {
    const [resourceTypes, setResourceTypes] = useState(initialResourceTypes);

    //  Function to add a new type (popup or modal can be added later)
    const handleAddResourceType = () => {
        const newId = resourceTypes.length + 1;
        const newType = {
            id: newId,
            name: `Nouveau type ${newId}`,
            description: "Description à compléter...",
        };
        setResourceTypes([...resourceTypes, newType]);
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center p-8 relative">
            <h1 className="text-4xl font-extrabold mb-12 text-gray-800">
                Types de Ressources
            </h1>
            <ul className="grid gap-8 w-full max-w-4xl">
                {resourceTypes.map((type) => (
                    <li
                        key={type.id}
                        className="border rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300 bg-gray-50 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                {type.name}
                            </h2>
                            <p className="text-gray-600">{type.description}</p>
                        </div>
                        {/* This link will redirect me to the list of resources of a specific type */}
                        <Link
                            href={`/resourceList/${type.name.toLowerCase()}`}
                            className="mt-6 inline-block text-center bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            Voir les ressources
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Add Button */}
            <button
                onClick={handleAddResourceType}
                className="fixed bottom-8 right-8 bg-blue-500 text-white w-16 h-16 rounded-full text-3xl font-bold shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                title="Ajouter un nouveau type de ressource"
            >
                +
            </button>
        </main>
    );
}
