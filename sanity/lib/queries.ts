import { client } from './client';

// ===== PROJECTS =====
export async function getProjects() {
  try {
    return await client.fetch(`
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
  } catch {
    return [];
  }
}

// ===== NEWS =====
export async function getNews() {
  try {
    return await client.fetch(`
      *[_type == "news"] | order(date desc) {
        "id": _id,
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
  } catch {
    return [];
  }
}

// ===== TEAM =====
export async function getTeam() {
  try {
    return await client.fetch(`
      *[_type == "teamMember"] | order(order asc) {
        name,
        "role": role.en,
        "roleAr": role.ar,
        "roleDe": role.de,
        "image": image.asset->url,
      }
    `);
  } catch {
    return [];
  }
}

// ===== PARTNERS =====
export async function getPartners() {
  try {
    return await client.fetch(`
      *[_type == "partner"] | order(order asc) {
        name,
        "image": logo.asset->url,
        website,
      }
    `);
  } catch {
    return [];
  }
}