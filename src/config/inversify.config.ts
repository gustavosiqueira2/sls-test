import { Container } from 'inversify'

import AgendaController from '@entities/Agenda/AgendaController'
import AgendaService from '@entities/Agenda/AgendaService'
import AgendamentoController from '@entities/Agendamento/AgendamentoController'
import AgendamentoService from '@entities/Agendamento/AgendamentoService'

const container = new Container()

container.bind<AgendaController>(AgendaController).toSelf()
container.bind<AgendaService>(AgendaService).toSelf()

container.bind<AgendamentoController>(AgendamentoController).toSelf()
container.bind<AgendamentoService>(AgendamentoService).toSelf()

export default container
