// Dados
import companies from '../../data/settings/companies.json'

// Componentes
import { NotFound } from '@/components/notFound';

export default function SigIn({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
    const company = searchParams.company as string;

    const foundCompany = companies.find((item: any) => item.name.toLowerCase() === company?.toLowerCase())

    if (foundCompany) {
        return (
            <p>encontrou</p>
        )
    } else {
        return (
            <NotFound />
        )
    }
}
