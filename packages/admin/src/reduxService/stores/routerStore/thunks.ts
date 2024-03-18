import { ROUTE_INFO_CONFIG } from "src/config/routerConfig";
import { dp } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { cloneDeep } from "lodash-es";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.routerStore, {
	createRoutesDataAct: async (_, api) => {
		const { routesPermissions } = api.getState().authStore;
		const { routesConfig, routesConfigMap } =
			RouterHelper.createRoutesConfigByUserInfo({
				routesPermissions: routesPermissions,
				routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
			});
		dp("routerStore", "setRouterConfig", routesConfig);
		dp("routerStore", "setRoutesConfigMap", routesConfigMap);
		return {
			a: 1,
		};
	},
});
export default thunks;
