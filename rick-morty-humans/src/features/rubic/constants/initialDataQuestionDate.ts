export const monthsDate = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

export const daysDate = Array.from({ length: 31 }, (_, index) => ({
  id: index + 1,
  name: (index + 1).toString(),
}));

export const yearsDate = () => {
  const yearNow = new Date().getFullYear();
  const years = [];
  for (let i = yearNow - 60; i <= yearNow; i++) {
    years.push({ id: i, name: i.toString() });
  }
  return years;
};
