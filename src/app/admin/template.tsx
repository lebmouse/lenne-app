/**
 * 이 페이지는 legendapp을 활성화를 위한 템플릿입니다.
 */
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";

enableReactComponents();

export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
