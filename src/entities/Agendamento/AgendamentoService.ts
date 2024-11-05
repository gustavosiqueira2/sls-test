import { injectable } from 'inversify'

import { AgendamentoDTO } from './AgendamentoDTO'

@injectable()
export default class AgendamentoService {
  private agendamentos: AgendamentoDTO[] = []

  createAgendamento(agendamento: AgendamentoDTO): AgendamentoDTO {
    this.agendamentos.push(agendamento)

    return agendamento
  }
}
