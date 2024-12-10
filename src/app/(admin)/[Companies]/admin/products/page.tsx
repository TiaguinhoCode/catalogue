// Dados
import companiesData from '@/data/settings/companies.json';

// Componente
import { NotFound } from '@/components/notFound';
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

    const api = setupApiClient()

    const company = companiesData.find(
        (c) => c.name.toLowerCase() === Companies.toLowerCase()
    );

    if (!company) {
        return <NotFound />;
    }

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

    const categoryResponse = await api.get(`/v1/category?company=${company.name}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const productsResponse = await api.get(`/v1/products?company=${company.name}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return (
        <>
            <div className="flex flex-col">
                <Container>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
                        Produtos
                    </h2>
                    <Tabs tabs={tabs} />
                </Container>

                <ContainerProducts categories={categoryResponse.category} dataProducts={productsResponse.products} token={token} />

            </div>
        </>
    );
}



