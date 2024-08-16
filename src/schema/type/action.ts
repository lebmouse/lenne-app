
import type openAlert from '@/modules/action/openAlert.ts';
import type openConfirm from '@/modules/action/openConfirm.ts';
import type printLog from '@/modules/action/printLog.ts';

interface openAlertAction { 
	type: "openAlert";
	option: Parameters<typeof openAlert>
};
interface openConfirmAction { 
	type: "openConfirm";
	option: Parameters<typeof openConfirm>
};
interface printLogAction { 
	type: "printLog";
	option: Parameters<typeof printLog>
};

export type ActionSchema = openAlertAction | openConfirmAction | printLogAction;
