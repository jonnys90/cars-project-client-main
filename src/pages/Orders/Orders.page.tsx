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
          url: "/getCars.asp",
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
          url: "/getUserCars.asp",
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
      let carsOverQuantity = "";
      for (let car of newCars) {
        if (car.quantity <= 0) continue;
        let carInCars = cars.find((car: Order) => car.id === car.id);
        if (!carInCars) continue;
        if (carInCars.quantity < car.quantity) {
          carsOverQuantity += car.carName + ", ";
          continue;
        }
        normalizedCars.push({
          id: car.id,
          quantity: car.quantity + "",
        });
      }
      if (!normalizedCars.length) {
        let msg = "כמות הרכבים שהזנת גדולה מהמוצרים במלאי ברכבים הבאים";
        if (carsOverQuantity) {
          msg += carsOverQuantity.slice(0, -2);
        } else {
          msg = "אנא בחר רכב";
        }
        toast.error(msg);
        return;
      }
      const options = {
        method: "POST",
        data: "cars=" + JSON.stringify(normalizedCars),
        url: "/setCars.asp",
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
        data: `carId=${carsToRemove.id}`,
        url: "/setReturnCar.asp",
      };
      let { data } = await axios(options);
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
