import { API_BASE_PATH } from "@/utils/constants";

import fetchExtended from "@/utils/fetchExtended";

export type TestDriveDataType = {
  name: string;
  email: string;
  phone: string;
  testDriveDate: string;
  preferredContact: string;
  carId: number;
  carName: string;
};

export const doTestDrive = async (data: TestDriveDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/test-drive`,
    method: "POST",
    payload: data,
  });

  return res;
};
