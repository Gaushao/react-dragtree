import RcTree from "rc-tree";
import { useCtx } from "./Context";
import {
  useOnDragEnter,
  useOnDragStart,
  useOnDrop,
  useOnExpand,
} from "./hooks";
import { useActions } from "./Actions";

export default function Tree() {
  const [data] = useCtx();
  const onDragStart = useOnDragStart();
  const onDragEnter = useOnDragEnter();
  const onDrop = useOnDrop();
  const onExpand = useOnExpand();
  useActions();
  return (
    <RcTree
      defaultExpandedKeys={["start"]}
      treeData={data}
      onExpand={onExpand}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      autoExpandParent
      selectable={false}
      checkable={false}
      draggable={{
        icon: "↕️",
      }}
    />
  );
}
