import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../shared/PageTitle/PageTitle";
import NotFound from "../NotFound/NotFound";

const ViewItem = () => {
  let { itemId } = useParams();

  const items = ["21", "22", "23"];

  if (!items.includes(itemId)) {
    return <NotFound />;
  }

  return (
    <div>
      <PageTitle title={itemId} />
      Single Item Page number: {itemId}
    </div>
  );
};

export default ViewItem;
