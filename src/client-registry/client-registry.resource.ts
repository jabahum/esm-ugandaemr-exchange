import {
  FetchResponse,
  openmrsFetch,
  restBaseUrl,
  useConfig,
} from "@openmrs/esm-framework";
import useSWR from "swr";

const v =
  "custom:(patientId,uuid,identifiers,display," +
  "patientIdentifier:(uuid,identifier)," +
  "person:(gender,age,birthdate,birthdateEstimated,personName,addresses,display,dead,deathDate)," +
  "attributes:(value,attributeType:(uuid,display)))";
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

// get Patients
export function usePatients(q: string, includeDead: boolean) {
  const apiUrl = `${restBaseUrl}/patient?q=${q}&v=${v}&includeDead=${includeDead}&totalCount=true&limit=10`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    FetchResponse,
    Error
  >(apiUrl, openmrsFetch);

  return {
    patients: data?.data?.results || [],
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

// submit patients to CR
export function submitPatient(payload: Payload) {
  const config = useConfig();
  const { clientRegistryUrl } = config;
  const apiUrl = `${clientRegistryUrl}/Patient`;
  return openmrsFetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function startClientRegistryTask() {
  const apiUrl = `${restBaseUrl}/taskaction`;
  const payload = {
    action: "runtask",
    tasks: ["Send Viral Load Request to Central Server Task"],
  };
  return openmrsFetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export function extractErrorMessagesFromResponse(errorObject) {
  const fieldErrors = errorObject?.responseBody?.error?.fieldErrors;
  if (!fieldErrors) {
    return [errorObject?.responseBody?.error?.message ?? errorObject?.message];
  }
  return Object.values(fieldErrors).flatMap((errors: Array<Error>) =>
    errors.map((error) => error.message)
  );
}