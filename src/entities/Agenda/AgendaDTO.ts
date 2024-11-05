export interface AgendaServiceInterface {
  getAgenda: () => Promise<Agenda>
  getDoctorAgenda: (id: number) => Promise<DoctorAgenda | undefined>
}

export interface Agenda {
  medicos: DoctorAgenda[]
}

type DoctorAgenda = {
  id: number
  nome: string
  especialidade: string
  horarios_disponiveis: string[]
}
