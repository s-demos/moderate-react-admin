/* Instruments */
import { dp } from "src/service";
import { createThunks } from "src/service/setup";
import names from "src/service/stores/names";
import httpApi from "./api";
import { GetAgencyDataApiParams, GetDetailActParams, Pos } from "./model";

const thunks = createThunks(names.posStore, {
  initCurrentDataAct: async (params: GetDetailActParams) => {
    const { id } = params;
    let posData: Pos;
    if (id) {
      const { data } = await httpApi.getPosDeatilApi(params);
      const { data: posItemList } = await httpApi.getPosItemListApi({
        posId: id,
      });
      posData = { ...data, cpdPosItems: posItemList };
    } else {
      posData = {
        posName: "",
        comment: "",
        cpdPosItems: [],
        id: 1,
        ownerId: "1",
      } as Pos;
    }
    dp("posStore", "setCurrentPosData", posData);
  },
  getDetailAct: async (params: GetDetailActParams) => {
    const { data } = await httpApi.getPosDeatilApi(params);
    dp("posStore", "setCurrentPosData", data);
  },
  // 添加pos的动作
  addAct: async (_, api) => {
    const { currentData } = api.getState().posStore;
    currentData && (await httpApi.createApi(currentData));
  },
  deleteAct: async (params: any) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (_, api) => {
    const { currentData } = api.getState().posStore;
    await httpApi.upadteApi(currentData!);
  },
  queryPostListAct: async (_, api) => {
    const { posTablePagedata } = api.getState().posStore;
    const { pageNum, pageSize } = posTablePagedata;
    const { data } = await httpApi.getPosListApi({
      pageNo: pageNum,
      pageSize,
    });
    data.list && dp("posStore", "setPostList", data.list);
  },
  getPosCarrierListAct: async () => {
    const { data } = await httpApi.getPosCarrierListApi();
    dp("posStore", "setPosCarrier", data);
  },
  getLocationListAct: async () => {
    const { data } = await httpApi.getLocationListApi();
    dp("posStore", "setPosCarrier", data);
  },
  getAgencyDataAct: async (params: GetAgencyDataApiParams) => {
    const { data } = await httpApi.getAgencyDataApi(params);
    dp("posStore", "setPosCarrier", data);
  },
});
export default thunks;