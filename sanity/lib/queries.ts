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

// ===== JOBS =====
export async function getJobs() {
  try {
    return await client.fetch(`
      *[_type == "job" && isActive == true] | order(order asc) {
        "id": slug.current,
        "title": title.en,
        "titleAr": title.ar,
        "titleDe": title.de,
        "desc": desc.en,
        "descAr": desc.ar,
        "descDe": desc.de,
        "requirements": requirements.en,
        "requirementsAr": requirements.ar,
        "requirementsDe": requirements.de,
        type,
        location,
        applyEmail,
      }
    `);
  } catch {
    return [];
  }
}

// ===== PAGE SETTINGS =====
export async function getPageSettings() {
  try {
    return await client.fetch(`
      *[_type == "pageSettings"][0] {
        "heroHome": heroHome.asset->url,
        "heroAbout": heroAbout.asset->url,
        "heroProjects": heroProjects.asset->url,
        "heroNews": heroNews.asset->url,
        "heroDonate": heroDonate.asset->url,
        "heroVolunteer": heroVolunteer.asset->url,
        "heroTransparency": heroTransparency.asset->url,
        "heroContact": heroContact.asset->url,
        "heroJobs": heroJobs.asset->url,
      }
    `);
  } catch {
    return null;
  }
}

// ===== TRANSPARENCY CONTENT =====
export async function getTransparencyContent() {
  try {
    return await client.fetch(`
      *[_type == "transparencyContent"][0] {
        allocations[] {
          "label": label.en,
          "labelAr": label.ar,
          "labelDe": label.de,
          percentage,
          color,
        },
        reports[] {
          year,
          "title": title.en,
          "titleAr": title.ar,
          "titleDe": title.de,
          "fileUrl": file.asset->url,
          size,
        },
        governance[] {
          "role": role.en,
          "roleAr": role.ar,
          "roleDe": role.de,
          name,
          "responsibility": responsibility.en,
          "responsibilityAr": responsibility.ar,
          "responsibilityDe": responsibility.de,
        },
        certifications[] {
          "name": name.en,
          "nameAr": name.ar,
          "nameDe": name.de,
          body,
          year,
        },
        efficiencyPercentage,
      }
    `);
  } catch {
    return null;
  }
}

// ===== PRIVACY CONTENT =====
export async function getPrivacyContent() {
  try {
    return await client.fetch(`
      *[_type == "privacyContent"][0] {
        lastUpdated,
        contentEn,
        contentAr,
        contentDe,
      }
    `);
  } catch {
    return null;
  }
}