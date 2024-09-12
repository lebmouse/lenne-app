
import type { ComponentProps } from "react";

import type Card from '@/modules/component/Card';
import type Card2 from '@/modules/component/Card2';
import type Container from '@/modules/component/Container';
import type EventButton from '@/modules/component/EventButton';
import type Input from '@/modules/component/Input';
import type TwoChildern from '@/modules/component/TwoChildern';

interface CardComponent { 
	type: "Card";
	props: ComponentProps<typeof Card>
};
interface Card2Component { 
	type: "Card2";
	props: ComponentProps<typeof Card2>
};
interface ContainerComponent { 
	type: "Container";
	props: ComponentProps<typeof Container>
};
interface EventButtonComponent { 
	type: "EventButton";
	props: ComponentProps<typeof EventButton>
};
interface InputComponent { 
	type: "Input";
	props: ComponentProps<typeof Input>
};
interface TwoChildernComponent { 
	type: "TwoChildern";
	props: ComponentProps<typeof TwoChildern>
};

/**
 * @title component-type
 * @description 컴포넌트를 선택하는 스키마입니다.
 */
export type ComponentSchema = CardComponent | Card2Component | ContainerComponent | EventButtonComponent | InputComponent | TwoChildernComponent;
