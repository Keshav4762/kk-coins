import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  // Input
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);

  // Initially loading ko true kiya h...
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("")

  // const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);

        // jb data poori trah se fetch ho jaaye to loading false ho jaayegi...mtlb ruk jaayegi
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();

    // if (searchQuery) {
    //   const fetchSearchResults = async () => {
    //     try {
    //       const { data } = await axios.get(
    //         `${server}/search?query=${searchQuery}`
    //       );
    //       setSearchResults(data.results);
    //     } catch (error) {
    //       console.error("Error fetching search results:", error);
    //     }
    //   };
  
    //   fetchSearchResults();
    // } else {
    //   setSearchResults([]);
    // }
  }, []);

  if (error) return <ErrorComponent message={"Error, URL not found"} />;

  // console.log(setSearchQuery);

  return (
    <Container maxW={"container.xl"}>
      {/* <Input
        type="text"
        placeholder="Search coins..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCard = ({ name, image, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      justifyContent={"flex-end"}
      w={"52"}
      shadow={"lg"}
      p={8}
      borderRadius={"lg"}
      transition={"all 0.5s"}
      m={4}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={image} w={10} h={10} objectFit={"contain"} alt="exchange" />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
