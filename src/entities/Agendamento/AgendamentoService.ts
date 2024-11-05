import { injectable } from 'inversify'

import { AgendamentoDTO, AgendamentoServiceInterface } from './AgendamentoDTO'

@injectable()
export default class AgendamentoService implements AgendamentoServiceInterface {
  private agendamentos: AgendamentoDTO[] = []

  getAvailableTime(
    horarios_disponiveis: string[],
    data_horario: string
  ): boolean {
    return horarios_disponiveis.includes(data_horario)
  }

  async createAgendamento(
    agendamento: AgendamentoDTO
  ): Promise<AgendamentoDTO> {
    this.agendamentos.push(agendamento)

    return agendamento
  }
}
