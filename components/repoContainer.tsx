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
  Avatar
} from "@chakra-ui/react";
import { Wrap, WrapItem } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from "react";
import { GoStar, GoRepoForked, GoEye, GoTag, GoGitBranch, GoIssueOpened, GoOrganization, GoArchive, GoWatch, GoGitPullRequest } from "react-icons/go";
import NextLink from "next/link";
import Tags from "./subcomponents/Tags";
import Contributors from "./subcomponents/Contributors";
import moment from "moment"
import Branches from "./subcomponents/Branches";
import PR from "./subcomponents/Pr";
import { GetServerSidePropsContext, GetStaticPropsResult } from "next";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"}>
      {children}
    </Text>
  );
};

export default function RepoContainer(props: any): JSX.Element {
  const { repo } = props;
  const [updatedTime, setUpdatedTime] = useState("")
  const [repoName, setPackageName] = useState("")
  const [owner, setOwner] = useState()
  useEffect(() => {
    const newTime = moment(repo.updated_at).startOf('day').fromNow();
    setUpdatedTime(newTime)
  }, [repo.updated_at])
  useEffect(() => {
    setPackageName(repo?.full_name)
    setOwner(repo.owner)
  }, [repo?.full_name, repo.owner])
  return (
    <Box
      // bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"100%"}
      borderRadius={10}
      bg="#B1F1F3"
    >
      <Container as={Stack} maxW={"9xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr 2fr 2fr" }} spacing={3}>
          <Stack>
            <ListHeader>{repo?.name}</ListHeader>
            <Text fontSize={"sm"}>
              <NextLink href={`https://github.com/${repo?.full_name}`} passHref>
                <Link color="blue">{repo?.full_name}</Link>
              </NextLink>
              </Text>
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
              {/* <Text>Releases  </Text> */}
              <GoTag />  <Tags url={repo.tags} />
              <GoGitBranch /><Text>{repoName ? <Branches repo={repoName} /> : ''} </Text>
            </Stack>
            <Text>Size of the package : {Math.round((repo.size / 32768) * 100) / 100} MB </Text>
            <Text>License : {repo.license?.name ? repo.license?.name:"None"}  </Text>
            <Text><Avatar src={repo?.owner?.avatar_url} size='xs' /> {repo?.owner?.login}</Text>
          </Stack>
          <Stack align={"flex-start"} fontSize={"sm"}>
            <Stack direction={"row"} align={"center"}>
              <GoIssueOpened /> <Text>Issues :{repo.issue} |</Text>
              <GoOrganization /> <Contributors url={repo.contributors} icon={<GoOrganization />} />
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
            <Stack direction={"row"} align={"center"}>
              <GoGitPullRequest />  <PR repo={repoName} />
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <Stack direction={"row"} align={"center"}>
              <GoStar /> <Text>{repo.stars} |</Text> <GoRepoForked /> <Text>{repo.forks} |</Text>
              <GoEye /> <Text>{repo.watchers} </Text>
            </Stack>
            <NextLink href={`${repo.homepage}`} passHref>
              <Link color="blue">Homepage</Link>
            </NextLink>
            {/* <Text>Examples</Text> */}
            <Text>Wiki Link : {repo.has_wiki ? (
              <NextLink href={`https://github.com/${repo?.full_name}/wiki`} passHref>
                <Link color="blue">{`click here`}</Link>
              </NextLink>
            ):("none")}</Text>
          </Stack>
        </SimpleGrid>
        <SimpleGrid>
          <Text>Description :{repo.description}</Text>
        </SimpleGrid>
        <SimpleGrid>
          <Stack direction={"row"} align={"center"}>
            <Wrap>
              {repo.topics &&
                repo.topics.map((res: string) => (
                  <>
                    <WrapItem key={res}>
                      <Badge variant="solid" colorScheme="messenger" >
                        {res}
                      </Badge>
                    </WrapItem>
                  </>
                ))}
            </Wrap>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

