import { APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from 'src/constants/HTTP_STATUS_CODE'
import responseJson from 'src/utils/responseJson'

import AgendaService from '@entities/Agenda/AgendaService'

import { Required } from '@middleware/required'

import { AgendamentoDTO } from './AgendamentoDTO'
import AgendamentoService from './AgendamentoService'

@injectable()
export default class AgendamentoController {
  private AgendaService: AgendaService
  private agendamentoService: AgendamentoService

  constructor(
    @inject(AgendaService) AgendaService: AgendaService,
    @inject(AgendamentoService) AgendamentoService: AgendamentoService
  ) {
    this.AgendaService = AgendaService
    this.agendamentoService = AgendamentoService
  }

  @Required<AgendamentoDTO>(['medico_id', 'paciente_nome', 'data_horario'])
  public async createAgendamento(
    body: AgendamentoDTO
  ): Promise<APIGatewayProxyResult> {
    try {
      const doctorAgenda = await this.AgendaService.getDoctorAgenda(
        body.medico_id
      )

      if (!doctorAgenda) {
        return responseJson(HTTP_STATUS_CODE['Bad Request'], {
          message: 'Medico não encontrado'
        })
      }

      const isAvailable = await this.agendamentoService.getAvailableTime(
        doctorAgenda.horarios_disponiveis,
        body.data_horario
      )

      if (!isAvailable) {
        return responseJson(HTTP_STATUS_CODE['Bad Request'], {
          message: 'Este horário não esta disponível'
        })
      }

      const createdAgendamento =
        await this.agendamentoService.createAgendamento(body)

      return responseJson(HTTP_STATUS_CODE.Created, {
        message: 'Agendamento realizado com sucesso',
        agendamento: createdAgendamento
      })
    } catch (error) {
      console.error('Error creating agendamento:', error)
      return responseJson(HTTP_STATUS_CODE['Internal Server Error'], {
        message: 'Internal Server Error'
      })
    }
  }
}
