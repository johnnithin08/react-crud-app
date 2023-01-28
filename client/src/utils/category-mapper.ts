import { LocalAssets } from "../assets/images/LocalAssets";

export const findCategoryImage = (categoryName: string): number => {
  const { bus, clothing, diningOut, electricity, grocery, internet, liquor, others, rent, taxi } = LocalAssets.expenseCategories;
  switch (categoryName) {
    case "bus":
      return bus;
    case "clothing":
      return clothing;
    case "diningOut":
      return diningOut;
    case "electricity":
      return electricity;
    case "grocery":
      return grocery;
    case "internet":
      return internet;
    case "liquor":
      return liquor;
    case "rent":
      return rent;
    case "taxi":
      return taxi;
    default:
      return others;
  }
};
