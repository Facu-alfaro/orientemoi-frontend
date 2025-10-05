"use client";

import React from "react";
import ResourceList from "../../../components/resourceList/resourceList";
import { useParams } from "next/navigation";

export default function ResourceListPage() {
    const params = useParams();
    const rawType = Array.isArray(params.type) ? params.type[0] : params.type ?? "inconnu";

    // Decode to get the correct spaces
    const type = decodeURIComponent(rawType);

    return <ResourceList type={type} />;
}
