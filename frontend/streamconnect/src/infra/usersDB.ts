import axios from "axios";
import { UserLogin } from "../domain/UserLogin";
import { CreateUserDto } from "../domain/CreateUser";

interface LoginResponse {
  access_token: string;
}

export async function login(data: UserLogin): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>("http://localhost:3000/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          throw new Error("Usuário não encontrado");
        } else if (status === 401) {
          throw new Error("Senha incorreta");
        }
      }
      throw new Error("Erro desconhecido ao tentar fazer login");
    }
    throw new Error("Erro inesperado");
  }
}


export async function createUser(data: CreateUserDto): Promise<unknown> {
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      console.log(response);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error("Erro desconhecido ao Criar Usuario");
      }
      throw new Error("Erro inesperado");
    }
  }
