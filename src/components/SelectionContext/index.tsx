import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type SelectionContextType = {
  selectionList: number[];
  setSelectionList: Dispatch<SetStateAction<number[]>>;
};

export const SelectionContext = createContext<SelectionContextType>(
  {} as SelectionContextType
);

type SelectionProviderProps = { children: ReactNode };

export default function SelectionContextProvider({
  children,
}: SelectionProviderProps) {
  const [selectionList, setSelectionList] = useState<number[]>([]);

  return (
    <SelectionContext.Provider value={{ selectionList, setSelectionList }}>
      {children}
    </SelectionContext.Provider>
  );
}
