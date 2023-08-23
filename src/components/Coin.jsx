import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCards from "./CoinCards";

function Coin() {
  const [coins, setCoins] = useState([]);

  // Initially loading ko true kiya h...
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);

  const [currency, setCurrency] = useState("usd");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(102).fill(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);

        // jb data poori trah se fetch ho jaaye to loading false ho jaayegi...mtlb ruk jaayegi
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error, URL not found"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} >
            <HStack spacing={4} >
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="usd">USD($)</Radio>
              <Radio value="eur">EUR(€)</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={'space-evenly'} >
            {coins.map((i) => (
              <CoinCards
                key={i.id}
                id={i.id}
                name={i.name}
                image={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          {/* pagination     */}
          <HStack w={'full'} overflowX={'auto'} p={8} >
            {btns.map((item, index) => (
              <Button
              key={index}
                backgroundColor={"darkblue"}
                color={"white"}
                onClick={() => changePage(index+1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coin;
