export default class HelperGlobal {
  public yearsDate() {
    const yearNow = new Date().getFullYear();
    const years = [];
    for (let i = 2023; i <= yearNow; i++) {
      years.push({ id: i, name: i.toString() });
    }
    return years;
  }
}
