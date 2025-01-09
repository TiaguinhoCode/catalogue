'use client';

// Next.js
import { useRouter } from 'next/navigation';

// React
import { createContext, ReactNode, useEffect, useState } from 'react';

// Biblioteca
import { setupApiClient } from '@/services/api';
import { toast } from 'react-toastify';

// Tipagem
import { ItemsUser } from '@/types/users';
type SignInProps = {
    email: string;
    password: string;
    company: string;
};

type AuthContextData = {
    user: ItemsUser | null;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
};

// Contexto
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ItemsUser | null>(null);
    const router = useRouter();
    const api = setupApiClient();

    // Carregar o usuário autenticado
    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((prev, current) => {
            const [name, ...rest] = current.split('=');
            prev[name] = decodeURIComponent(rest.join('='));
            return prev;
        }, {} as Record<string, string>);

        const token = cookies['@nextauth.token'];
        const company = cookies['@nextcompany.name'];


        async function loadUser() {
            if (token) {
                try {
                    const resp = await api.get(`/v1/me?company=${company}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const user = resp.user
                    setUser(user)
                } catch (err) {
                    console.error('Erro ao validar token:', err);
                    signOut();
                }
            }
        }

        loadUser()
    }, [])

    async function signIn({ email, password, company }: SignInProps) {
        try {
            const response = await api.post(`/v1/session?company=${company}`, { email, password });
            const { token, ...userData } = response.user;

            // Salvar token no cookie
            document.cookie = `@nextauth.token=${token}; max-age=${60 * 60 * 24 * 30}; path=/`;
            document.cookie = `@nextcompany.name=${company}; max-age=${60 * 60 * 24 * 30}; path=/`

            // Atualizar estado do usuário
            setUser(userData);

            // Redirecionar com base no papel do usuário
            if (userData.role === 'dono') {
                router.push(`/${company}/admin`);
                toast.success(`Bem-vindo de volta, ${userData.name}! 🚀`);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Erro ao acessar!';
            toast.error(errorMessage);
            console.error('Erro ao fazer login:', err);
        }
    }

    // Função de logout
    function signOut() {
        try {
            // Limpar cookies
            document.cookie = '@nextauth.token=; max-age=0; path=/';
            document.cookie = '@nextcompany.name=; max-age=0; path=/';

            // Resetar estado do usuário
            setUser(null);

            // Redirecionar para a página inicial
            router.push('/');
        } catch (err) {
            console.error('Erro ao deslogar:', err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
