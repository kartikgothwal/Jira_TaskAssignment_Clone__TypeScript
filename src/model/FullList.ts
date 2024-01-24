import ListItem from "./ListItem";
interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}
export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }
  load(): void {
    const storeList: string | null = localStorage.getItem("myList");
    if (typeof storeList !== "string") return;
    const parsedItem: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storeList);
    parsedItem.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }
  addItem(itemObj: ListItem): void {
    this.list.push(itemObj);
    this.save();
  }
  removeItem(id: string) {
    this._list = this.list.filter((item) => item.id != id);
    this.save();
  }
}
