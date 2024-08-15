
import type { ComponentProps } from 'react';

import type ActionButton from '@/modules/component/ActionButton';
import type Card from '@/modules/component/Card';
import type Card2 from '@/modules/component/Card2';
import type Card3 from '@/modules/component/Card3';
import type Card4 from '@/modules/component/Card4';
import type Container from '@/modules/component/Container';
import type EventButton from '@/modules/component/EventButton';
import type Input from '@/modules/component/Input';

interface ActionButtonComponent { 
	type: "ActionButton";
	props: ComponentProps<typeof ActionButton>
};
interface CardComponent { 
	type: "Card";
	props: ComponentProps<typeof Card>
};
interface Card2Component { 
	type: "Card2";
	props: ComponentProps<typeof Card2>
};
interface Card3Component { 
	type: "Card3";
	props: ComponentProps<typeof Card3>
};
interface Card4Component { 
	type: "Card4";
	props: ComponentProps<typeof Card4>
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

declare global {
  type ComponentSchema = ActionButtonComponent | CardComponent | Card2Component | Card3Component | Card4Component | ContainerComponent | EventButtonComponent | InputComponent;
}
  