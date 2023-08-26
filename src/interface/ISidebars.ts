interface Category {
    type: "category";
    label: string;
    collapsible: boolean;
    collapsed: boolean;
    link?: {
      // type?: "doc";
      id?: string;
    };
    items: (IDoc | Category)[];
  }

  interface IDoc {
    type:string;
    id: string;
    label: string;
  }

export {Category, IDoc}