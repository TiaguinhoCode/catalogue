// Dados
import companies from '../../data/settings/companies.json';

// Componentes
import { NotFound } from '@/components/notFound';

// Tipos fornecidos pelo Next.js
import { PageProps } from './../../../.next/types/app/(landingPage)/help/page';

export default function SigIn({
    searchParams,
}: PageProps & { searchParams: Record<string, string | string[]> }) {
    const company = searchParams.company as string;

    const foundCompany = companies.find(
        (item: any) => item.name.toLowerCase() === company?.toLowerCase()
    );

    if (foundCompany) {
        return <p>encontrou</p>;
    } else {
        return <NotFound />;
    }
}
