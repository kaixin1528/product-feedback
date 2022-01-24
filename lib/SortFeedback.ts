const SortFeedback = (productRequests, sortingBy) => {
  let check = false;
  for (let i = 1; i < productRequests.length; i++) {
    //Go through the elements behind it.
    for (let j = i - 1; j > -1; j--) {
      //value comparison using ascending order.
      if (
        sortingBy.includes("Comments") &&
        productRequests[j + 1]["comments"] &&
        productRequests[j]["comments"]
      ) {
        const prevComments = productRequests[j]["comments"];
        let prevTotalReplies = 0;
        prevComments.map((comment: JSON) => {
          if (comment["replies"]) prevTotalReplies += comment["replies"].length;
        });
        prevTotalReplies += prevComments.length;

        const nextComments = productRequests[j + 1]["comments"];
        let nextTotalReplies = 0;
        nextComments.map((comment: JSON) => {
          if (comment["replies"]) nextTotalReplies += comment["replies"].length;
        });
        nextTotalReplies += nextComments.length;

        check = nextTotalReplies < prevTotalReplies;
      } else {
        check =
          productRequests[j + 1]["upvotes"] < productRequests[j]["upvotes"];
      }
      if (check) {
        //swap
        [productRequests[j + 1], productRequests[j]] = [
          productRequests[j],
          productRequests[j + 1],
        ];
      }
    }
  }
  if (sortingBy.includes("Most")) productRequests.reverse();
};

export default SortFeedback;
