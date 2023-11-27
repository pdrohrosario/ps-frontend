import type { ContactCreationDTO } from '@/dtos/contato-dto'
import type { UserDTO } from '@/dtos/user-dto'

export class ContatoService {
  private backendUrl = 'http://localhost:3000' // Substitua pela URL do seu servidor NestJS

  async criarContato(contato: ContactCreationDTO): Promise<ContactCreationDTO> {
    const url = `${this.backendUrl}/contact`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contato)
    })
    const data = await response.json()
    return data
  }

  async getByContactByParentIDAndTeacherID(
    parentID: number,
    teacherId: number
  ): Promise<ContactCreationDTO[]> {
    try {
      const response = await fetch(`${this.backendUrl}/contact/${parentID}/${teacherId}`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getByParentID(userId: number): Promise<UserDTO[]> {
    const response = await fetch(`${this.backendUrl}/contact/parent/${userId}`)
    const data = await response.json()
    return data
  }
}
