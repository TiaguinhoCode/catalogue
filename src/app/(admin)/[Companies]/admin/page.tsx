// Dados
import companiesData from '@/data/settings/companies.json';

// Componente
import { NotFound } from '@/components/notFound';

// Tipagem
interface AdminPageProps {
    params: Promise<{ Companies: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
    const { Companies } = await params;

    const company = companiesData.find(
        (c) => c.name.toLowerCase() === Companies.toLowerCase()
    );

    if (!company) {
        return <NotFound />;
    }

    return (
        <>test</>
    )
}