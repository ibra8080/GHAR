type DonorRow = { project: string | null; amount: number | null };
type ProjectRow = { id: string; raised?: number | null };

export function computeRaisedByProject(
  donors: DonorRow[] | null,
  projects: ProjectRow[]
): Record<string, number> {
  const raisedByProject: Record<string, number> = {};
  let generalTotal = 0;

  for (const donor of donors || []) {
    if (!donor.project) continue;
    const amount = donor.amount || 0;
    if (donor.project === "general" || donor.project === "zakat") {
      generalTotal += amount;
      continue;
    }
    raisedByProject[donor.project] = (raisedByProject[donor.project] || 0) + amount;
  }

  // الرقم اليدوي من Sanity
  for (const project of projects) {
    raisedByProject[project.id] = (raisedByProject[project.id] || 0) + (project.raised || 0);
  }

  // توزيع general وzakat بالتساوي على كل المشاريع
  if (generalTotal > 0 && projects.length > 0) {
    const perProject = generalTotal / projects.length;
    for (const project of projects) {
      raisedByProject[project.id] += perProject;
    }
  }

  // تقريب لخانتين عشرية (بدل €487.833 اللي ظهر على الكارت)
  for (const key of Object.keys(raisedByProject)) {
    raisedByProject[key] = Math.round(raisedByProject[key] * 100) / 100;
  }

  return raisedByProject;
}
