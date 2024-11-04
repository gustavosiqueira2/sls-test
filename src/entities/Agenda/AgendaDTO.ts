export interface Agenda {
  medicos: Medico[]
}

type Medico = {
  id: number
  nome: string
  especialidade: string
  horarios_disponiveis: string[]
}
