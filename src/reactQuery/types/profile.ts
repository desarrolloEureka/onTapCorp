export interface DataFormSorted {
  name?: DataFormValues;
  nit?: DataFormValues;
  phone?: DataFormValues;
  address?: DataFormValues;
  urlsCompany?: UrlDataFormValues[];
  urlsCommercial?: UrlDataFormValues[];
}

export type SocialDataForm = {
  name?: DataFormValues;
  nit?: DataFormValues;
  phone?: DataFormValues;
  address?: DataFormValues;
  urlsCompany?: UrlDataFormValues[];
  urlsCommercial?: UrlDataFormValues[];
};

export interface DataForm {
  social?: SocialDataForm;
}

export interface DataFormSortedArray {
  social: [string, any][];
}

export type DataFormValues = {
  label?: string;
  text?: string;
  checked?: boolean;
  principal?: boolean;
  icon?: string;
  order: number;
};

export type UrlDataFormValues = {
  label?: string;
  name: string;
  url: string;
  icon: string;
  checked?: boolean;
  principal?: boolean;
  order: number;
};

export type IndexDataForm =
| 'name'
| 'nit'
| 'phone'
| 'address'
| 'urlsCompany'
| 'urlsCommercial'

export type NetworksSubIndexDataForm = 'name' | 'url' | 'icon';
export type handleDataProps = {
  name: string;
  text: string;
  subindex?:
  | NetworksSubIndexDataForm;
  key?: number;
  currentDataRef?: any;
};
export type handleDataNetworksProps = {
  name: string;
  text: string;
  subindex?: NetworksSubIndexDataForm;
  key?: number;
};

export interface ItemFormParams {
  label: string;
  name: IndexDataForm;
  handleSwitch: (e: any) => void;
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  checked?: boolean;
  icon?: string;
  switchAction?: boolean;
  handleDeleteData?: ({ name }: { name: string }) => void;
  handleModalAlert?: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  value?: string | undefined;
  myValue?: DataFormValues;
  index: IndexDataForm;
  subindex?: number;
  withCheck?: boolean;
  subLabel?:
  | NetworksSubIndexDataForm;
}
