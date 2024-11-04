import 'reflect-metadata'

import { APIGatewayProxyHandler } from 'aws-lambda'

import container from '@config/inversify.config'

import AgendaController from '@entities/Agenda/AgendaController'
import AgendamentoController from '@entities/Agendamento/AgendamentoController'
import { AgendamentoDTO } from '@entities/Agendamento/AgendamentoDTO'

export const getAgenda: APIGatewayProxyHandler = async () => {
  const Agendamento = container.get<AgendaController>(AgendaController)

  return await Agendamento.getAgenda()
}

export const createAgendamento: APIGatewayProxyHandler = async (event) => {
  const Agendamento = container.get<AgendamentoController>(
    AgendamentoController
  )

  const body = JSON.parse(event.body || '{}') as AgendamentoDTO

  return await Agendamento.createAgendamento(body)
}
