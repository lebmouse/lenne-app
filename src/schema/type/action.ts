
import type openAlert from '@/modules/action/openAlert.ts';
import type openConfirm from '@/modules/action/openConfirm.ts';
import type printLog from '@/modules/action/printLog.ts';

type FirstParameter<T> = T extends (...args: infer P) => any ? P[0] : undefined;

interface openAlertAction { 
	type: "openAlert";
	option: FirstParameter<typeof openAlert>
};
interface openConfirmAction { 
	type: "openConfirm";
	option: FirstParameter<typeof openConfirm>
};
interface printLogAction { 
	type: "printLog";
	option: FirstParameter<typeof printLog>
};

export type ActionSchema = openAlertAction | openConfirmAction | printLogAction;
