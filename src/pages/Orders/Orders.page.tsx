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

const OrdersPage: FC = () => {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [cars, setCars] = useState<Order[]>([]);
  const [updateUserCars, setUpdateUserCars] = useState<number>(0);
  const userName = useSelector((state: RootState) => state.authSlice.userName);

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          url: "http://localhost/rest/getCars.asp",
        };
        let { data } = await axios(options);
        setCars(data);
      } catch (err: any) {
        toast.error("Something went wrong");
      }
    })();
  }, [updateUserCars]);
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
          let car = cars.find((car: Order) => car.id === key);
          if (!key || !car) continue;
          myOrders.push(new Order(key, car!.carName, myCar[key]));
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
        if (car.quantity <= 0) continue;
        normalizedCars.push({
          id: car.id,
          quantity: car.quantity + "",
        });
      }
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: "cars=" + JSON.stringify(normalizedCars),
        url: "http://localhost/rest/setCars.asp",
      };
      let { data } = await axios(options);
      setUpdateUserCars((c) => c + 1);
      toast.success("הרכבים נוספים בהצלחה");
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };
  const handleDeleteCarsSubmit = async (carsToRemove: Order) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: `carId=${carsToRemove.id}`,
        url: "http://localhost/rest/setReturnCar.asp",
      };
      let { data } = await axios(options);
      console.log("data from delete ordered car", data);
      toast.success("הרכב נמחק בהצלחה");
      setUpdateUserCars((c) => c + 1);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

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
