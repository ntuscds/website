import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminViewComponent } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import { Column } from "payload/dist/admin/components/elements/Table/types";
import { Product } from "../../@types/Product";
import ProductsApi from "../../apis/products.api";
import { RenderCellFactory } from "../utils/RenderCellFactory";
import SortedColumn from "../utils/SortedColumn";
import { Table } from "payload/dist/admin/components/elements/Table";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { prettifyKey } from "../../utilities/prettifyKey";

const MerchProducts: AdminViewComponent = ({ user, canAccessAdmin }) => {
  // Get data from API
  const [data, setData] = useState<Product[]>(null);
  const history = useHistory();
  useEffect(() => {
    const fetchProducts = async () => { 
      try {
        const products: Product[] = await ProductsApi.getProducts();
        setData(products);
      } catch (error) {
        setData([]);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProducts();
    }, []);

  // Do not load table until we receive the data
  if (data == null) {
    return <div> Loading... </div>;
  }

  const tableCols = new Array<Column>();
  if (data && data.length > 0) { 
    for (const key of Object.keys(new Product())) {
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
        label: prettifyKey(key), // Assigning the prettified key to the label
        name: key,
        active: true,
      };

      tableCols.push(col);
    }
    
    const editColumn: Column = {
      accessor: "edit",
      components: {
        Heading: <div>Edit</div>,
        renderCell: (data: Product) => (
          <Button onClick={() => handleEdit(data)}>Edit</Button>
        ),
      },
      label: "Edit",
      name: "edit",
      active: true,
    };

    tableCols.push(editColumn);

    const handleEdit = (data: Product) => {
      const productId = data.id;
      // Navigate to the edit page
      history.push(`/admin/collections/products/${productId}`);
    };

    const deleteColumn: Column = {
      accessor: "delete",
      components: {
        Heading: <div>Delete</div>,
        renderCell: (data: Product) => (
          <Button onClick={() => {
          void (() => {
            handleDelete(data);
          })();
        }}
          >Delete</Button>
        ),
      },
      label: "Delete",
      name: "delete",
      active: true,
    };

    tableCols.push(deleteColumn);

      const handleDelete = (data: Product) => {
        const productId = data.id;
        try {
          // Show a confirmation prompt (optional)
          if (window.confirm('Are you sure you want to delete this product?')) {
            // Call the delete API
            // Implement delete API
      
            // After deletion, update the data state to reflect the removal
            setData((prevData) => prevData.filter((product) => product.id !== productId));
      
            // Optionally, show a success message
            toast.success('Product deleted successfully');
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('An unknown error occurred');
          }
        }
    };
  }

  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description=""
      keywords=""
      title="Merchandise Products"
    >
      <Button el="link" to={"/admin"} buttonStyle="primary">
        Go to Main Admin View
      </Button>
      {data && data.length > 0 && <Table data={data} columns={tableCols} />}
    </ViewTemplate>
  );
};

export default MerchProducts;
