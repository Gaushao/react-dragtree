import { DataNode } from "rc-tree/lib/interface";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export class TreeNode implements DataNode {
  key: string | number = "";
  children?: TreeNode[];
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
  disabled?: boolean;
  able2disable = true;
  constructor(
    key: string,
    children?: TreeNode[],
    opt?: Partial<TreeNode & DataNode>
  ) {
    this.key = key;
    this.children = children;
    Object.assign(this, opt);
  }
}

const treedata: TreeNode[] = [
  new TreeNode(
    "start",
    [
      new TreeNode("node 1", [
        new TreeNode("node 1.1", [new TreeNode("node 1.1.1")]),
        new TreeNode("node 1.2", [new TreeNode("node 1.2.1")]),
      ]),
      new TreeNode("node 2", [
        new TreeNode("node 2.1"),
        new TreeNode("node 2.2"),
      ]),
    ],
    {
      disabled: true,
      able2disable: false,
    }
  ),
];

const empty: [TreeNode[], React.Dispatch<React.SetStateAction<TreeNode[]>>] = [
  [],
  (d) => d,
];

export const Context = createContext(empty);

export const useCtx = () => useContext(Context);

export function Provider({ children }: PropsWithChildren) {
  return (
    <Context.Provider value={useState(treedata)}>{children}</Context.Provider>
  );
}
