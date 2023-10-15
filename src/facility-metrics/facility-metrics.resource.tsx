import React from "react";
import { openmrsFetch } from "@openmrs/esm-framework";
import dayjs from "dayjs";
import {
  BuildingInsights_2,
  DataCenter,
  Datastore,
  Db2Database,
  GroupAccess,
  Collaborate,
  IbmMq,
  LogicalPartition,
  LoadBalancerPool,
  Microscope,
  Rss,
  Product,
} from "@carbon/react/icons";
import useSWR from "swr";

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

export function useFetchTransactionCount(
  uuid: string,
  startDate,
  endDate,
  type = "fhirProfile" || "syncTask"
) {
  // const start = dayjs(startDate).format("YYYY-MM-DD");
  // const end = dayjs(endDate).format("YYYY-MM-DD");
  const apiURL =
    type === "fhirProfile"
      ? "/ws/rest/v1/syncfhirresourcestats?profile"
      : "/ws/rest/v1/synctaskstats?type";

  const { data, error } = useSWR<
    { data: { results: Record<string, any> } },
    Error
  >(
    `${apiURL}=${uuid}&startDate=${startDate}&endDate=${endDate}`,
    openmrsFetch
  );

  return {
    count: data?.data["count"],
    isError: error,
  };
}

export function useGetProfiles() {
  const profiles: Array<exchangeProfile> = [
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "ART ACCESS",
      type: "fhirProfile",
      icon: <GroupAccess size={25} />,
      incoming: useFetchTransactionCount(
        "4c4e9551-d9d6-4882-93bd-e61a42e2f755",
        "2022-01-01",
        "2022-09-01",
        "syncTask"
      ),
      outgoing: useFetchTransactionCount(
        "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
        "2022-01-01",
        "2022-09-01",
        "fhirProfile"
      ),
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "ALIS",
      type: "fhirProfile",
      icon: <Microscope size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "VL",
      type: "fhirProfile",
      icon: <LoadBalancerPool size={25} />,
      incoming: useFetchTransactionCount(
        "3396dcf0-2106-4e73-9b90-c63978c3a8b4",
        "2022-01-01",
        "2022-09-01",
        "syncTask"
      ),
      outgoing: useFetchTransactionCount(
        "3551ca84-06c0-432b-9064-fcfeefd6f4ec",
        "2022-01-01",
        "2022-09-01",
        "syncTask"
      ),
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "eCBSS",
      type: "fhirProfile",
      icon: <IbmMq size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "PIRS",
      type: "fhirProfile",
      icon: <LogicalPartition size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "eHMIS",
      type: "fhirProfile",
      icon: <DataCenter size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "SHR",
      type: "fhirProfile",
      icon: <Datastore size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "CR",
      type: "fhirProfile",
      icon: <Collaborate size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "CBS",
      type: "fhirProfile",
      icon: <Rss size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "PR",
      type: "fhirProfile",
      icon: <Product size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "HF",
      type: "fhirProfile",
      icon: <BuildingInsights_2 size={25} />,
    },
    {
      uuid: "0a7fff77-6ac7-416c-831e-4e3f1f2c853b",
      name: "DWH",
      type: "fhirProfile",
      icon: <Db2Database size={25} />,
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
