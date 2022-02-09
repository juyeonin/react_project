import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinChargeList from "../../components/coin/CoinChargeList";
import { RootState } from "../../modules";
import { fetchChargeListThunk } from "../../modules/coin";

const CoinChargeListContainer = () => {
  const dispatch = useDispatch();

  const { chargeCoins, isLoading } = useSelector(
    ({ coin, loading }: RootState) => ({
      chargeCoins: coin.chargeCoins,
      isLoading: loading.FETCH_LIST,
    })
  );

  console.log(isLoading);
  useEffect(() => {
    dispatch(fetchChargeListThunk());
  }, [dispatch]);

  return <CoinChargeList chargeCoins={chargeCoins} isLoading={isLoading} />;
};

export default CoinChargeListContainer;
