import { inject, injectable } from 'inversify'

import AgendaService from './AgendaService'

@injectable()
export default class AgendaController {
  private AgendaService: AgendaService

  constructor(@inject(AgendaService) AgendaService: AgendaService) {
    this.AgendaService = AgendaService
  }

  public async getAgenda() {
    try {
      const agenda = await this.AgendaService.getAgenda()

      return {
        statusCode: 200,
        body: JSON.stringify(agenda)
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
