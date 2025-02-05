// Bibliotecas
import { toast } from "react-toastify";
import { setupApiClient } from "@/services/api";

// Dados
import ruleData from "@/data/rule/rule.json";
import Cookies from "js-cookie";

// Tipagem
interface HandleCreateUserProps {
  id?: string;
  name: string;
  surName: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  role: string;
  editMode?: boolean;
  setName: (value: string) => void;
  setSurName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassoword: (value: string) => void;
  setPhone: (value: string) => void;
  setCep: (value: string) => void;
  setAddress: (value: string) => void;
  setNeighborhood: (value: string) => void;
  setState: (value: string) => void;
  setCity: (value: string) => void;
  setRole: (value: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (isEoading: boolean) => void;
}

export async function handleFormUser({
  id,
  name,
  surName,
  email,
  password,
  phone,
  cep,
  role,
  editMode,
  setName,
  setSurName,
  setEmail,
  setPassoword,
  setPhone,
  setCep,
  setAddress,
  setNeighborhood,
  setState,
  setCity,
  setRole,
  setError,
  setLoading,
}: HandleCreateUserProps) {
  setLoading(true);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const token = Cookies.get("@nextauth.token");
  const company = Cookies.get("@nextcompany.name");
  const api = setupApiClient(token);

  if (
    name === "" &&
    surName === "" &&
    email === "" &&
    phone === "" &&
    cep === "" &&
    role === ""
  ) {
    if (password === "" && !editMode) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      setError(true);
      setLoading(false);
      return;
    }
  } else if (!editMode && !passwordRegex.test(password)) {
    toast.error(
      "A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial."
    );
    setError(true);
    setLoading(false);
    return;
  } else {
    const selectedRole = ruleData.find((rule) => rule.id === Number(role));

    try {
      if (editMode) {
        api.put(`/v1/user?id=${id}&company=${company}`, {
          name,
          surname: surName,
          email,
          phone,
          cep,
          role: selectedRole?.name,
        });

        toast.success("Usuário atualizado com sucesso!");

        window.location.reload();
      } else {
        api.post(`/v1/create/user?company=${company}`, {
          name,
          surname: surName,
          email,
          password,
          phone,
          cep,
          role: selectedRole?.name,
        });

        setName("");
        setSurName("");
        setEmail("");
        setPassoword("");
        setPhone("");
        setCep("");
        setAddress("");
        setNeighborhood("");
        setState("");
        setCity("");
        setRole("");
      }

      toast.success("Usuário cadastrado com sucesso!");
      setError(false);
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Aconteceu algum erro tente novamente");
    }
  }

  setLoading(false);
}
