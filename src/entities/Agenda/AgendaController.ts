import { APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from 'src/constants/HTTP_STATUS_CODE'

import AgendaService from './AgendaService'

@injectable()
export default class AgendaController {
  private AgendaService: AgendaService

  constructor(@inject(AgendaService) AgendaService: AgendaService) {
    this.AgendaService = AgendaService
  }

  public async getAgenda(): Promise<APIGatewayProxyResult> {
    try {
      const agenda = await this.AgendaService.getAgenda()

      return {
        statusCode: HTTP_STATUS_CODE.OK,
        body: JSON.stringify(agenda)
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
