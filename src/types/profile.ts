export interface DataForm {
  name?: DataFormValues;
  last_name?: DataFormValues;
  profession?: DataFormValues;
  occupation?: DataFormValues;
  address?: DataFormValues;
  company?: DataFormValues;
  position?: DataFormValues;
  professional_profile?: DataFormValues;
  phones?: DataFormValues[];
  emails?: DataFormValues[];
  education?: EducationDataFormValues[];
  professional_career?: CareerDataFormValues[];
  urls?: UrlDataFormValues[];
  other_competencies?: DataFormValues;
  skills?: DataFormValues;
  languages?: DataFormValues;
  achievements_recognitions?: DataFormValues;
}

export type DataFormValues = {
  label?: string;
  text?: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
};

export type EducationDataFormValues = {
  label?: string;
  title: string;
  institution: string;
  year: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
};

export type CareerDataFormValues = {
  label?: string;
  company: string;
  position: string;
  data_init: string;
  data_end: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
};

export type UrlDataFormValues = {
  label?: string;
  name: string;
  url: string;
  icon: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
};

export type IndexDataForm =
  | 'name'
  | 'last_name'
  | 'profession'
  | 'occupation'
  | 'address'
  | 'company'
  | 'position'
  | 'professional_profile'
  | 'other_competencies'
  | 'skills'
  | 'languages'
  | 'achievements_recognitions'
  | 'phones'
  | 'emails'
  | 'education'
  | 'professional_career'
  | 'urls';

export type handleDataProps = { name: string; text: string; subindex?: string; };

export interface ItemFormParams {
  label: string;
  name: IndexDataForm;
  handleSwitch: (e: any) => void;
  handleData: ({ name, text, subindex }: handleDataProps) => void;
  checked?: boolean;
  icon?: string;
  deleteAction?: boolean;
  handleDeleteData?: ({ name }: { name: string }) => void;
  handleModalAlert?: ({ name }: { name: string }) => void;
}