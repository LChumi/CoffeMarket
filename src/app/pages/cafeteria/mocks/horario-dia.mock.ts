interface HorarioDia {
  dia: string;
  horas: string;
  cerrado?: boolean;
}

export const HORARIO_DIA: HorarioDia[] = [
  { dia: 'Lunes', horas: 'cerrado' },
  { dia: 'Martes', horas: '9:00 – 19:00' },
  { dia: 'Miércoles', horas: '9:00 – 19:00' },
  { dia: 'Jueves', horas: '9:00 – 21:00' },
  { dia: 'Viernes', horas: '9:00 – 21:00' },
  { dia: 'Sábado', horas: '9:00 – 21:00' },
  { dia: 'Domingo', horas: '9:00 – 18:00' },
];
