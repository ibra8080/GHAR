import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('GHAR Foundation')
    .items([

      // ─── PAGES ───────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .id('pages')
            .title('Pages')
            .items([

              // Home
              S.listItem()
                .title('Home')
                .icon(() => '🏠')
                .child(
                  S.list()
                    .id('home')
                    .title('Home')
                    .items([
                      S.documentTypeListItem('heroSlide').title('Hero Slides'),
                      S.documentTypeListItem('stat').title('Statistics'),
                      S.listItem()
                        .id('homeContent')
                        .title('Quote')
                        .icon(() => '💬')
                        .child(
                          S.document()
                            .schemaType('homeContent')
                            .documentId('homeContent')
                        ),
                    ])
                ),

              // About
              S.listItem()
                .title('About')
                .icon(() => '🏢')
                .child(
                  S.list()
                    .id('about')
                    .title('About')
                    .items([
                      S.listItem()
                        .id('aboutContent')
                        .title('About Content')
                        .icon(() => 'ℹ️')
                        .child(
                          S.document()
                            .schemaType('aboutContent')
                            .documentId('aboutContent')
                        ),
                      S.documentTypeListItem('teamMember').title('Team Members'),
                      S.documentTypeListItem('partner').title('Partners'),
                    ])
                ),

              // Projects
              S.documentTypeListItem('project')
                .title('Projects')
                .icon(() => '🗂️'),

              // News
              S.documentTypeListItem('news')
                .title('News')
                .icon(() => '📰'),

              // Jobs
              S.documentTypeListItem('job')
                .title('Jobs')
                .icon(() => '💼'),

              // Transparency
              S.listItem()
                .id('transparency')
                .title('Transparency')
                .icon(() => '📑')
                .child(
                  S.document()
                    .schemaType('transparencyContent')
                    .documentId('transparencyContent')
                ),

              // Privacy Policy
              S.listItem()
                .id('privacyPolicy')
                .title('Privacy Policy')
                .icon(() => '🔒')
                .child(
                  S.document()
                    .schemaType('privacyContent')
                    .documentId('privacyContent')
                ),
            ])
        ),

      S.divider(),

      // ─── SETTINGS ────────────────────────────────────────
      S.listItem()
        .title('Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .id('settings')
            .title('Settings')
            .items([
              S.listItem()
                .id('siteSettings')
                .title('Site Settings')
                .icon(() => '🌐')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .id('designSettings')
                .title('Design Settings')
                .icon(() => '🎨')
                .child(
                  S.document()
                    .schemaType('pageSettings')
                    .documentId('pageSettings')
                ),
            ])
        ),
    ])