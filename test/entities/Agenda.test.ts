import 'reflect-metadata'

import { describe, test } from '@jest/globals'

import container from '@config/inversify.config'

import HTTP_STATUS_CODE from '@constants/HTTP_STATUS_CODE'

import AgendaController from '@entities/Agenda/AgendaController'
import { Agenda } from '@entities/Agenda/AgendaDTO'
import AgendaService from '@entities/Agenda/AgendaService'

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

beforeAll(() => {
  jest
    .spyOn(AgendaService.prototype, 'getAgenda')
    .mockResolvedValue(AGENDA_MOCK)
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('Agenda', () => {
  test('get agenda of all doctors', async () => {
    const Agenda = container.get<AgendaController>(AgendaController)

    const response = await Agenda.getAgendas()

    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.OK)
    expect(response.body).toEqual(JSON.stringify(AGENDA_MOCK))
  })

  test('get agenda of a doctor based on an ID', async () => {
    const Agenda = container.get<AgendaService>(AgendaService)

    const response = await Agenda.getDoctorAgenda(1)

    expect(response?.id).toEqual(1)
  })

  test('should not get a doctor agenda', async () => {
    const Agenda = container.get<AgendaService>(AgendaService)

    const response = await Agenda.getDoctorAgenda(99)

    expect(response?.id).toEqual(undefined)
  })
})
