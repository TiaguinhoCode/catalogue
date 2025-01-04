// Dados
import companiesData from '@/data/settings/companies.json';

// Componente
import { Tabs } from '@/components/ui/tabs';
import { Container } from '@/components/ui/container';
import { ContainerProducts } from '@/components/layouts/containerProducts';

// Bibliotecas
import { FaBox } from 'react-icons/fa';
import { LiaUsersSolid } from 'react-icons/lia';
import { AiOutlineDashboard } from 'react-icons/ai';
import { setupApiClient } from '@/services/api';

// Next
import { cookies } from 'next/headers';

// Tipagem
interface ProductsPageProps {
    params: Promise<{ Companies: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
    const { Companies } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;

    const api = setupApiClient(token)

    const company = companiesData.find(
        (c) => c.name.toLowerCase() === Companies.toLowerCase()
    );

    const tabs = [
        {
            key: "products",
            title: "Produtos",
            icon: <FaBox />,
        },
        {
            key: "suppliers",
            title: "Fornecedores",
            icon: <LiaUsersSolid />,
            disabled: true,
        },
        {
            key: "reports",
            title: "Relatórios",
            icon: <AiOutlineDashboard />,
        },
    ];

    const categoryResponse = await api.get(`/v1/category?company=${company?.name}`);
    const productsResponse = await api.get(`/v1/products?company=${company?.name}`)

    return (
        <div className="flex space-y-4 py-2 flex-col">

            <Container>
                <h2 className="text-gray-800 font-bold text-2xl">
                    Produtos
                </h2>
                <div className="pt-2">
                    <Tabs tabs={tabs} />
                </div>
            </Container>
            <ContainerProducts categories={categoryResponse.category} dataProducts={productsResponse.products} token={token} />
        </div>
    );
}



