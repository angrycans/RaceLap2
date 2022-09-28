import { apis } from '@race-lap/app-helper/dist/native';

export async function getAuthInfo() {
  const {
    errCode: getUserListFailed,
    errMsg: getUserListErrMsg,
    data: userList,
  } = await apis.user.getList();
  if (getUserListFailed || getUserListErrMsg) {
    throw new Error(getUserListErrMsg || 'Get User List Failed !');
  }
  const auth = userList?.[0] || null;

  // if (auth) {
  //   const {
  //     errCode,
  //     errMsg,
  //     data: carrierList,
  //   } = await apis.carrier.getList({
  //     id: auth.carrierId,
  //   });

  //   if (errCode) {
  //     throw new Error(
  //       errMsg || `Get Carrier List By Id = ${auth.carrierId} Failed !`,
  //     );
  //   }
  //   const currentCarrier = carrierList?.[0];
  //   if (currentCarrier) {
  //     auth.carrier = currentCarrier;
  //   }
  // }

  console.log('auth --->', auth);

  return auth;
}

export default getAuthInfo;
