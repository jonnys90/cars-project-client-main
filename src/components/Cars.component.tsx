import { FC, ChangeEventHandler, useState, useEffect } from "react";
import { Alert, Button, Table, TextInput } from "flowbite-react";

import Order from "../models/Order.model";
import validateCarQuantity from "../validation/car.validation";

interface IProps {
  cars: Order[];

  onSubmit: (newOrders: Order[]) => void;
}

type TErrors = {
  [key: string]: string | undefined;
};

const Cars: FC<IProps> = ({ cars, onSubmit }) => {
  const [newOrderCars, setNewOrderCars] = useState<Order[]>(() => {
    const newOrderCars: Order[] = [];
    for (let car of cars) {
      if (+car.quantity <= 0) continue;
      newOrderCars.push(new Order(car.id, car.carName, 0));
    }
    return newOrderCars;
  });
  const [errors, setErrors] = useState<TErrors>(() => {
    const errorsArr: TErrors = {};
    for (let car of cars) {
      errorsArr[car.id] = undefined;
    }
    return errorsArr;
  });

  useEffect(() => {
    setNewOrderCars((c) => {
      const newOrderCars: Order[] = [];
      for (let car of cars) {
        if (+car.quantity <= 0) continue;
        newOrderCars.push(new Order(car.id, car.carName, 0));
      }
      return newOrderCars;
    });
    setErrors((c) => {
      const errorsArr: TErrors = {};
      for (let car of cars) {
        errorsArr[car.id] = undefined;
      }
      return errorsArr;
    });
  }, [cars]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let error = validateCarQuantity({ carQuantity: e.target.value });
    let val = parseInt(e.target.value);
    if (error) {
      setErrors((prev: TErrors) => {
        let newErrors = JSON.parse(JSON.stringify(prev));
        newErrors[e.target.id] = error;
        return newErrors;
      });
      val = 0;
    } else {
      setErrors((prev: TErrors) => {
        let newErrors = JSON.parse(JSON.stringify(prev));
        newErrors[e.target.id] = "";
        return newErrors;
      });
    }
    setNewOrderCars((prev: Order[]) => {
      let newNewOrderCars = JSON.parse(JSON.stringify(prev));
      let order = newNewOrderCars.find(
        (order: Order) => order.id === e.target.id
      );
      if (order) {
        order.quantity = val;
      }
      return newNewOrderCars;
    });
  };
  const handleAddBtnClick = () => {
    onSubmit(newOrderCars);
  };
  if (newOrderCars.length == 0)
    return (
      <div className="container mx-auto">
        <Alert color="warning" rounded>
          אין רכבים זמינים
        </Alert>
      </div>
    );
  return (
    <div className="container mx-auto">
      <Table className="text-right">
        <Table.Head>
          <Table.HeadCell>שם רכב</Table.HeadCell>
          <Table.HeadCell>כמות להזמנה</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {newOrderCars.map((car, idx) => (
            <Table.Row
              key={"car" + idx}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {car.carName}
              </Table.Cell>
              <Table.Cell>
                <>
                  <TextInput
                    id={car.id + ""}
                    type="number"
                    value={car.quantity}
                    placeholder="כמות להזמנה"
                    onChange={handleChange}
                  />
                  {errors && errors[car.id] && (
                    <Alert color="failure">{errors[car.id]}</Alert>
                  )}
                </>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button className="w-full mt-4" onClick={handleAddBtnClick}>
        הוסף
      </Button>
    </div>
  );
};

export default Cars;
