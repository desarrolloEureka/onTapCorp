const dataPrincipalSocialProfileEmail = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: true,
  professional: false,
  icon: 'EmailOutlinedIcon',
  order: 10,
};
const dataPrincipalSocialProfilePhone = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: true,
  professional: false,
  icon: 'LocalPhoneOutlinedIcon',
  order: 9,
};

const dataPrincipalProfileEmail = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: false,
  professional: true,
  icon: 'EmailOutlinedIcon',
  order: 10,
};
const dataPrincipalProfilePhone = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: false,
  professional: true,
  icon: 'LocalPhoneOutlinedIcon',
  order: 9,
};

const dataPrincipalEducations = {
  label: '',
  title: '',
  institution: '',
  year: '',
  checked: false,
  principal: true,
  social: false,
  professional: true,
  icon: '',
  order: 11,
};
const dataPrincipalCareer = {
  label: '',
  company: '',
  position: '',
  data_init: '',
  data_end: '',
  checked: false,
  principal: true,
  social: false,
  professional: true,
  icon: '',
  order: 12,
};
const dataPrincipalUrl = {
  label: '',
  name: '',
  url: '',
  icon: '',
  checked: false,
  principal: true,
  social: false,
  professional: true,
  order: 13,
};

const dataPrincipalSocialUrl = {
  label: 'Url',
  name: '',
  url: '',
  icon: 'document-attach-outline',
  checked: false,
  principal: true,
  social: false,
  professional: false,
  order: 13,
};

export const socialProfile = {
  name: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: false,
    icon: 'PersonOutlinedIcon',
    order: 1,
  },
  nit: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: false,
    icon: 'document-attach-outline',/* Ionicons */
    order: 2,
  },
  sector: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: false,
    icon: 'bag-outline',/* Ionicons */
    order: 3,
  },
  phone: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: false,
    icon: 'phone',/* Feather */
    order: 4,
  },
  urlsCompany: [dataPrincipalSocialUrl,dataPrincipalSocialUrl],
  urlsCommercial: [dataPrincipalSocialUrl],
};

export const professionalProfile = {
  name: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 1,
  },
  last_name: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 2,
  },
  profession: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'FilePresentOutlinedIcon',
    order: 3,
  },
  occupation: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'WorkOutlineOutlinedIcon',
    order: 4,
  },
  address: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'ExploreOutlinedIcon',
    order: 5,
  },
  company: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'WorkOutlineOutlinedIcon',
    order: 6,
  },
  position: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'AttachFileOutlinedIcon',
    order: 7,
  },
  professional_profile: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 8,
  },
  other_competencies: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'AccessibilityOutlinedIcon',
    order: 14,
  },
  skills: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 15,
  },
  languages: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'TranslateIcon',
    order: 16,
  },
  achievements_recognitions: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'AccessibilityOutlinedIcon',
    order: 17,
  },
  phones: [dataPrincipalProfilePhone],
  emails: [dataPrincipalProfileEmail],
  education: [dataPrincipalEducations],
  professional_career: [dataPrincipalCareer],
  urls: [dataPrincipalUrl],
};

export const profile = {
  social: socialProfile,
  professional: professionalProfile,
};

export const profileOld = {
  name: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 1,
  },
  last_name: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 2,
  },
  profession: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'SchoolIcon',
    order: 3,
  },
  occupation: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'WorkOutlineOutlinedIcon',
    order: 4,
  },
  address: {
    label: '',
    text: '',
    checked: false,
    social: true,
    professional: true,
    icon: 'ExploreOutlinedIcon',
    order: 5,
  },
  company: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'FactoryIcon',
    order: 6,
  },
  position: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'AssignmentIndIcon',
    order: 7,
  },
  professional_profile: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'NoteAltIcon',
    order: 8,
  },
  phones: [dataPrincipalProfilePhone],
  emails: [dataPrincipalProfileEmail],
  education: [dataPrincipalEducations],
  professional_career: [dataPrincipalCareer],
  urls: [dataPrincipalUrl],
  other_competencies: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'EngineeringIcon',
    order: 14,
  },
  skills: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'PersonOutlinedIcon',
    order: 15,
  },
  languages: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'TranslateIcon',
    order: 16,
  },
  achievements_recognitions: {
    label: '',
    text: '',
    checked: false,
    social: false,
    professional: true,
    icon: 'MilitaryTechIcon',
    order: 17,
  },
};
