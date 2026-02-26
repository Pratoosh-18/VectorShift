import { BaseNode, NodeField } from './BaseNode';
import { InputNode } from './InputNode';
import { LLMNode } from './LLMNode';
import { OutputNode } from './OutputNode';
import { TextNode } from './TextNode';
import { FilterNode } from './FilterNode';
import { MergerNode } from './MergerNode';
import { ConditionalNode } from './ConditionalNode';
import { APICallNode } from './APICallNode';
import { NoteNode } from './NoteNode';

export { BaseNode, NodeField, InputNode, LLMNode, OutputNode, TextNode, FilterNode, MergerNode, ConditionalNode, APICallNode, NoteNode };

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  merger: MergerNode,
  conditional: ConditionalNode,
  apiCall: APICallNode,
  note: NoteNode,
};
