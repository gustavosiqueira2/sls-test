import { injectable } from 'inversify'

import { Agenda } from './AgendaDTO'

@injectable()
export default class AgendaService {
  private agenda: Agenda = {
    medicos: [
      {
        id: 1,
        nome: 'Dr. João Silva',
        especialidade: 'Cardiologista',
        horarios_disponiveis: [
          '2024-10-05 09:00',
          '2024-10-05 10:00',
          '2024-10-05 11:00'
        ]
      },
      {
        id: 2,
        nome: 'Dra. Maria Souza',
        especialidade: 'Dermatologista',
        horarios_disponiveis: ['2024-10-06 14:00', '2024-10-06 15:00']
      }
    ]
  }

  public async getAgenda() {
    return this.agenda
  }
}
