import { injectable } from 'inversify'

import { AgendamentoDTO, AgendamentoServiceInterface } from './AgendamentoDTO'
import AgendamentoMock from './AgendamentoMock'

@injectable()
export default class AgendamentoService implements AgendamentoServiceInterface {
  private AgendamentoMock = new AgendamentoMock()

  getAvailableTime(
    horarios_disponiveis: string[],
    data_horario: string
  ): boolean {
    return horarios_disponiveis.includes(data_horario)
  }

  async createAgendamento(
    agendamento: AgendamentoDTO
  ): Promise<AgendamentoDTO> {
    return this.AgendamentoMock.createAgendamento(agendamento)
  }
}
