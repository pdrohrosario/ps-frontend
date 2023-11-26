import type { UserCreationDTO, UserDTO } from "@/dtos/user-dto";

export class UserService {
    private backendUrl = 'http://localhost:3000'; // Substitua pela URL do seu servidor NestJS

    async getUserById(id: number): Promise<UserDTO> {
      const response = await fetch(`${this.backendUrl}/user/${id}`, {credentials: 'include'});
      return response.json();
    }

    async getUserByEmail(email: string): Promise<UserDTO> {
      const response = await fetch(`${this.backendUrl}/user/valida-cadastro/${email.valueOf()}`);
      const data = await response.json();
      return data;
    }

    async loginUsuario(email: string, password: string): Promise<UserDTO> {

          const response = await fetch(`${this.backendUrl}/user/login/${email}/${password}`);
          const data = await response.json();
          return data;

    }

    async createUser(userData: UserCreationDTO): Promise<UserDTO> {
      const url = `${this.backendUrl}/user`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    }

    async getParentByName(name: string): Promise<any> {
      const response = await fetch(`${this.backendUrl}/user/parent_name/${name}`);
      return response.json();
    }

    async getProfessorByName(name: string): Promise<any> {
      const response = await fetch(`${this.backendUrl}/user/teacher_name/${name}`);
      return response.json();
    }

    async updateUser(userData: UserDTO) : Promise<UserDTO> {
      const url = `${this.backendUrl}/user`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    }
  }
