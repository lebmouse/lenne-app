
import type { ComponentProps } from 'react';
import type Card from '@/modules/component/Card';
import type EventButton from '@/modules/component/EventButton';
import type Input from '@/modules/component/Input';

interface CardComponent { 
	type: "Card";
	props: ComponentProps<typeof Card>
};
interface EventButtonComponent { 
	type: "EventButton";
	props: ComponentProps<typeof EventButton>
};
interface InputComponent { 
	type: "Input";
	props: ComponentProps<typeof Input>
};

/**
 * @title component-type
 * @description 컴포넌트를 선택하는 스키마입니다.
 */
export type ComponentSchema = CardComponent | EventButtonComponent | InputComponent;
