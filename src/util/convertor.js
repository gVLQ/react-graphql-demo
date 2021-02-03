const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const month = function (post) {
  let date = new Date(parseInt(post.createdAt));
  return capitalizeFirstLetter(date.toLocaleString("en-EN", { month: "long" }));
};

export function convertPosts(data) {
  var formattedData = [
    { postNumber: 0, month: "January" },
    { postNumber: 0, month: "February" },
    { postNumber: 0, month: "March" },
    { postNumber: 0, month: "April" },
    { postNumber: 0, month: "May" },
    { postNumber: 0, month: "June" },
    { postNumber: 0, month: "July" },
    { postNumber: 0, month: "August" },
    { postNumber: 0, month: "September" },
    { postNumber: 0, month: "October" },
    { postNumber: 0, month: "November" },
    { postNumber: 0, month: "December" },
  ];
  data.forEach((post) => {
    switch (month(post)) {
      case "January":
        formattedData[0].postNumber++;
        break;
      case "February":
        formattedData[1].postNumber++;
        break;
      case "March":
        formattedData[2].postNumber++;
        break;
      case "April":
        formattedData[3].postNumber++;
        break;
      case "May":
        formattedData[4].postNumber++;
        break;
      case "June":
        formattedData[5].postNumber++;
        break;
      case "July":
        formattedData[6].postNumber++;
        break;
      case "August":
        formattedData[7].postNumber++;
        break;
      case "September":
        formattedData[8].postNumber++;
        break;
      case "October":
        formattedData[9].postNumber++;
        break;
      case "November":
        formattedData[10].postNumber++;
        break;
      case "December":
        formattedData[11].postNumber++;
        break;
      default:
        console.log(month(post), " is not a month");
        return;
    }
  });
  return formattedData;
}
