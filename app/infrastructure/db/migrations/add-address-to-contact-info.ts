import { ContactInfo } from '~/infrastructure/models/foundation-info/foundationInfoContact';

const DOCUMENT_ID_TO_UPDATE = '683833693008546249bba09e';
const NEW_ADDRESS_DATA = {
  uk: '1054, м. Київ, вул. Б. Хмельницького, 68, кв. 63',
  en: '68 Bohdana Khmelnytskoho St, apt. 63, Kyiv, 1054'
};

export async function up() {
  const result = await ContactInfo.findByIdAndUpdate(
    DOCUMENT_ID_TO_UPDATE,
    { $set: { address: NEW_ADDRESS_DATA } },
    { new: true }
  );

  if (!result) {
    throw new Error(`Migration UP failed: Document with id=${DOCUMENT_ID_TO_UPDATE} not found.`);
  }
}

export async function down() {
  const result = await ContactInfo.findByIdAndUpdate(DOCUMENT_ID_TO_UPDATE, { $unset: { address: '' } }, { new: true });

  if (!result) {
    throw new Error(`Migration DOWN failed: Document with id=${DOCUMENT_ID_TO_UPDATE} not found.`);
  }
}
