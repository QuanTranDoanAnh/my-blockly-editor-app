import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';


// --- 1. SCRATCH TOOLBOX DEFINITION ---
// This remains the same.
const toolboxJson = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Events",
      "categorystyle": "event_category",
      "contents": [
        {
          "kind": "block",
          "type": "event_when_green_flag_clicked"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Motion",
      "categorystyle": "motion_category",
      "contents": [
        {
          "kind": "block",
          "type": "motion_movesteps"
        },
        {
          "kind": "block",
          "type": "motion_turnright"
        },
        {
          "kind": "block",
          "type": "motion_turnleft"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Looks",
      "categorystyle": "look_category",
      "contents": [
        {
          "kind": "block",
          "type": "looks_say"
        },
        {
          "kind": "block",
          "type": "looks_think"
        },
        {
          "kind": "block",
          "type": "text" // Added text input block
        }
      ]
    },
    {
        "kind": "category",
        "name": "Control",
        "categorystyle": "control_category",
        "contents": [
            {
                "kind": "block",
                "type": "control_wait"
            },
            {
                "kind": "block",
                "type": "control_repeat"
            },
            {
                "kind": "block",
                "type": "control_if" // Added IF block
            }
        ]
    },
    {
        "kind": "category",
        "name": "Operators",
        "categorystyle": "operator_category",
        "contents": [
            {
                "kind": "block",
                "type": "math_number" // Added number input block
            },
            {
                "kind": "block",
                "type": "operator_equals"
            },
            {
                "kind": "block",
                "type": "operator_and"
            }
        ]
    }
  ]
};

// --- NEW: THEME STYLE DEFINITIONS ---
// This is the crucial fix. We define the colors for our categories and blocks.
// These names must match the 'categorystyle' and 'style' properties in the JSON.
const scratchTheme = Blockly.Theme.defineTheme('scratch-theme', {
    'base': Blockly.Themes.Zelos,
    'categoryStyles': {
        'event_category': { 'colour': '#FFBF00' },
        'motion_category': { 'colour': '#4C97FF' },
        'look_category': { 'colour': '#9966FF' },
        'control_category': { 'colour': '#FFAB19' },
        'operator_category': { 'colour': '#4CBFE6' }, // Added Operator category color
    },
    'blockStyles': {
        'event_blocks': { 'colourPrimary': '#FFBF00', 'colourTertiary': '#CF8B17' },
        'motion_blocks': { 'colourPrimary': '#4C97FF', 'colourTertiary': '#3373CC' },
        'look_blocks': { 'colourPrimary': '#9966FF', 'colourTertiary': '#774DCB' },
        'control_blocks': { 'colourPrimary': '#FFAB19', 'colourTertiary': '#CF8B17' },
        'operator_blocks': { 'colourPrimary': '#4CBFE6', 'colourTertiary': '#2E8EB8' }, // Added Operator block color
    },
    'componentStyles': {
        'workspaceBackgroundColour': '#F9F9F9',
        'toolboxBackgroundColour': '#FFFFFF',
        'toolboxForegroundColour': '#575E75',
        'flyoutBackgroundColour': '#F0F0F0',
        'flyoutForegroundColour': '#575E75',
        'scrollbarColour': '#D8D8D8',
    },
    'fontStyle': {
        'family': '"Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"',
        'weight': 'bold',
        'size': 12
    },
    name: 'scratch-theme'
});


// --- 2. CUSTOM BLOCK DEFINITIONS & GENERATORS ---
// This section remains the same.
// Here we define the appearance and behavior of our custom Scratch blocks.

// --- Event Blocks ---
Blockly.defineBlocksWithJsonArray([
  {
    "type": "event_when_green_flag_clicked",
    "message0": "when %1 clicked",
    "args0": [
      {
        "type": "field_image",
        "src": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Greenflag.svg",
        "width": 24,
        "height": 24,
        "alt": "green flag"
      }
    ],
    "nextStatement": null,
    "style": "event_blocks",
    "tooltip": "Triggered when the green flag is clicked."
  }
]);

javascriptGenerator.forBlock['event_when_green_flag_clicked'] = function() {
  // This is a "hat" block, so it doesn't generate any code itself,
  // but the blocks connected below it will be.
  return '';
};


// --- Motion Blocks ---
Blockly.defineBlocksWithJsonArray([
    {
      "type": "motion_movesteps",
      "message0": "move %1 steps",
      "args0": [{ "type": "input_value", "name": "STEPS", "check": "Number" }],
      "previousStatement": null,
      "nextStatement": null,
      "style": "motion_blocks",
      "tooltip": "Moves the sprite forward."
    },
    {
      "type": "motion_turnright",
      "message0": "turn %1 %2 degrees",
      "args0": [
        { "type": "field_image", "src": "https://upload.wikimedia.org/wikipedia/commons/6/62/Antu-object-rotate-right-24.svg", "width": 24, "height": 24, "alt": "->" },
        { "type": "input_value", "name": "DEGREES", "check": "Number" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "motion_blocks",
      "tooltip": "Turns the sprite to the right."
    },
    {
      "type": "motion_turnleft",
      "message0": "turn %1 %2 degrees",
      "args0": [
        { "type": "field_image", "src": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Antu-object-rotate-left-24.svg", "width": 24, "height": 24, "alt": "<-" },
        { "type": "input_value", "name": "DEGREES", "check": "Number" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "motion_blocks",
      "tooltip": "Turns the sprite to the left."
    }
]);

javascriptGenerator.forBlock['motion_movesteps'] = function(block, generator) {
  const steps = generator.valueToCode(block, 'STEPS', Order.ATOMIC) || '10';
  return `move(${steps});\n`;
};
javascriptGenerator.forBlock['motion_turnright'] = function(block, generator) {
  const degrees = generator.valueToCode(block, 'DEGREES', Order.ATOMIC) || '15';
  return `turnRight(${degrees});\n`;
};
javascriptGenerator.forBlock['motion_turnleft'] = function(block, generator) {
    const degrees = generator.valueToCode(block, 'DEGREES', Order.ATOMIC) || '15';
    return `turnLeft(${degrees});\n`;
};


// --- Looks Blocks ---
Blockly.defineBlocksWithJsonArray([
    {
      "type": "looks_say",
      "message0": "say %1",
      "args0": [{ "type": "input_value", "name": "MESSAGE", "check": "String" }],
      "previousStatement": null,
      "nextStatement": null,
      "style": "look_blocks",
      "tooltip": "Displays a speech bubble."
    },
    {
      "type": "looks_think",
      "message0": "think %1",
      "args0": [{ "type": "input_value", "name": "MESSAGE", "check": "String" }],
      "previousStatement": null,
      "nextStatement": null,
      "style": "look_blocks",
      "tooltip": "Displays a thought bubble."
    },
    // Definition for the text input block
    {
      "type": "text",
      "message0": "%1",
      "args0": [{ "type": "field_input", "name": "TEXT", "text": "" }],
      "output": "String",
      "style": "look_blocks",
      "tooltip": "A text input."
    }
]);

javascriptGenerator.forBlock['looks_say'] = function(block, generator) {
  const message = generator.valueToCode(block, 'MESSAGE', Order.ATOMIC) || "'Hello!'";
  return `say(${message});\n`;
};
javascriptGenerator.forBlock['looks_think'] = function(block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.ATOMIC) || "'Hmm...'";
    return `think(${message});\n`;
};
javascriptGenerator.forBlock['text'] = function(block, generator) {
    const text = generator.quote_(block.getFieldValue('TEXT'));
    return [text, Order.ATOMIC];
};

// --- Control Blocks ---
Blockly.defineBlocksWithJsonArray([
    {
        "type": "control_wait",
        "message0": "wait %1 seconds",
        "args0": [{ "type": "input_value", "name": "DURATION", "check": "Number" }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "Pauses the script."
    },
    {
        "type": "control_repeat",
        "message0": "repeat %1 %2",
        "args0": [
            { "type": "input_value", "name": "TIMES", "check": "Number" },
            { "type": "input_statement", "name": "SUBSTACK" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "Repeats the blocks inside."
    },
    {
        "type": "control_if",
        "message0": "if %1 then",
        "message1": "%1",
        "args0": [{ "type": "input_value", "name": "CONDITION", "check": "Boolean" }],
        "args1": [{ "type": "input_statement", "name": "SUBSTACK" }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "Performs an action if the condition is true."
    }
]);

javascriptGenerator.forBlock['control_wait'] = function(block, generator) {
    const duration = generator.valueToCode(block, 'DURATION', Order.ATOMIC) || '1';
    // Note: We'd need a proper async execution environment for a real `wait`.
    // For now, we'll just log it.
    return `wait(${duration}); // Note: requires async execution\n`;
};
javascriptGenerator.forBlock['control_repeat'] = function(block, generator) {
    const times = generator.valueToCode(block, 'TIMES', Order.ATOMIC) || '10';
    const substack = generator.statementToCode(block, 'SUBSTACK');
    return `for (let i = 0; i < ${times}; i++) {\n${substack}}\n`;
};
javascriptGenerator.forBlock['control_if'] = function(block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.ATOMIC) || 'false';
    const substack = generator.statementToCode(block, 'SUBSTACK');
    return `if (${condition}) {\n${substack}}\n`;
};
// --- Operator Blocks ---
Blockly.defineBlocksWithJsonArray([
    {
        "type": "math_number",
        "message0": "%1",
        "args0": [{ "type": "field_number", "name": "NUM", "value": 0 }],
        "output": "Number",
        "style": "operator_blocks",
        "tooltip": "A number."
    },
    {
        "type": "operator_equals",
        "message0": "%1 = %2",
        "args0": [
            { "type": "input_value", "name": "OPERAND1" },
            { "type": "input_value", "name": "OPERAND2" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "operator_blocks",
        "tooltip": "Returns true if the inputs are equal."
    },
    {
        "type": "operator_and",
        "message0": "%1 and %2",
        "args0": [
            { "type": "input_value", "name": "OPERAND1", "check": "Boolean" },
            { "type": "input_value", "name": "OPERAND2", "check": "Boolean" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "operator_blocks",
        "tooltip": "Returns true if both inputs are true."
    }
]);

javascriptGenerator.forBlock['math_number'] = function(block) {
    const code = String(block.getFieldValue('NUM'));
    return [code, Order.ATOMIC];
};
javascriptGenerator.forBlock['operator_equals'] = function(block, generator) {
    const operand1 = generator.valueToCode(block, 'OPERAND1', Order.EQUALITY) || '0';
    const operand2 = generator.valueToCode(block, 'OPERAND2', Order.EQUALITY) || '0';
    const code = `${operand1} == ${operand2}`;
    return [code, Order.EQUALITY];
};
javascriptGenerator.forBlock['operator_and'] = function(block, generator) {
    const operand1 = generator.valueToCode(block, 'OPERAND1', Order.LOGICAL_AND) || 'false';
    const operand2 = generator.valueToCode(block, 'OPERAND2', Order.LOGICAL_AND) || 'false';
    const code = `${operand1} && ${operand2}`;
    return [code, Order.LOGICAL_AND];
};
export {toolboxJson , scratchTheme};