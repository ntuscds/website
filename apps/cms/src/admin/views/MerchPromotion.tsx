import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminView } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { PromoInfo } from "types";
import PromotionsApi from "../../apis/promotions.api";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";
import { Table } from "payload/dist/admin/components/elements/Table";

const MerchPromotion: AdminView = ({ user, canAccessAdmin }) => {
  // Get data from API
  const [data, setData] = useState<PromoInfo[]>(null);
  useEffect(() => {
    PromotionsApi.getPromotions()
      .then((res: PromoInfo[]) => setData(res))
      .catch((error) => console.log(error));
  }, []);

  // Output human-readable table headers based on the attribute names from the API
  function prettifyKey(str: string): string {
    let res = "";
    for (const i of str.split("_")) {
      res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
    }
    return res;
  }

  // Do not load table until we receive the data
  if (data == null) {
    return <div> Loading... </div>;
  }

  const tableCols = new Array<Column>();
  const samplePromo = data[0];
  const keys = Object.keys(samplePromo);
  for (const key of keys) {
    const renderCellComponent = RenderCellFactory.get(data[0], key);
    const renderCell: React.FC<{ children?: React.ReactNode }> =
      renderCellComponent instanceof Promise
        ? renderCellComponent
        : renderCellComponent;

    const col: Column = {
      accessor: key,
      components: {
        Heading: (
          <SortedColumn
            label={prettifyKey(key)}
            name={key}
            data={data as never[]}
          />
        ),
        renderCell: renderCell,
      },
      label: "",
      name: "",
      active: true,
    };
    tableCols.push(col);
  }

  const editColumn: Column = {
    accessor: "edit",
    components: {
      Heading: <div>Edit</div>,
      renderCell: ({ children }) => (
        <Button onClick={() => handleEdit(children as string)}>Edit</Button>
      ),
    },
    label: "Edit",
    name: "edit",
    active: true,
  };

  tableCols.push(editColumn);

  const deleteColumn: Column = {
    accessor: "delete",
    components: {
      Heading: <div>Delete</div>,
      renderCell: ({ children }) => (
        <Button onClick={() => handleDelete(children as string)}>Delete</Button>
      ),
    },
    label: "Delete",
    name: "delete",
    active: true,
  };

  tableCols.push(deleteColumn);

  const handleEdit = (promotionID: string) => {
    console.log(`Dummy. Promotion ID: ${promotionID}`);
  };

  const handleDelete = (promotionID: string) => {
    console.log(`Dummy. Promotion ID: ${promotionID}`);
  };

  const handleCreatePromotion = () => {
    console.log("Creating a new promotion...");
  };

  console.log(tableCols);

  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description=""
      keywords=""
      title="Merchandise Promotion"
    >
      <div style={{ position: "relative" }}>
        <Button el="link" to={"/admin"} buttonStyle="primary">
          Go to Main Admin View
        </Button>
        <div
          style={{
            position: "relative",
          }}
        >
          <Button onClick={handleCreatePromotion} buttonStyle="primary">
            Create Promotion
          </Button>
        </div>
      </div>

      <Table data={data} columns={tableCols} />
    </ViewTemplate>
  );
};

export default MerchPromotion;
