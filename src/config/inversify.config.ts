import { Container } from 'inversify'

import AgendamentoController from '../entities/Agendamento/AgendamentoController'
import AgendamentoService from '../entities/Agendamento/AgendamentoService'

const container = new Container()

container.bind<AgendamentoController>(AgendamentoController).toSelf()
container.bind<AgendamentoService>(AgendamentoService).toSelf()

export default container
