export interface AgendamentoServiceInterface {
  getAvailableTime: (
    horarios_disponiveis: string[],
    data_horario: string
  ) => boolean
  createAgendamento: (agendamento: AgendamentoDTO) => Promise<AgendamentoDTO>
}

export interface AgendamentoDTO {
  medico_id: number
  paciente_nome: string
  data_horario: string
}
