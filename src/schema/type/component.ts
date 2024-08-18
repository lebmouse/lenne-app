
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

export type ComponentSchema = CardComponent | EventButtonComponent | InputComponent;
