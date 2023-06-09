const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  console.log("element", element);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export default scrollToElement;

export function averageFieldsByCategory(data) {
  const categoryAverages = {};

  data.forEach((item) => {
    const categoryValue = item.category.value;
    if (!categoryAverages[categoryValue]) {
      categoryAverages[categoryValue] = {
        sumBasePrice: 0,
        sumCheckoutPrice: 0,
        count: 0,
      };
    }
    categoryAverages[categoryValue].sumBasePrice += item.price.basePrice;
    categoryAverages[categoryValue].sumCheckoutPrice += item.price.checkoutPrice;
    categoryAverages[categoryValue].count++;
  });

  const averagedData = Object.entries(categoryAverages).map(([categoryValue, avgData]) => ({
    category: {
      value: parseInt(categoryValue),
      label: data.find((item) => item.category.value == categoryValue).category.label,
    },
    price: {
      basePrice: avgData.sumBasePrice / avgData.count,
      checkoutPrice: avgData.sumCheckoutPrice / avgData.count,
    },
  }));

  return averagedData;
}

export function averageFieldsInNestedArray(data) {
  const flatData = data.flat(); // Flatten the nested arrays

  const categoryAverages = {};

  flatData.forEach((item) => {
    const categoryValue = item.category.value;
    if (!categoryAverages[categoryValue]) {
      categoryAverages[categoryValue] = {
        sumBasePrice: 0,
        sumCheckoutPrice: 0,
        count: 0,
      };
    }
    categoryAverages[categoryValue].sumBasePrice += item.price.basePrice;
    categoryAverages[categoryValue].sumCheckoutPrice += item.price.checkoutPrice;
    categoryAverages[categoryValue].count++;
  });

  const averagedData = Object.entries(categoryAverages).map(([categoryValue, avgData]) => ({
    category: {
      value: parseInt(categoryValue),
      label: flatData.find((item) => item.category.value == categoryValue).category.label,
    },
    price: {
      basePrice: avgData.sumBasePrice / avgData.count,
      checkoutPrice: avgData.sumCheckoutPrice / avgData.count,
    },
  }));

  return averagedData;
}

export function calculateAverageCheckoutPriceInGeneral(data) {
  let totalCheckoutPrice = 0;
  let totalBasePrice = 0;
  let totalCount = 0;

  data.forEach((item) => {
    totalCheckoutPrice += item.price.checkoutPrice;
    totalBasePrice += item.price.basePrice;
    totalCount++;
  });

  const averageCheckoutPrice = totalCheckoutPrice / totalCount;
  const averageBasePrice = totalBasePrice / totalCount;

  return {
    checkout_price: averageCheckoutPrice,
    base_price: averageBasePrice,
  };
}

// takes checkout price and base price and adds weeks to it
export function convertDataToPredictionRequest(item, weeks) {
  return weeks.map((week) => {
    return [
      "id" in item ? item.id : 0,
      "week" in item ? item.week : week,
      "meal_id" in item ? item.meal_id : 0,
      "checkout_price" in item ? item.checkout_price : 0,
      "base_price" in item ? item.base_price : 0,
      "emailer_for_promotion" in item ? item.emailer_for_promotion : 0,
      "homepage_featured" in item ? item.homepage_featured : 0,
    ];
  });
}
