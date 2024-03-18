import { FC, useState, MouseEvent } from "react";
import { Alert, Button, Table, TextInput, Spinner } from "flowbite-react";
import { FaTrash } from "react-icons/fa";

import Order from "../models/Order.model";
import { toast } from "react-toastify";

interface IProps {
  myOrderedCars: Order[];
  onSubmit: (carsToDelete: Order) => void;
}

const OrderedCars: FC<IProps> = ({ myOrderedCars, onSubmit }) => {
  const handleRemoveBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    let elm = e.target as HTMLElement | null;
    while (elm && elm.nodeName != "BUTTON") {
      elm = elm.parentElement;
    }
    if (!elm) return;
    let btnId = elm.id;
    let carsToDelete = myOrderedCars.find((car: Order) => car.id === btnId);
    if (carsToDelete) onSubmit(carsToDelete);
    else toast.error("cant find car");
  };

  if (!myOrderedCars)
    return (
      <div className="container mx-auto">
        <Spinner aria-label="בטעינה" />
      </div>
    );
  if (!myOrderedCars.length)
    return (
      <div className="container mx-auto">
        <Alert color="warning" rounded>
          אנא בחר רכבים להזמנה מרשימת "הזמנת רכבים"{" "}
        </Alert>
      </div>
    );
  return (
    <div className="container mx-auto">
      <Table className="text-right">
        <Table.Head>
          <Table.HeadCell>שם רכב</Table.HeadCell>
          <Table.HeadCell>כמות להזמנה</Table.HeadCell>
          <Table.HeadCell>פעולה</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {myOrderedCars.map((car, idx) => (
            <Table.Row
              key={"car" + idx}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {car.carName}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {car.quantity}
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="failure"
                  id={car.id + ""}
                  onClick={handleRemoveBtnClick}
                >
                  <FaTrash />
                  הסר
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderedCars;
