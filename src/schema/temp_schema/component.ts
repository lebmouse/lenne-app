import typia from "typia";
import { ComponentSchema } from "../type/component";
({
    version: "3.1",
    components: {
        schemas: {
            ComponentSchema: {
                oneOf: [
                    {
                        $ref: "#/components/schemas/ActionButtonComponent"
                    },
                    {
                        $ref: "#/components/schemas/CardComponent"
                    },
                    {
                        $ref: "#/components/schemas/Card2Component"
                    },
                    {
                        $ref: "#/components/schemas/Card3Component"
                    },
                    {
                        $ref: "#/components/schemas/Card4Component"
                    },
                    {
                        $ref: "#/components/schemas/ContainerComponent"
                    },
                    {
                        $ref: "#/components/schemas/EventButtonComponent"
                    },
                    {
                        $ref: "#/components/schemas/InputComponent"
                    }
                ],
                discriminator: {
                    propertyName: "type",
                    mapping: {
                        ActionButton: "#/components/schemas/ActionButtonComponent",
                        Card: "#/components/schemas/CardComponent",
                        Card2: "#/components/schemas/Card2Component",
                        Card3: "#/components/schemas/Card3Component",
                        Card4: "#/components/schemas/Card4Component",
                        Container: "#/components/schemas/ContainerComponent",
                        EventButton: "#/components/schemas/EventButtonComponent",
                        Input: "#/components/schemas/InputComponent"
                    }
                }
            },
            ActionButtonComponent: {
                type: "object",
                properties: {
                    type: {
                        "const": "ActionButton"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            action: {
                                type: "string"
                            },
                            event: {
                                type: "object",
                                properties: {
                                    onClick: {
                                        type: "string"
                                    },
                                    onMouseOver: {
                                        type: "string"
                                    }
                                }
                            }
                        },
                        required: [
                            "name",
                            "action"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            CardComponent: {
                type: "object",
                properties: {
                    type: {
                        "const": "Card"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            age: {
                                type: "number"
                            }
                        },
                        required: [
                            "name",
                            "age"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            Card2Component: {
                type: "object",
                properties: {
                    type: {
                        "const": "Card2"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            age: {
                                type: "number"
                            }
                        },
                        required: [
                            "name",
                            "age"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            Card3Component: {
                type: "object",
                properties: {
                    type: {
                        "const": "Card3"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            age: {
                                type: "number"
                            }
                        },
                        required: [
                            "name",
                            "age"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            Card4Component: {
                type: "object",
                properties: {
                    type: {
                        "const": "Card4"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            age: {
                                type: "number"
                            }
                        },
                        required: [
                            "name",
                            "age"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            ContainerComponent: {
                type: "object",
                properties: {
                    type: {
                        "const": "Container"
                    },
                    props: {
                        type: "object",
                        properties: {
                            children: {
                                $ref: "#/components/schemas/React.ReactNode"
                            },
                            direction: {
                                oneOf: [
                                    {
                                        "const": "row"
                                    },
                                    {
                                        "const": "column"
                                    }
                                ]
                            },
                            gap: {
                                type: "number"
                            },
                            padding: {
                                type: "number"
                            }
                        },
                        required: [
                            "children",
                            "gap"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            "React.ReactNode": {
                oneOf: [
                    {
                        type: "null"
                    },
                    {
                        type: "string"
                    },
                    {
                        type: "number"
                    },
                    {
                        type: "boolean"
                    },
                    {
                        $ref: "#/components/schemas/React.ReactElementanystringJSXElementConstructorany"
                    },
                    {
                        $ref: "#/components/schemas/IterableReact.ReactNode"
                    },
                    {
                        $ref: "#/components/schemas/React.ReactPortal"
                    }
                ],
                title: "Represents all of the things React can render",
                description: "Represents all of the things React can render.\n\nWhere {@link ReactElement} only represents JSX, `ReactNode` represents everything that can be rendered."
            },
            "React.ReactElementanystringJSXElementConstructorany": {
                type: "object",
                properties: {
                    type: {
                        type: "string"
                    },
                    props: {},
                    key: {
                        oneOf: [
                            {
                                type: "null"
                            },
                            {
                                type: "string"
                            }
                        ]
                    }
                },
                required: [
                    "type",
                    "props",
                    "key"
                ],
                description: "Represents a JSX element.\n\nWhere {@link ReactNode} represents everything that can be rendered, `ReactElement`\nonly represents JSX."
            },
            "IterableReact.ReactNode": {
                type: "object",
                properties: {}
            },
            "React.ReactPortal": {
                type: "object",
                properties: {
                    children: {
                        $ref: "#/components/schemas/React.ReactNode"
                    },
                    type: {
                        type: "string"
                    },
                    props: {},
                    key: {
                        oneOf: [
                            {
                                type: "null"
                            },
                            {
                                type: "string"
                            }
                        ]
                    }
                },
                required: [
                    "children",
                    "type",
                    "props",
                    "key"
                ]
            },
            EventButtonComponent: {
                type: "object",
                properties: {
                    type: {
                        "const": "EventButton"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            events: {
                                type: "object",
                                properties: {
                                    onClick: {
                                        type: "object",
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            option: {}
                                        },
                                        required: [
                                            "name"
                                        ]
                                    },
                                    onMouseOver: {
                                        type: "object",
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            option: {}
                                        },
                                        required: [
                                            "name"
                                        ]
                                    }
                                }
                            }
                        },
                        required: [
                            "name"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            },
            InputComponent: {
                type: "object",
                properties: {
                    type: {
                        "const": "Input"
                    },
                    props: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            }
                        },
                        required: [
                            "name"
                        ]
                    }
                },
                required: [
                    "type",
                    "props"
                ]
            }
        }
    },
    schemas: [
        {
            $ref: "#/components/schemas/ComponentSchema"
        }
    ]
});
