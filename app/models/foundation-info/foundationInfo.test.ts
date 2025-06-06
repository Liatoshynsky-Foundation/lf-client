// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// import { FoundationInfo } from '~/models/foundation-info/foundationInfoBase';
// import { BrandingInfo } from '~/models/foundation-info/foundationInfoBranding';
// import { ContactInfo } from '~/models/foundation-info/foundationInfoContact';
// import { PublicInfo } from '~/models/foundation-info/foundationInfoPublic';

// describe('FoundationInfo discriminators', () => {
//   let mongoServer: MongoMemoryServer;

//   beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
//   });

//   afterEach(async () => {
//     await FoundationInfo.deleteMany({});
//   });

//   it('saves and retrieves BrandingInfo correctly', async () => {
//     const doc = await BrandingInfo.create({
//       slug: 'branding-info',
//       foundationName: { uk: 'Фундація', en: 'Foundation' },
//       supportButtonLink: 'https://support.com'
//     });

//     const fromDb = await FoundationInfo.findOne({ slug: 'branding-info' }).lean();
//     expect(fromDb?.slug).toBe('branding-info');
//     expect(fromDb?.foundationName.uk).toBe('Фундація');
//   });

//   it('saves and retrieves ContactInfo correctly', async () => {
//     const doc = await ContactInfo.create({
//       slug: 'contact-info',
//       phone: '+380123456789',
//       email: 'info@example.com',
//       contactButtonLabel: 'Зв’язатися',
//       socialLinks: [
//         { platform: 'facebook', link: 'https://fb.com', icon: 'fb-icon.svg' }
//       ]
//     });

//     const fromDb = await FoundationInfo.findOne({ slug: 'contact-info' }).lean();
//     expect(fromDb?.email).toBe('info@example.com');
//     expect(fromDb?.socialLinks).toHaveLength(1);
//   });

//   it('saves and retrieves PublicInfo correctly', async () => {
//     const doc = await PublicInfo.create({
//       slug: 'public-info',
//       copyright: {
//         uk: 'Всі права захищені',
//         en: 'All rights reserved'
//       },
//       links: [
//         {
//           label: { uk: 'Політика', en: 'Policy' },
//           href: '/policy'
//         }
//       ]
//     });

//     const fromDb = await FoundationInfo.findOne({ slug: 'public-info' }).lean();
//     expect(fromDb?.links[0].label.en).toBe('Policy');
//   });
// });
