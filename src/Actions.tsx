import { useEffect } from "react";
import { TreeNode, useCtx } from "./Context";
import { useAddNode, useEditNode, useRemoveNode } from "./hooks";
import { loop } from "./utils";

function TitleActions({ item }: { item: TreeNode }) {
  const add = useAddNode();
  const edit = useEditNode();
  const remove = useRemoveNode();
  return (
    <div>
      {item.key}
      <button
        title={`create new node into ${item.key}`}
        disabled={item.able2disable && item.disabled}
        onClick={() => {
          const child = add(String(item.key), 0);
          if (child) child.title = () => <TitleActions item={child} />;
        }}
      >
        &#43;
      </button>
      <button
        title={`remove ${item.key}`}
        disabled={item.disabled}
        onClick={() => {
          remove(item);
        }}
      >
        &minus;
      </button>
      {item.able2disable && (
        <button
          title={`disable ${item.key}`}
          style={{ border: item.disabled ? "2px solid red" : "" }}
          onClick={() => {
            item.disabled = !item.disabled;
            edit(item);
          }}
        >
          &empty;
        </button>
      )}
    </div>
  );
}

export function useActions() {
  const [data, update] = useCtx();
  useEffect(() => {
    loop(data, (item, index, arr) => {
      if (!item.title) {
        update((d) => {
          const data = [...d];
          loop(data, (item, index, arr) => {
            arr[index].title = () => {
              return <TitleActions item={item} />;
            };
          });
          return data;
        });
      }
    });
  }, [data, update]);
}
