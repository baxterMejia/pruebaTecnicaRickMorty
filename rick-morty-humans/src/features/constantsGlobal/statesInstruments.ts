export const statesInstruments = [
  {
    id: 1,
    description: 'Borrador',
  },
  {
    id: 2,
    description: 'Disponible',
  },
  {
    id: 3,
    description: 'Aprobado',
  },
  {
    id: 4,
    description: 'Enviado',
  },
  {
    id: 5,
    description: 'Pausado',
  },
  {
    id: 6,
    description: 'Reanudado',
  },
  {
    id: 7,
    description: 'Cerrado',
  },
];

export enum statesInstrumentsEnum {
  draft = 1,
  available = 2,
  approved = 3,
  sent = 4,
  slow = 5,
  restart = 6,
  closed = 7,
}
