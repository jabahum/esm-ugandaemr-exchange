declare module "@carbon/react";
declare module "*.css";
declare module "*.scss";
declare module "*.png";
declare module "*.svg";

declare type SideNavProps = object;

declare type link = {
  rel?: string;
  uri?: string;
  resourceAlias?: string;
};

declare type fhirProfile = {
  uuid: string;
  name: string;
  resourceTypes?: string;
  profileEnabled?: string;
  patientIdentifierType?: {
    uuid?: string;
    display?: string;
    links?: Array<link>;
  };
  numberOfResourcesInBundle?: number;
  durationToKeepSyncedResources?: number;
  generateBundle?: boolean;
  caseBasedProfile?: boolean;
  caseBasedPrimaryResourceType?: string;
  caseBasedPrimaryResourceTypeId?: string;
  resourceSearchParameter?: string;
  conceptSource?: string;
  url?: string;
  syncLimit?: string;
  urlToken?: string;
  urlUserName?: string;
  urlPassword?: string;
  links?: Array<link>;
  actions: any;
};

declare type exchangeProfile = {
  uuid: string;
  name: string;
  type: "fhirProfile" | "syncTask";
};

declare type SyncTaskType = {
  uuid: string;
  name: string;
};

declare type SyncFHIRProfile = {
  uuid: string;
  name: string;
};

declare type TransactionCount = {
  count: number;
};

declare type HIEProfilesInterface = {
  alis: ProfileInterface;
  artAccess: ProfileInterface;
  cbs: ProfileInterface;
  clientRegistry: ProfileInterface;
  ecbs: ProfileInterface;
  ehmis: ProfileInterface;
  facilitySHR: ProfileInterface;
  pirs: ProfileInterface;
  smsReminders: ProfileInterface;
  viralLoad: ProfileInterface;
};

declare type ProfileInterface = {
  name: string;
  incomingCount?: number;
  outgoingCount?: number;
  incoming?: [];
  outgoing?: [];
};
