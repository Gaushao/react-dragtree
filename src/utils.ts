import { TreeNode } from "./Context";

export function loop(
  data: TreeNode[],
  callback: (value: TreeNode, index: number, array: TreeNode[]) => void,
  key?: string
) {
  data.forEach((item, index, arr) => {
    if (item.key === key) {
      callback(item, index, arr);
      return;
    }
    if (!key) callback(item, index, arr);
    if (item.children) {
      loop(item.children, callback, key);
    }
  });
}

export function remove(data: TreeNode[], key: string) {
  let removed;
  loop(
    data,
    (item, index, arr) => {
      removed = item;
      arr.splice(index, 1);
    },
    key
  );
  return removed as TreeNode | undefined;
}
