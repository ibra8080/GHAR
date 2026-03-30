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

// ===== HERO SLIDES =====
export async function getHeroSlides() {
  try {
    return await client.fetch(`
      *[_type == "heroSlide"] | order(order asc) {
        "image": image.asset->url,
        "title": title.en,
        "titleAr": title.ar,
        "titleDe": title.de,
        "subtitle": subtitle.en,
        "subtitleAr": subtitle.ar,
        "subtitleDe": subtitle.de,
      }
    `);
  } catch {
    return [];
  }
}

// ===== STATS =====
export async function getStats() {
  try {
    return await client.fetch(`
      *[_type == "stat"] | order(order asc) {
        number,
        "label": label.en,
        "labelAr": label.ar,
        "labelDe": label.de,
      }
    `);
  } catch {
    return [];
  }
}

// ===== SITE SETTINGS =====
export async function getSiteSettings() {
  try {
    return await client.fetch(`
      *[_type == "siteSettings"][0] {
        address,
        city,
        email,
        phone,
        facebook,
        instagram,
        twitter,
        linkedin,
        youtube,
        launchgoodUrl,
        bankIban,
        bankBic,
        bankName,
      }
    `);
  } catch {
    return null;
  }
}

// ===== ABOUT CONTENT =====
export async function getAboutContent() {
  try {
    return await client.fetch(`
      *[_type == "aboutContent"][0] {
        "story1": story1.en,
        "story1Ar": story1.ar,
        "story1De": story1.de,
        "story2": story2.en,
        "story2Ar": story2.ar,
        "story2De": story2.de,
        "story3": story3.en,
        "story3Ar": story3.ar,
        "story3De": story3.de,
        "mission": mission.en,
        "missionAr": mission.ar,
        "missionDe": mission.de,
        "vision": vision.en,
        "visionAr": vision.ar,
        "visionDe": vision.de,
        values,
      }
    `);
  } catch {
    return null;
  }
}