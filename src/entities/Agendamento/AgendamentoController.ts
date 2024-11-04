import { APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'inversify'

import { Required } from '@middleware/required'

import { AgendamentoDTO } from './AgendamentoDTO'
import AgendamentoService from './AgendamentoService'

@injectable()
export default class AgendamentoController {
  private agendamentoService: AgendamentoService

  constructor(@inject(AgendamentoService) myService: AgendamentoService) {
    this.agendamentoService = myService
  }

  @Required<AgendamentoDTO>(['medico_id', 'paciente_nome', 'data_horario'])
  public async createAgendamento(
    body: AgendamentoDTO
  ): Promise<APIGatewayProxyResult> {
    try {
      const createdAgendamento =
        await this.agendamentoService.createAgendamento(body)

      return {
        statusCode: 201,
        body: JSON.stringify({
          mensagem: 'Agendamento realizado com sucesso',
          agendamento: createdAgendamento
        })
      }
    } catch (error) {
      console.error('Error creating agendamento:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
      }
    }
  }
}
