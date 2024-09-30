// app/integration/excel/[id]/page.tsx

import React from "react";

const ExcelPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <>{id}</>;
};

export default ExcelPage;
