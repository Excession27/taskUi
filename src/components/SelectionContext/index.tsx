import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type SelectionContextType = {
  selectionList: number[];
  setSelectionList: Dispatch<SetStateAction<number[]>>;
  display: boolean;
};

export const SelectionContext = createContext<SelectionContextType>(
  {} as SelectionContextType
);

type SelectionProviderProps = { children: ReactNode };

export default function SelectionContextProvider({
  children,
}: SelectionProviderProps) {
  const [selectionList, setSelectionList] = useState<number[]>([]);
  // const [display, setDisplay] = useState(false);
  const display = selectionList.length > 0;

  // useEffect(() => {
  //   setDisplay(selectionList.length > 0);
  // }, [selectionList.length]);

  return (
    <SelectionContext.Provider
      value={{ selectionList, setSelectionList, display }}
    >
      {children}
    </SelectionContext.Provider>
  );
}
