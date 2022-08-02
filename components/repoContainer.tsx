import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Badge,
  Link,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { GoStar, GoRepoForked, GoEye, GoTag, GoGitBranch } from "react-icons/go";
import NextLink from "next/link";
import Tags from "./subcomponents/Tags";
const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"}>
      {children}
    </Text>
  );
};
export default function RepoContainer(props: any): JSX.Element {
  const { repo } = props;
  return (
    <Box
      // bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"100%"}
      borderRadius={10}
      bg="#B1F1F3"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr 2fr 2fr" }} spacing={6}>
          <Stack>
            <ListHeader>{repo?.name}</ListHeader>
            <Text fontSize={"sm"}>{repo?.full_name}</Text>
            <Stack direction={"row"} mt={10}>
              <Text fontSize={"sm"}>
                Language:{" "}
                <Badge colorScheme="red" variant="solid">
                  {repo.language}
                </Badge>
              </Text>
            </Stack>
            <Stack direction={"row"}>frameworks :</Stack>
          </Stack>

          <Stack align={"flex-start"} fontSize={"sm"}>
            <Stack direction={"row"} align={"center"}>
              <Text>Releases  </Text>
              <GoTag />  <Tags url={repo.tags} /> 
              <GoGitBranch /><Text>Branches </Text>
            </Stack>
            
            <Text>Code Frequency | Pull Request</Text>
            <Text>License | Enterprise Version</Text>
          </Stack>
          <Stack align={"flex-start"} fontSize={"sm"}>
            <Text>Issues |  Contributors | IsArchived</Text>
            <Text>Last Release Date  | Build Status</Text>
            <Text>Used By | Sponsors</Text>
            <Text>Size of the package : {repo.size} </Text>
            {/* <Text>No of Test Cases Passed</Text> */}
          </Stack>
          <Stack align={"flex-start"}>
            <Stack direction={"row"} align={"center"}>
              <GoStar /> <Text>{repo.stars} |</Text> <GoRepoForked /> <Text>{repo.forks} |</Text>
              <GoEye /> <Text>{repo.watchers} </Text>
            </Stack>
            <NextLink href={`${repo.homepage}`} passHref>
              <Link color="blue">Homepage</Link>
            </NextLink>
            <Text>Examples</Text>
            <Text>Wiki Link</Text>
          </Stack>
        </SimpleGrid>
        <SimpleGrid>
          <Text>Description :{repo.description}</Text>
        </SimpleGrid>
        <SimpleGrid>
          <Stack direction={"row"} align={"center"}>
            {repo.topics &&
              repo.topics.map((res: string) => (
                <>
                  <Badge variant="solid" colorScheme="messenger">
                    {res}
                  </Badge>
                </>
              ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}




