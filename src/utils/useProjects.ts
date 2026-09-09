import { useState, useEffect } from "react";

import { IDataJSON } from "@/utils/interfaces";

interface IUseProjects {
  data: IDataJSON[];
  services: string[];
  loading: boolean;
  error: string | null;
}

export default function useProjects(): IUseProjects {
  const [data, setData] = useState<IDataJSON[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const resList = await fetch("/projects/project.files.json");
        if (!resList.ok) throw new Error(`Failed to load project list (${resList.status})`);
        const list: string[] = await resList.json();
        if (cancelled) return;
        setServices(list);

        const results = await Promise.all(
          list.map(async (service) => {
            const res = await fetch(`/projects/${service.toLowerCase()}.json`);
            if (!res.ok) throw new Error(`Failed to load ${service} (${res.status})`);
            const json: IDataJSON[] = await res.json();
            return json;
          }),
        );
        if (cancelled) return;
        setData(results.flat());
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, services, loading, error };
}
