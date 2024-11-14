import { getPackages, pay } from "@utils/purchase";
import { useEffect, useState } from "react";
import { PACKAGE_TYPE } from "react-native-purchases";

const usePayment = () => {
  const [packages, setPackages] = useState<any>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const packages = await getPackages();
      setPackages(packages ?? []);
    };
    fetchPackages();
  }, []);

  const purchase = async (packageType: PACKAGE_TYPE) => {
    const selectedPackage = packages.find(
      (pkg: any) => packageType === pkg.packageType,
    );
    const result = await pay(selectedPackage);
    return result;
  };

  return {
    packages: packages.map((pkg: any) => ({
      packageType: pkg.packageType,
      priceByDayString: pkg.priceByDayString,
      price: pkg.priceString,
    })),
    purchase,
  };
};

export default usePayment;
