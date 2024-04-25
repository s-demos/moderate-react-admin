import { type Location } from "react-router-dom";
import { MenuItem } from "src/service/helper";

export type ThemeName = "dark" | "light" | "auto";
export interface TabItem {
	label: string;
	key: string;
}
export type TabsHistory = Location[];
export interface StoreState {
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[] | null;
	menuData: MenuItem[];
	// 页面tab栏信息
	tabsHistory: TabsHistory;
	tabItems: TabItem[];
	activeTabKey: string;
	// theme
	theme: ThemeName;
	// 设置窗口的打开
	isShowOptionsDrawer: boolean;
	// 切换
	isCollapsedMenu: boolean;
	// 显示md的drawer：起作用的前提是安装了对应的插件
	isShowMdDrawer: boolean;
	winBoxList: string[];
	mdContent: string;
}
