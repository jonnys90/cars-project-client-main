import { FC, useState, useEffect } from "react";
import { Tabs } from "flowbite-react";
import { HiClipboardList, HiUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import { RootState } from "../../store/index";
import Order from "../../models/Order.model";
import NewOrder from "../../models/NewOrder.model";
import Cars from "../../components/Cars.component";
import OrderedCars from "../../components/OrderedCars.component";
import qs from "qs";

const initialState = [
  new Order(1, "מאזדה", 1),
  new Order(2, "קיה", 2),
  new Order(3, "שברולט", 3),
  new Order(4, "דייהטסו", 4),
];

const OrdersPage: FC = () => {
  const [myOrders, setMyOrders] = useState<Order[]>(initialState);
  const [cars, setCars] = useState<Order[]>(initialState);
  const userName = useSelector((state: RootState) => state.authSlice.userName);
  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          url: "http://localhost/rest/getCars.asp",
        };
        let { data } = await axios(options);
        console.log("Data", data);
        // setCars(data.filter((car: Order) => car.quantity > 0));
      } catch (err: any) {
        toast.error("Something went wrong");
      }
    })();
  }, []);
  useEffect(() => {
    if (!cars) return;
    (async () => {
      try {
        const options = {
          method: "GET",
          url: "http://localhost/rest/getUserCars.asp",
        };
        let { data } = await axios(options);
        let myOrders: Order[] = [];
        for (let myCar of data) {
          let key = Object.keys(myCar)[0];
          let car = cars.find((car: Order) => car.id === +key);
          if (!key || !car) continue;
          myOrders.push(new Order(+key, car!.carName, myCar[key]));
        }
        setMyOrders(myOrders);
      } catch (err: any) {
        toast.error("Something went wrong");
      }
    })();
  }, [cars]);
  const handleNewCarsSubmit = async (newCars: Order[]) => {
    try {
      let normalizedCars: NewOrder[] = [];
      for (let car of newCars) {
        normalizedCars.push({
          id: car.id,
          quantity: car.quantity,
        });
      }
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: qs.stringify({ cars: normalizedCars }),
        url: "http://localhost/rest/setCars.asp",
      };
      await axios(options);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };
  const handleDeleteCarsSubmit = async (carsToRemove: Order) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: qs.stringify({ carId: carsToRemove.id }),
        url: "http://localhost/rest/setReturnCar.asp",
      };
      await axios(options);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };
  console.log("username", userName);
  return (
    <div className="container mx-auto px-4 sm:px-8 pt-20">
      <h1 className=" text-5xl">הרכבים של {userName}</h1>
      <Tabs aria-label="Default tabs" style="default">
        <Tabs.Item active title="הזמנת רכבים" icon={HiClipboardList}>
          <Cars cars={cars} onSubmit={handleNewCarsSubmit} />
        </Tabs.Item>
        <Tabs.Item active title="הרכבים שלי" icon={HiUserCircle}>
          <OrderedCars
            myOrderedCars={myOrders}
            onSubmit={handleDeleteCarsSubmit}
          />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
