import React from "react";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import {
  BuildingInsights_2,
  Chat,
  Collaborate,
  DataCenter,
  Datastore,
  Db2Database,
  GroupAccess,
  IbmMq,
  LoadBalancerPool,
  LogicalPartition,
  Microscope,
  Product,
  Rss,
} from "@carbon/react/icons";
import useSWR from "swr";
import dayjs from "dayjs";
import { TableAction } from "./hie-metrics/hie-dashboard.component";

export function useFetchSyncFhirProfiles() {
  const apiURL = "ws/rest/v1/syncfhirprofile?v=custom:(uuid,name)";

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<SyncFHIRProfile> } },
    Error
  >(apiURL, openmrsFetch);

  return {
    syncFhirProfiles: data?.data["results"],
    isLoading,
    isError: error,
  };
}

export function useFetchSyncTaskTypes() {
  const apiURL = "ws/rest/v1/synctasktype?v=custom:(uuid,name)";

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<SyncTaskType> } },
    Error
  >(apiURL, openmrsFetch);

  return {
    syncTaskTypes: data?.data["results"],
    isLoading,
    isError: error,
  };
}

export async function fetchTransactionCount(
  uuid: string,
  startDate,
  endDate,
  type = "fhirProfile" || "syncTask"
) {
  const abortController = new AbortController();
  const apiURL =
    type === "fhirProfile"
      ? `${restBaseUrl}syncfhirresourcestats?profile`
      : `${restBaseUrl}synctaskstats?type`;

  const response = await openmrsFetch(
    `${apiURL}=${uuid}&startDate=${startDate}&endDate=${endDate}`,
    {
      signal: abortController.signal,
    }
  );
  return response.json();
}

export async function fetchTransactions(
  uuid: string,
  startDate,
  endDate,
  type = "fhirProfile" || "syncTask"
) {
  const abortController = new AbortController();
  const apiURL =
    type === "fhirProfile"
      ? `${restBaseUrl}syncfhirresourcedetails?profile`
      : `${restBaseUrl}synctaskdetails?synctasktype`;

  return await openmrsFetch(
    `${apiURL}=${uuid}&startDate=${startDate}&endDate=${endDate}`,
    {
      signal: abortController.signal,
    }
  );
}

export function getProfiles() {
  const profiles: Array<exchangeProfile> = [
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "ART ACCESS",
      type: "fhirProfile",
      icon: <GroupAccess size={25} />,
      incoming: {
        url: "4c4e9551-d9d6-4882-93bd-e61a42e2f755",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "2f0ef683-c988-448b-b928-e3e2cf6657af",
      name: "ALIS",
      type: "fhirProfile",
      icon: <Microscope size={25} />,
      incoming: {
        url: "d4a3ebbb-e793-4e56-867c-0cf998e51f56",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "2f0ef683-c988-448b-b928-e3e2cf6657af",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "VL",
      type: "fhirProfile",
      icon: <LoadBalancerPool size={25} />,
      incoming: {
        url: "3396dcf0-2106-4e73-9b90-c63978c3a8b4",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "3551ca84-06c0-432b-9064-fcfeefd6f4ec",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
    {
      uuid: "99c4d715-4fcf-4d95-a946-257c6de05cf7",
      name: "eCBSS",
      type: "fhirProfile",
      icon: <IbmMq size={25} />,
      incoming: {
        url: "no-url",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
      outgoing: {
        url: "99c4d715-4fcf-4d95-a946-257c6de05cf7",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "6ebd85c8-127b-4c88-8a40-27defef367a9",
      name: "PIRS",
      type: "fhirProfile",
      icon: <LogicalPartition size={25} />,
      incoming: {
        url: "no-url",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "6ebd85c8-127b-4c88-8a40-27defef367a9",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
    {
      uuid: "c5f00f18-c0f6-4917-b973-2b7c1d2d4a81",
      name: "eHMIS",
      type: "fhirProfile",
      icon: <DataCenter size={25} />,
      incoming: {
        url: "no-url",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
      outgoing: {
        url: "c5f00f18-c0f6-4917-b973-2b7c1d2d4a81",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "SHR",
      type: "fhirProfile",
      icon: <Datastore size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "0b7eb397-4488-4a88-9967-a054b3c26d6f",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "CR",
      type: "fhirProfile",
      icon: <Collaborate size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "84242661-aadf-42e4-9431-bf8afefb4433",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "CBS",
      type: "fhirProfile",
      icon: <Rss size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "6511be5a-72f2-4638-a60b-78e31c3e2b28",
        total: 0,
        success: 0,
        failure: 0,
        type: "fhirProfile",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "PR",
      type: "fhirProfile",
      icon: <Product size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "HF",
      type: "fhirProfile",
      icon: <BuildingInsights_2 size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "DWH",
      type: "fhirProfile",
      icon: <Db2Database size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
    },
    {
      uuid: "08c5be38-1b79-4e27-b9ca-5da709aef5fe",
      name: "SMS",
      type: "syncTask",
      icon: <Chat size={25} />,
      incoming: {
        url: "",
        total: 0,
        success: 0,
        failure: 0,
        type: "",
      },
      outgoing: {
        url: "08c5be38-1b79-4e27-b9ca-5da709aef5fe",
        total: 0,
        success: 0,
        failure: 0,
        type: "syncTask",
      },
    },
  ];

  let maxIndex: number;
  if (profiles.length > 0) {
    const index: number = profiles.length / 8;
    const mod = profiles.length % 8;
    if (mod >= 1 && mod <= 7) {
      maxIndex = index;
    } else {
      maxIndex = index - 1;
    }
  }

  return {
    exchangeProfiles: profiles,
    maxPosition: maxIndex,
  };
}

export function mapDataElements(dataArray: Array<Record<string, string>>) {
  const arrayToReturn: Array<ProfileTransactions> = [];
  if (dataArray) {
    dataArray.map((profile: Record<string, any>) => {
      return arrayToReturn.push({
        name: profile.name,
        identifier: profile.identifier,
        status: profile.status,
        statusCode: profile.statusCode,
        comment: "Received",
        dateCreated: dayjs(profile.dateCreated).format("DD MMM YYYY"),
        actions: TableAction(),
      });
    });
  }

  return arrayToReturn;
}
