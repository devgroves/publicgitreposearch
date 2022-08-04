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
import { ReactNode, useEffect,useState } from "react";
import { GoStar, GoRepoForked, GoEye, GoTag, GoGitBranch, GoIssueOpened, GoOrganization, GoArchive, GoWatch } from "react-icons/go";
import NextLink from "next/link";
import Tags from "./subcomponents/Tags";
import Contributors from "./subcomponents/Contributors";
import moment from "moment"
import Branches from "./subcomponents/Branches";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"}>
      {children}
    </Text>
  );
};
export default function RepoContainer(props: any): JSX.Element {
  const { repo } = props;
  const [updatedTime,setUpdatedTime]=useState("")
  const [repoName,setPackageName]=useState("")
  useEffect(()=>{
    const newTime = moment(repo.updated_at).startOf('day').fromNow();
    setUpdatedTime(newTime)
  }, [repo.updated_at])
  useEffect(()=>{
    setPackageName(repo?.full_name)
  }, [repo.full_name])
  return (
    <Box
      // bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"100%"}
      borderRadius={10}
      bg="#B1F1F3"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr 2fr 2fr" }} spacing={3}>
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
              <GoGitBranch /><Text>{repoName ?<Branches  repo={repoName}/>:''} </Text>
            </Stack>
            <Text>Size of the package : {repo.size} </Text>
            <Text>License : {repo.license?.name} | Enterprise Version</Text>
            <Text>Used By | Sponsors</Text>
          </Stack>
          <Stack align={"flex-start"} fontSize={"sm"}>
            <Stack direction={"row"} align={"center"}>
              <GoIssueOpened /> <Text>Issues :{repo.issue} |</Text> 
              <GoOrganization /> <Contributors url={repo.contributors} icon={<GoOrganization />}/>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <GoArchive />
              <Text> IsArchived: {repo.archived ? "true" : "false"} |</Text>
              <GoEye />
              <Text> Visibility: {repo.visibility}</Text>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <GoWatch /> <Text>Last Updated : {updatedTime}</Text>
            </Stack>
          
            <Text>Build Status | #Test Cases Passed </Text>
            <Text>Vulnerabilities  | Pull Request</Text>
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
                  <Badge variant="solid" colorScheme="messenger" key={res}>
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

