import { APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from 'src/constants/HTTP_STATUS_CODE'
import responseJson from 'src/utils/responseJson'

import AgendaService from './AgendaService'

@injectable()
export default class AgendaController {
  private AgendaService: AgendaService

  constructor(@inject(AgendaService) AgendaService: AgendaService) {
    this.AgendaService = AgendaService
  }

  public async getAgendas(): Promise<APIGatewayProxyResult> {
    try {
      const agenda = await this.AgendaService.getAgenda()

      return responseJson(HTTP_STATUS_CODE.OK, agenda)
    } catch (error) {
      console.error('Error creating agendamento:', error)
      return responseJson(HTTP_STATUS_CODE['Internal Server Error'], {
        message: 'Internal Server Error'
      })
    }
  }
}
