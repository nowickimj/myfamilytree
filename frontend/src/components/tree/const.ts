import {Node} from "relatives-tree/lib/types";

export const NODE_WIDTH = 150;
export const NODE_HEIGHT = 200;

export interface NodeDto extends Node {
  firstName?: string,
  middleName?: string,
  lastName?: string,
  dateOfBirth?: number[],
  dateOfDeath?: number[]
}