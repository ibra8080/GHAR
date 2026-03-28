import { client } from './client';

// ===== PROJECTS =====
export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(_createdAt asc) {
      "id": slug.current,
      "image": image.asset->url,
      "title": title.en,
      "titleAr": title.ar,
      "titleDe": title.de,
      countryCode,
      category,
      raised,
      goal,
      "desc": desc.en,
      "descAr": desc.ar,
      "descDe": desc.de,
      "details": details.en,
      "detailsAr": details.ar,
      "detailsDe": details.de,
      impact,
    }
  `);
}

// ===== NEWS =====
export async function getNews() {
  return client.fetch(`
    *[_type == "news"] | order(date desc) {
      id,
      "image": image.asset->url,
      "title": title.en,
      "titleAr": title.ar,
      "titleDe": title.de,
      "excerpt": excerpt.en,
      "excerptAr": excerpt.ar,
      "excerptDe": excerpt.de,
      "date": date,
      category,
    }
  `);
}

// ===== TEAM =====
export async function getTeam() {
  return client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      name,
      "role": role.en,
      "roleAr": role.ar,
      "roleDe": role.de,
      "image": image.asset->url,
    }
  `);
}

// ===== PARTNERS =====
export async function getPartners() {
  return client.fetch(`
    *[_type == "partner"] | order(order asc) {
      name,
      "image": logo.asset->url,
      website,
    }
  `);
}