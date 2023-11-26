import type { ContactCreationDTO } from "@/dtos/contato-dto";

export class ContatoService {

    private backendUrl = 'http://localhost:3000'; // Substitua pela URL do seu servidor NestJS

    async criarContato(contato : ContactCreationDTO): Promise<ContactCreationDTO> {
        const url = `${this.backendUrl}/contact`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contato),
        });
        const data = await response.json();
        return data;
      }

}
