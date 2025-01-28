// Utils
import { applyCepMask } from "@/utils/mask/cep";

// Tipagem
interface fetchCepProps {
  cep: string;
  setCep: (value: string) => void;
  setAddress: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setLoading: (value: boolean) => void;
}

export async function fetchCep({
  cep,
  setCep,
  setAddress,
  setNeighborhood,
  setCity,
  setState,
  setLoading,
}: fetchCepProps) {
  const maskedCep = applyCepMask(cep);
  setCep(maskedCep);

  if (maskedCep.replace(/\D/g, "").length === 8) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${maskedCep.replace(/\D/g, "")}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
      } else {
        setAddress(data.logradouro || "");
        setNeighborhood(data.bairro || "");
        setCity(data.localidade || "");
        setState(data.uf || "");
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      alert("Não foi possível buscar o endereço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
}
