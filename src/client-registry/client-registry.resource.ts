export interface Payload {
  resourceType: string;
  identifier: Identifier[];
  name: Name[];
  telecom: Telecom[];
  maritalStatus: MaritalStatus;
  managingOrganization: ManagingOrganization;
  address: Address[];
  contact: Contact[];
  communication: Communication[];
  extension: Extension[];
  birthDate: string;
  deceasedBoolean: boolean;
  active: boolean;
  gender: string;
}

export interface Identifier {
  system: string;
  value: string;
  use: string;
}

export interface Name {
  given: string[];
  family: string;
  use: string;
}

export interface Telecom {
  value: string;
  system: string;
  use: string;
}

export interface MaritalStatus {
  coding: Coding[];
  text: string;
}

export interface Coding {
  code: string;
  system: string;
  display: string;
}

export interface ManagingOrganization {
  identifier: Identifier[];
  telecom: Telecom[];
  active: boolean;
  name: string;
}

export interface Address {
  use: string;
  district: string;
  country: string;
}

export interface Contact {
  relationship: Relationship[];
  name: Name;
  address: Address;
  telecom: Telecom[];
  gender: string;
}

export interface Relationship {
  text: string;
}

export interface Communication {
  language: Language;
  preferred: boolean;
}

export interface Language {
  coding: Coding[];
}

export interface Extension {
  url: string;
  valueReference: ValueReference;
}

export interface ValueReference {
  reference: string;
}
