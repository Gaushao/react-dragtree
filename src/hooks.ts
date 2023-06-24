import { NodeDragEventParams } from "rc-tree/lib/contextTypes";
import { DataNode, EventDataNode, Key } from "rc-tree/lib/interface";
import { useCallback } from "react";
import { add, loop, remove } from "./utils";
import { TreeNode, useCtx } from "./Context";

export function useOnExpand() {
  return useCallback(
    (
      expandedKeys: Key[],
      info: {
        node: EventDataNode<DataNode>;
        expanded: boolean;
        nativeEvent: MouseEvent;
      }
    ) => {
      // console.log("useOnExpand", { expandedKeys, info });
    },
    []
  );
}
export function useOnDragStart() {
  return useCallback((info: NodeDragEventParams<DataNode>) => {
    // console.log("useOnDragStart", info);
  }, []);
}
export function useOnDragEnter() {
  return useCallback(
    (info: NodeDragEventParams<DataNode> & { expandedKeys: Key[] }) => {
      // console.log("useOnDragEnter", info);
    },
    []
  );
}

export function useIsAvailableNode() {
  const [data] = useCtx();
  return useCallback(
    (k: string) => {
      let res = true;
      loop(data, ({ key }) => key === k && (res = false));
      return res;
    },
    [data]
  );
}

export function useAddNode() {
  const [, update] = useCtx();
  const isAvailableNode = useIsAvailableNode();
  return useCallback(
    (parentkey: string, dropPosition: number) => {
      const name = prompt(`type a name to create new node into ${parentkey}`);
      if (!name) return;
      const node = new TreeNode(name);
      if (isAvailableNode(name))
        update((d) => {
          const data = [...d];
          add(data, node, String(parentkey));
          return data;
        });
      else return alert(`${name} already exists as node key`);
      return node;
    },
    [isAvailableNode, update]
  );
}

export function useOnDrop() {
  const [, update] = useCtx();
  return useCallback(
    (
      info: NodeDragEventParams<DataNode> & {
        dragNode: EventDataNode<DataNode>;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
      }
    ) => {
      const {
        node: { key: parentkey },
        dragNode: { key: draggedkey },
      } = info;
      update((d) => {
        const data = [...d];
        const dragged = remove(data, String(draggedkey));
        if (dragged) add(data, dragged, String(parentkey), false);
        return data;
      });
    },
    [update]
  );
}

export function useEditNode() {
  const [, update] = useCtx();
  return useCallback(
    (node: TreeNode) => {
      update((d) => {
        const data = [...d];
        loop(
          data,
          (item, index, arr) => {
            arr[index] = node;
          },
          String(node.key)
        );
        return data;
      });
      return node;
    },
    [update]
  );
}

export function useRemoveNode() {
  const [, update] = useCtx();
  return useCallback(
    (node: TreeNode) => {
      update((d) => {
        const data = [...d];
        remove(data, String(node.key));
        return data;
      });
      return node;
    },
    [update]
  );
}
