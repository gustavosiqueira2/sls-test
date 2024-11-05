import { injectable } from 'inversify'

import { AgendaServiceInterface } from './AgendaDTO'
import AgendaMock from './AgendaMock'

@injectable()
export default class AgendaService implements AgendaServiceInterface {
  private AgendaMock = new AgendaMock()

  async getAgenda() {
    return this.AgendaMock.getAgenda()
  }

  async getDoctorAgenda(id: number) {
    return this.AgendaMock.getDoctorAgenda(id)
  }
}
