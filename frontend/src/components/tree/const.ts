import {Node} from "relatives-tree/lib/types";

export const NODE_WIDTH = 180;
export const NODE_HEIGHT = 150;

export interface NodeDto extends Node {
  firstName?: string,
  middleName?: string,
  lastName?: string,
  dateOfBirth?: string,
  dateOfDeath?: string
}