import 'reflect-metadata'

import { APIGatewayProxyHandler } from 'aws-lambda'

import container from '@config/inversify.config'

import AgendamentoController from '@entities/Agendamento/AgendamentoController'
import { AgendamentoDTO } from '@entities/Agendamento/AgendamentoDTO'

export const createAgendamento: APIGatewayProxyHandler = async (event) => {
  const Agendamento = container.get<AgendamentoController>(
    AgendamentoController
  )

  const body = JSON.parse(event.body || '{}') as AgendamentoDTO

  return await Agendamento.createAgendamento(body)
}
