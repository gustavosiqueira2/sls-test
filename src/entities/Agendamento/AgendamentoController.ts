import { APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from 'src/constants/HTTP_STATUS_CODE'

import { Required } from '@middleware/required'

import { AgendamentoDTO } from './AgendamentoDTO'
import AgendamentoService from './AgendamentoService'

@injectable()
export default class AgendamentoController {
  private agendamentoService: AgendamentoService

  constructor(
    @inject(AgendamentoService) AgendamentoService: AgendamentoService
  ) {
    this.agendamentoService = AgendamentoService
  }

  @Required<AgendamentoDTO>(['medico_id', 'paciente_nome', 'data_horario'])
  public async createAgendamento(
    body: AgendamentoDTO
  ): Promise<APIGatewayProxyResult> {
    try {
      const createdAgendamento =
        await this.agendamentoService.createAgendamento(body)

      return {
        statusCode: HTTP_STATUS_CODE.Created,
        body: JSON.stringify({
          mensagem: 'Agendamento realizado com sucesso',
          agendamento: createdAgendamento
        })
      }
    } catch (error) {
      console.error('Error creating agendamento:', error)
      return {
        statusCode: HTTP_STATUS_CODE['Internal Server Error'],
        body: JSON.stringify({ message: 'Internal Server Error' })
      }
    }
  }
}
