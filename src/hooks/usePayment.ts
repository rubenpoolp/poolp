import { getPackages, pay } from "@utils/purchase";
import { useEffect, useState } from "react";
import { PurchasesPackage } from "react-native-purchases";

const usePayment = () => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const packages = await getPackages();
      setPackages(packages ?? []);
    };
    fetchPackages();
  }, []);

  const purchase = async (selectedPackage: PurchasesPackage) => {
    pay(selectedPackage, () => {
      console.log("success");
    });
  };

  return { packages, purchase };
};

export default usePayment;
