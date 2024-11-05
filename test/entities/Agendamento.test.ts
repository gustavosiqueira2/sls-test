import 'reflect-metadata'

import { describe, test } from '@jest/globals'

import container from '@config/inversify.config'

import HTTP_STATUS_CODE from '@constants/HTTP_STATUS_CODE'

import { Agenda } from '@entities/Agenda/AgendaDTO'
import AgendaService from '@entities/Agenda/AgendaService'
import AgendamentoController from '@entities/Agendamento/AgendamentoController'
import AgendamentoService from '@entities/Agendamento/AgendamentoService'

const AGENDA_MOCK: Agenda = {
  medicos: [
    {
      id: 1,
      nome: 'Dr. João Silva',
      especialidade: 'Cardiologista',
      horarios_disponiveis: [
        '2024-10-05 09:00',
        '2024-10-05 10:00',
        '2024-10-05 11:00'
      ]
    },
    {
      id: 2,
      nome: 'Dra. Maria Souza',
      especialidade: 'Dermatologista',
      horarios_disponiveis: ['2024-10-06 14:00', '2024-10-06 15:00']
    }
  ]
}
const PAYLOAD = {
  medico_id: 1,
  paciente_nome: 'Gustavo',
  data_horario: '2024-10-05 10:00'
}

beforeAll(() => {
  jest
    .spyOn(AgendaService.prototype, 'getAgenda')
    .mockResolvedValue(AGENDA_MOCK)
  jest
    .spyOn(AgendamentoService.prototype, 'createAgendamento')
    .mockResolvedValue(PAYLOAD)
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('Agendamento', () => {
  test('create an appointment in a doctor is agenda', async () => {
    const Agendamento = container.get<AgendamentoController>(
      AgendamentoController
    )

    const response = await Agendamento.createAgendamento(PAYLOAD)

    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.Created)

    const agendamento = JSON.parse(response.body).agendamento

    expect(agendamento).toEqual(PAYLOAD)
  })

  test('should not find a doctor', async () => {
    const Agendamento = container.get<AgendamentoController>(
      AgendamentoController
    )

    const response = await Agendamento.createAgendamento({
      ...PAYLOAD,
      medico_id: 999
    })

    expect(response.statusCode).toEqual(HTTP_STATUS_CODE['Bad Request'])
  })

  test('should not find an available time', async () => {
    const Agendamento = container.get<AgendamentoController>(
      AgendamentoController
    )

    const response = await Agendamento.createAgendamento({
      ...PAYLOAD,
      data_horario: 'horario_nao_valido'
    })

    expect(response.statusCode).toEqual(HTTP_STATUS_CODE['Bad Request'])
  })
})
